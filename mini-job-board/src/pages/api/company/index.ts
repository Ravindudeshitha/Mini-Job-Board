import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';
import { authMiddleware } from '@/lib/authMidleware';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
      bodyParser: false,
    },
};

async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'PUT') {
        const form = formidable({ multiples: false });
    
        form.parse(req, async (err, fields, files) => {
          if (err) return res.status(500).json({ message: 'Form parsing error', error: err });
    
          const {
            companyId,
            comName,
            comEmail,
            comLocation,
            web,
            contact,
          } = fields;
    
          let imageField = fields.image;
          console.log(imageField)
          try {
            const prevCompany = await prisma.company.findUnique({
                where: { companyId: parseInt(Array.isArray(companyId) ? companyId[0] : companyId ?? '') },
            });
    
            if (!prevCompany) return res.status(404).json({ message: 'Company not found' });
    
            let finalImageName = typeof imageField === 'string' ? imageField : prevCompany.image;
            console.log(finalImageName,'kjjjjj')
            if (files.image && files.image[0]) {
              const file = files.image[0];
              const ext = path.extname(file.originalFilename || '.jpg');
              const safeName = comName?.toString().replace(/\W+/g, '');
              const timestamp = Date.now();
              const newFileName = `${safeName}_${timestamp}${ext}`;
              const uploadPath = path.join(process.cwd(), 'public', newFileName);
            console.log(uploadPath);
              const data = fs.readFileSync(file.filepath);
              fs.writeFileSync(uploadPath, data);
    
              finalImageName = newFileName;
    
              fs.unlinkSync(file.filepath);
    
              if (prevCompany.image && prevCompany.image !== newFileName) {
                const oldImagePath = path.join(process.cwd(), 'public', prevCompany.image);
                if (fs.existsSync(oldImagePath)) {
                  fs.unlinkSync(oldImagePath);
                }
              }
            }
    
            const updatedCompany = await prisma.company.update({
            where: { companyId: parseInt(Array.isArray(companyId) ? companyId[0] : companyId ?? '') },
              data: {
                comName: comName?.toString(),
                comEmail: comEmail?.toString(),
                comLocation: comLocation?.toString(),
                web: web?.toString(),
                contact: contact?.toString(),
                image: finalImageName,
              },
            });
    
            return res.status(200).json({ message: 'Company updated', company: updatedCompany });
          } catch (error) {
            console.error('Update error:', error);
    
            if (files.image && files.image[0]) {
              const file = files.image[0];
              const ext = path.extname(file.originalFilename || '.jpg');
              const safeName = comName?.toString().replace(/\W+/g, '');
              const timestamp = Date.now();
              const newFileName = `${safeName}_${timestamp}${ext}`;
              const newFilePath = path.join(process.cwd(), 'public', newFileName);
              if (fs.existsSync(newFilePath)) {
                fs.unlinkSync(newFilePath);
              }
            }
    
            return res.status(500).json({ message: 'Error updating company', error });
          }
        });
    
        return;
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
}

export default authMiddleware(handler);
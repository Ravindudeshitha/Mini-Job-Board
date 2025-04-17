import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';
import { authMiddleware } from '@/lib/authMidleware';


async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        const userId = req.query.id;
        console.log(userId)
        if (!userId || Array.isArray(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        try {
            const user = await prisma.user.findUnique({
              where: { userId: parseInt(userId) },
              include: {
                Company: true,
              },
            });
        
            if (!user || !user.Company) {
              return res.status(404).json({ message: 'Company not found' });
            }
        
            return res.status(200).json({ company: user.Company });
        } catch (error) {
            console.error('Error fetching :', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    return res.status(405).json({ message: 'Method not allowed' });
}


export default authMiddleware(handler);
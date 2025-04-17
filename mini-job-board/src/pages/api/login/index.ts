import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    console.log('Login API called');
    if(req.method === 'POST'){
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const user = await prisma.user.findUnique({
                where: {email}
            });

            if(!user){
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const company = await prisma.company.findUnique({
                where: {
                    userId: user.userId
                }
            });

            let companyImage = 'noCompanyImage';
            let companyId = 0;
            let companyName = '';

            if (company && company.image) {
                companyImage = company.image;
                companyId = company.companyId;
                companyName = company.comName;
            }

            const token = jwt.sign({
                userId:user.userId,
                email:user.email,
            },
            JWT_SECRET,
            {
                expiresIn: '1d'
            });

            res.setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60,
                path: '/'
            }));
            return res.status(200).json({
                id: user.userId,
                name: user.name,
                email: user.email,
                image: companyImage,
                companyId: companyId,
                companyName: companyName,
            })
        }
        catch(e){
            console.error(e);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    return res.status(405).json({ message: 'Method not allowed' });
}
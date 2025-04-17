import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST'){
        try{
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return res.status(400).json({ message: 'Name, email, and password are required' });
            }

            const existingUser = await prisma.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                return res.status(409).json({ message: 'User with this email already exists' });
            }    

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });   

            const now = Date.now();
            const comEmail = `update_${now}@example.com`;

            const dummyCompany = await prisma.company.create({
                data: {
                    comName: 'Update',
                    comEmail: comEmail,
                    comLocation: 'Update',
                    image: 'logo.jpg',
                    web: 'Update',
                    contact: 'Update',
                    userId: user.userId,
                },
            });

            return res.status(200).json({
                message: 'Registration successful'
            });
        }
        catch (e) {
            console.error('Registration error:', e);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    return res.status(405).json({ message: 'Method not allowed' });
}
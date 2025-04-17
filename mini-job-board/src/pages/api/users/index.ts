import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';

export default async function handler(req: NextApiRequest , res: NextApiResponse){
    if(req.method ==='GET'){
        try{
            const users = await prisma.user.findMany();
            res.status(200).json({users});
        }
        catch(e){
            res.status(500).json(e);
        }
    }
}
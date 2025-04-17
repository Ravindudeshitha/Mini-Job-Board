import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET'){
        try{
            const jobs = await prisma.job.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    company: {
                      select: {
                        companyId: true,
                        comName: true,
                        image: true,
                      },
                    },
                },
            });
            res.status(200).json(jobs);
        }
        catch(e){
            res.status(500).json(e);
        }
    }
}
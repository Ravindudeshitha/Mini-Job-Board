import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse){   console.log('kk')
    if (req.method === 'GET'){
        try{
            const jobId = req.query.jobId;
            const job = await prisma.job.findUnique({
                where: {
                  jobId: Number(jobId),
                },
                include: {
                  company: true,
                },
            });
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
        
            res.status(200).json(job);
        }
        catch(e){
            console.log(e);
            res.status(500).json({ message: 'Interna Server Error' });
        }
    }
    res.status(405).json({ message: 'Method Not Allowed' });
}
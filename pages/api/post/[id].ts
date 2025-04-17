import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';
import { authMiddleware } from '@/lib/authMidleware';


async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "GET"){
        try{

            const companyId = req.query.id;
            const jobs = await prisma.job.findMany({
                where:{
                    companyId: Number(companyId)
                }
            })
            
            return res.status(200).json(jobs);
            
        }
        catch(error){
            return res.status(500).json({message: "Error fetch post", error});
        }
    }
    else if(req.method === "DELETE"){
        try{
            const jobId = req.query.jobId;
            const companyId = req.query.id;
            const jobs = await prisma.job.delete({
                where:{
                    jobId: Number(jobId),
                    companyId: Number(companyId)
                }
            })

            return res.status(200).json({message : "post deleted", jobs: jobs});
            
        }
        catch(error){
            return res.status(500).json({message: "Error fetch post", error});
        }
    }
    return res.status(405).json({ message: 'Method not allowed' });
}

export default authMiddleware(handler);
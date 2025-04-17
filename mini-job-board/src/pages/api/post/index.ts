import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db/index';
import { authMiddleware } from '@/lib/authMidleware';

async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET'){
        try{
            const jobs = await prisma.job.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            res.status(200).json(jobs);
        }
        catch(e){
            res.status(500).json(e);
        }
    }
    else if(req.method === "POST"){
        try{
            const {jobTitle, jobType, category, jobLocation, salaryRange, createdAt, description, skills, companyId} = req.body;

            if (!jobTitle || !jobType || !category || !jobLocation || !salaryRange || !description || !skills) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const job = await prisma.job.create({
                data: {
                    jobTitle,
                    jobType,
                    category,
                    jobLocation,
                    salaryRange,
                    createdAt,
                    description,
                    skills,
                    companyId
                }
            });

            return res.status(200).json({
                message: 'Jost Posting successful',
                job: job
            });
        }
        catch(error){
            return res.status(500).json({message: "Error create post", error});
        }
    }
    return res.status(405).json({ message: 'Method not allowed' });
}

export default authMiddleware(handler);
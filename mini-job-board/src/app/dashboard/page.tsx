'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Company from '@/components/Company';
import JobCard from '@/components/JobCard';
import NewPost from '@/components/NewPost';

type Company = {
    companyId: number;
    comName: string;
    comEmail: string;
    comLocation: string;
    image?: string;
    web?: string;
    contact: string;
};

type Job = {
    jobId: number;
    jobTitle: string;
    jobType: string;
    category: string;
    jobLocation: string;
    salaryRange: string;
    createdAt: Date;
    description: string;
    skills: string;
    company: Company;
};

export default function Dashboard() {
    

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser} = useUser();
    const [jobs, setJobs] = useState<Job[]>([])
    const fetchJobs = () =>{
        fetch(`/api/post/${currentUser&&currentUser.companyId}`,{
            headers: {
                "Content-Type": 'application/json'
                },
                method: 'GET',
                credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) =>{
            setJobs(data);
        })
    }

    useEffect(() => {
        const fetchJob = () =>{
            fetch(`/api/post/${currentUser&&currentUser.companyId}`,{
                headers: {
                    "Content-Type": 'application/json'
                    },
                    method: 'GET',
                    credentials: 'include',
            })
            .then((res) => res.json())
            .then((data) =>{
                setJobs(data);
            })
        }

        if (currentUser && currentUser.companyId) {
            fetchJob();
        }
    }, [currentUser]);

    const onDelete = (jobId: number) => {
        fetch(`/api/post/${currentUser&&currentUser.companyId}?jobId=${jobId}`,{
            headers: {
                "Content-Type": 'application/json'
            },
            method: 'DELETE',
            credentials: 'include',
        })
        .then(() =>{
            fetchJobs();
        })
    }

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (!user) {
            router.push('/');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return <div className="text-center mt-10 text-gray-600">Loading...</div>;
    }

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
      
        const intervals: [number, string][] = [
          [31536000, 'year'],
          [2592000, 'month'],
          [86400, 'day'],
          [3600, 'hour'],
          [60, 'minute'],
          [1, 'second']
        ];
        

        for (const [secondsInUnit, unit] of intervals) {
          const interval = Math.floor(seconds / secondsInUnit);
          if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
          }
        }
      
        return 'Just now';
    }
    
    return (
        <div className="w-full h-[90vh] p-5 bg-gradient-to-r from-pink-100 via-blue-100 to-red-100">
            <div className="w-full h-full flex justify-between items-end gap-4">
                <div className="w-1/5 h-[93%]">
                    <Company />
                </div>

                <div className='w-2/5 h-[93%] shadow-2xl rounded-xl overflow-hidden p-3 bg-white'>
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-4 pr-2">
                        {jobs&& jobs.map((job, index) =>(
                            <div key={index}>
                                <JobCard 
                                    jobId={job.jobId}
                                    jobTitle={job.jobTitle}
                                    jobType={job.jobType}
                                    category={job.category}
                                    jobLocation={job.jobLocation}
                                    salaryRange={job.salaryRange}
                                    createdAt={getTimeAgo(job.createdAt.toString())}
                                    description={job.description}
                                    skills={job.skills}
                                    design="large"
                                    type="company"
                                    onDelete={onDelete}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-2/5 h-[93%] shadow-2xl rounded-xl bg-white ">
                    <NewPost 
                        fetchJobs={fetchJobs}
                    />
                </div>
            </div>

            <style jsx>{`
                div::-webkit-scrollbar {
                width: 6px;
                }

                div::-webkit-scrollbar-track {
                background: #2A2929;
                border-radius: 10px;
                }

                div::-webkit-scrollbar-thumb {
                background-color: #A1F96A;
                border-radius: 10px;
                }
            `}</style>
        </div>
    )
}
'use client'

import Image from "next/image";
import DraggableTabs from "./DraggableTabs";
import JobButton from "./JobButton";
import Link from "next/link";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";

type Com = {
  companyId: number;
  comName: string;
  image: string;
};

type Job = {
  jobId: number;
  jobTitle: string;
  jobType: string;
  category: string;
  jobLocation: string;
  salaryRange: string;
  createdAt: string; // Changed to string for safer date parsing
  description: string;
  skills: string;
  company: Com;
};

export default function HomeSecondSection() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filterName, setFilterName] = useState('All');

    const getAllJobs = () => {
        fetch("/api/job")
        .then((res) => res.json())
        .then((data: Job[]) => {
            // Sort jobs by createdAt descending
            const sortedJobs = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setJobs(sortedJobs);
        });
    };

     useEffect(() => {
        getAllJobs();
    }, []);

    const filteredJobs = filterName === 'All'
    ? jobs.slice(0, 8)
    : jobs.filter(job => job.category === filterName).slice(0, 8);

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
    <>
      <section className="min-h-screen mt-[8vh] py-10">
        <div className="w-full flex justify-center mb-6">
          <h2 className="text-[#2A2929] font-bold text-2xl">
            Explore Your Dream Job
          </h2>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          <DraggableTabs setFilterName={setFilterName} />
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredJobs.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">No jobs found for "{filterName}"</p>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="w-[300px] h-[200px]"
                >
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
                    design="small"
                    type=""
                    companyId={job.company.companyId}
                    comName={job.company.comName}
                    image={job.company.image}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/jobs">
            <JobButton buttonText="Explore all jobs" />
          </Link>
        </div>
      </section>
    </>
  );
}

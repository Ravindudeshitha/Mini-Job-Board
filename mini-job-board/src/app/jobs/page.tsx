'use client';

import JobCard from "@/components/JobCard";
import { useEffect, useState } from "react";

interface Tab {
  name: string;
  image: string;
  color: string;
}

type Com ={
  companyId: number;
  comName: string;
  image: string;
}

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
  company: Com;
};

export default function Jobs() {
  const [tabs, setTabs] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const getAllJobs = () => {
    fetch("/api/job")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      });
  };
  console.log(jobs)
  const getcategories = async () => {
    try {
      const response = await fetch("/tabs.json");
      const data: Tab[] = await response.json();
      const names: string[] = data.map((tab) => tab.name);
      setTabs(names);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    getcategories();
    getAllJobs();
  }, []);

  const handleFilterChange = () => {
    let tempJobs = [...jobs];

    if (categoryFilter !== "All") {
      tempJobs = tempJobs.filter((job) => job.category === categoryFilter);
    }

    if (jobTypeFilter.length > 0) {
      tempJobs = tempJobs.filter((job) => {
        const jobTypes = job.jobType.split(",").map((j) => j.trim().toLowerCase());
        return jobTypeFilter.some((filter) =>
          jobTypes.includes(filter.toLowerCase())
        );
      });
    }

    if (timeFilter !== "All") {
      const now = new Date();
      tempJobs = tempJobs.filter((job) => {
        const jobDate = new Date(job.createdAt);
        const diffInMs = now.getTime() - jobDate.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);

        switch (timeFilter) {
          case "1_hour":
            return diffInHours <= 1;
          case "1_day":
            return diffInHours <= 24;
          case "1_week":
            return diffInHours <= 168;
          case "1_month":
            return diffInHours <= 720;
          default:
            return true;
        }
      });
    }

    setFilteredJobs(tempJobs);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterChange();
  }, [categoryFilter, jobTypeFilter, timeFilter]);

  const resetFilters = () => {
    setCategoryFilter("All");
    setJobTypeFilter([]);
    setTimeFilter("All");
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const intervals: [number, string][] = [
      [31536000, "year"],
      [2592000, "month"],
      [86400, "day"],
      [3600, "hour"],
      [60, "minute"],
      [1, "second"],
    ];

    for (const [secondsInUnit, unit] of intervals) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const toggleJobType = (type: string) => {
    setJobTypeFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="w-full flex justify-center relative gap-5 pt-[3vh] bg-gradient-to-r from-pink-100 via-blue-100 to-red-100 pb-40">
      <div className="w-1/5 sticky top-[13vh] self-start rounded-xl shadow-xl bg-white p-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5 mb-3"
          >
            <option value="All">All</option>
            {tabs.map((tab, index) => (
              <option key={index} value={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Job Type</label>
          {['Onsite', 'Remote', 'Hybrid'].map((type) => (
            <div key={type} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={type}
                checked={jobTypeFilter.includes(type)}
                onChange={() => toggleJobType(type)}
                className="mr-2"
              />
              {type}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Time</label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5 mb-3"
          >
            <option value="All">All</option>
            <option value="1_hour">Last Hour</option>
            <option value="1_day">Last Day</option>
            <option value="1_week">This Week</option>
            <option value="1_month">This Month</option>
          </select>
        </div>

        <button
          className="w-full bg-[#2A2929] text-[#A1F96A] hover:bg-[#313030] p-2 rounded-full font-semibold"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>

      <div className="w-2/5 rounded-xl overflow-hidden bg-white shadow-xl p-2">
        <div className="w-full overflow-y-auto flex flex-col gap-4 pr-2">
          {currentJobs.map((job) => (
            <div key={job.jobId}>
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
                type="joblist"
                companyId={job.company.companyId}
                comName={job.company.comName}
                image={job.company.image}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center mt-4 px-2">
          <div className="flex gap-5">
            <button
              className="bg-gray-200 border-2 border-gray-400/50 px-4 py-2 rounded-full shadow disabled:opacity-40"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-[#2A2929] pt-2 font-bold">
              {currentPage} / {totalPages}
            </span>
            <button
              className="bg-[#2A2929] text-gray-200 px-4 py-2 rounded-full shadow disabled:opacity-40"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

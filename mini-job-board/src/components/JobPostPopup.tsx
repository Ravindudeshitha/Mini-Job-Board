'use client';
import { usePopup } from '@/context/PopupContext';
import { useEffect, useState } from 'react';
import { IoMail } from "react-icons/io5";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import Image from 'next/image';

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
  createdAt: string;
  description: string;
  skills: string;
  company: Company;
};

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
    [1, 'second'],
  ];

  for (const [secondsInUnit, unit] of intervals) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
};

const formatSalary = (salary: string) => {
  const pattern = /(\d{2,3})(?:\d{3})?/g;
  const numbers = salary.match(/\d+/g);
  if (!numbers || numbers.length < 2) return salary;
  const format = (n: string) => {
    const num = parseInt(n);
    return num >= 1000 ? `${Math.round(num / 1000)}k` : `${num}k`;
  };
  return `${format(numbers[0])}-${format(numbers[1])} /month`;
};

export default function JobPostPopup() {
  const { isOpen, closePopup, popupData } = usePopup();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await fetch(`/api/job/${popupData?.jobId}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error('Error fetching job:', err);
      }
    };
    if (popupData?.jobId) {
      getJob();
    }
  }, [popupData]);

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="absolute inset-0"
        onClick={closePopup}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-lg pt-4 px-2 pb-2 space-y-6">
        <div className='w-full  max-h-[90vh] overflow-y-auto p-2'>
          <div className='border-2 border-gray-300 p-2 rounded-xl'>
            <div className="flex justify-between items-center border-b-2 border-gray-400/50 pb-3">
              <div className="flex items-center gap-4">
                {job.company?.image && (
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    <Image
                      src={`/${job.company.image}`}
                      alt={job.company.comName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="font-semibold text-gray-800 text-xl">
                  {job.company.comName}
                </span>
              </div>
              <button
                onClick={closePopup}
                className="text-xl font-bold text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h2>
              

              <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                <span className=" px-2 text-gray-500 font-semibold rounded">{job.jobLocation}</span>
                <span className="text-gray-500">{getTimeAgo(job.createdAt)}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.jobType.split(',').map((type, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-gray-600 font-bold px-3 py-1 rounded-full text-sm"
                  >
                    {type.trim()}
                  </span>
                ))}
                -
                <span className=" bg-[#2A2929] text-[#A1F96A] font-bold px-3 py-1 rounded-full text-sm">{job.category}</span>
              </div>
              

              <div className="pt-2">
                <h3 className="text-md font-semibold text-gray-800">About Job</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-800">Salary</h3>
                <p className="text-sm text-gray-600">{formatSalary(job.salaryRange)}</p>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-800">Skills</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">{job.skills}</p>
              </div>
            </div>
          </div>

          
          <div className="p-2 bg-[#2A2929] text-[#A1F96A] space-y-2 rounded-xl mt-5">
            <div className="flex items-center gap-3">
              {job.company?.image && (
                <img
                  src={`/${job.company.image}`}
                  alt="Company Logo"
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <span className="font-semibold text-xl">{job.company.comName}</span>
            </div>
            <div className="text-sm text-gray-100 space-y-1">
              <div className='flex gap-2 pl-3 mb-2'><IoMail className='text-[#A1F96A] text-[1.4rem]'/> {job.company.comEmail}</div>
              <div className='flex gap-2 pl-3 mb-2'><FaSquarePhoneFlip className='text-[#A1F96A] text-[1.4rem]'/> {job.company.contact}</div>
              {job.company.web && (
                <div className='flex gap-2 pl-3 mb-2'>
                  <BiWorld className='text-[#A1F96A] text-[1.4rem]'/>{' '}
                  <a
                    href={`https://${job.company.web}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {job.company.web}
                  </a>
                </div>
              )}
              <div className='flex gap-2 pl-3 mb-2'><IoLocationSharp className='text-[#A1F96A] text-[1.4rem]'/> {job.company.comLocation}</div>
            </div>
          </div>
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
  );
}

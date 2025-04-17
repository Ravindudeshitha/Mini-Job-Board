'use client'

import Image from "next/image"
import JobButton from "./JobButton"
import Link from "next/link"

export default function HomeThiredSection() {

    return (
        <>
        <section className="h-[100vh] mt-[8vh] py-10">
            <div className="h-[60%] flex justify-between">
                <div className="h-full w-4/5 rounded-r-4xl overflow-hidden shadow-md flex">
                    <div className="relative w-1/2 h-full">
                        <Image src={'/image2.png'} alt="Image-01" fill className="object-cover" />
                    </div>

                    <div className="w-1/2 h-full bg-[#2A2929] p-5 text-slate-100">
                        <h2 className="text-5xl">Connect with your <span className='text-[#A1F96A]'>next</span> great hire</h2>

                        <div className="flex gap-10">
                            <div className="flex gap-4 items-center mt-8">
                                <div className="w-6 h-6 rounded-full bg-[#A1F96A]"></div>
                                <h2>Experienced and verified</h2>
                            </div>

                            <div className="flex gap-4 items-center mt-8">
                                <div className="w-6 h-6 rounded-full bg-[#A1F96A]"></div>
                                <h2>Skilled and certified</h2>
                            </div>
                        </div>
            
                        <h2 className="text-lg mt-8">
                            Post your job and reach skilled, qualified candidates ready to make an impact. Hiring made fast and easy.
                        </h2>
            
                        <div className="w-full flex justify-end mt-16">
                            <Link href='/dashboard'>
                                <JobButton buttonText="Post new job" />
                            </Link>
                        </div>
            
                    </div>
                </div>

                <div className="w-1/5 h-full"></div>
            </div>


            <div className="h-[40%] flex justify-center py-10">
                <div className="w-4/5 h-full flex justify-between items-center">
                    <div className="w-1/4 h-[80%] flex flex-col p-4 justify-center items-center bg-gray-100 hover:bg-[#2A2929] rounded-lg shadow-lg border-2 border-gray-400/10 text-gray-800 hover:text-[#A1F96A]">
                        <h2 className="font-bold text-lg">Emplyees</h2>
                        <h2 className="text-gray-500 text-center w-[80%]">Over 300 candidates hired through our platform</h2>
                    </div>
            
                    <div className="w-1/4 h-[80%] flex flex-col p-4 justify-center items-center bg-gray-100 hover:bg-[#2A2929] rounded-lg shadow-lg border-2 border-gray-400/10 text-gray-800 hover:text-[#A1F96A]">
                        <h2 className="font-bold text-lg">Employers</h2>
                        <h2 className="text-gray-500 text-center w-[80%]">Over 500 jobs posted by top employers</h2>                
                    </div>
            
                    <div className="w-1/4 h-[80%] flex flex-col p-4 justify-center items-center bg-gray-100 hover:bg-[#2A2929] rounded-lg shadow-lg border-2 border-gray-400/10 text-gray-800 hover:text-[#A1F96A]">
                        <h2 className="font-bold text-lg">Jobs</h2>
                        <h2 className="text-gray-500 text-center w-[80%]">Over 600 jobs posted on our platform</h2>               
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
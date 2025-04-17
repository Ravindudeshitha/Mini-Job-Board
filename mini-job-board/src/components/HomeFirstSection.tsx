'use client'
import Image from "next/image"
import JobButton from "./JobButton"
import { TiUser } from "react-icons/ti";
import { FaUpload } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import Link from "next/link";

export default function HomeFirstSection() {

    return (
        <>
            <section className="h-[90vh] py-10">
                <div className="h-[60%] flex justify-between">
                    <div className="w-1/5 h-full"></div>
                    <div className="h-full w-4/5 rounded-l-4xl overflow-hidden shadow-md flex">
                        <div className="w-1/2 h-full bg-[#2A2929] p-5 text-slate-100">
                            <h2 className="text-5xl">Unlock your <span className='text-[#A1F96A]'>next</span> professional chapter now</h2>

                            <h2 className="text-lg mt-8">
                                Your next big opportunity starts here. Explore top jobs and connect with employers who value your talent.
                            </h2>

                            <div className="w-full flex justify-end mt-16">
                                <Link href='/jobs' className="">
                                    <JobButton buttonText="Explore all jobs" />
                                </Link>
                            </div>

                        </div>
                        <div className="relative w-1/2 h-full">
                            <Image src={'/image1.png'} alt="Image-01" fill className="object-cover" />
                        </div>
                    </div>
                </div>

                <div className="h-[40%] flex justify-center">
                    <div className="w-4/5 h-full flex justify-between items-center">
                        <div className="w-1/5 h-[80%] flex flex-col p-4 justify-center items-center">
                            <div className="border-dashed border-3 w-20 h-20 rounded-full border-[#2A2929] flex justify-center items-center">
                                <TiUser className="text-5xl text-gray-700"/>
                            </div>
                            <h2 className="mt-4 font-semibold text-gray-800">Register Your Account</h2>
                        </div>

                        <div className="w-32 h-[2px] bg-[#2A2929]"></div>

                        <div className="w-1/5 h-[80%] flex flex-col p-4 justify-center items-center">
                            <div className="border-dashed border-3 w-20 h-20 rounded-full border-[#2A2929] flex justify-center items-center">
                                <FaUpload className="text-4xl text-gray-700"/>
                            </div>
                            <h2 className="mt-4 font-semibold text-gray-800">Register Your Account</h2>
                        </div>

                        <div className="w-32 h-[2px] bg-[#2A2929]"></div>

                        <div className="w-1/5 h-[80%] flex flex-col p-4 justify-center items-center">
                            <div className="border-dashed border-3 w-20 h-20 rounded-full border-[#2A2929] flex justify-center items-center">
                                <BsFillSendFill className="text-4xl text-gray-700"/>
                            </div>
                            <h2 className="mt-4 font-semibold text-gray-800">Register Your Account</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
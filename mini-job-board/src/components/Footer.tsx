'use client'

import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-200 shadow-md">
            <div className="text-[#2A2929] text-3xl font-bold p-5">
                <span className='text-[#A1F96A]'>.</span>Next<span className='text-[#A1F96A]'>Leap</span>
            </div>

            <div className="px-10 flex justify-between ">
                <div className="text-gray-500 w-1/4 h-[20vh]">
                    <h2>Your gateway to top jobs, trusted companies, and the career you've always wanted. Explore, apply, and grow.</h2>
                </div>
                <div className="text-gray-500 h-[20vh] flex flex-col space-y-2">
                    <Link href='/' className="text-[#2A2929]">Home</Link>
                    <Link href='/jobs' className="text-[#2A2929]">Job List</Link>
                    <Link href='/dashboard' className="text-[#2A2929]">Dashboard</Link>
                </div>
                <div className="w-1/4 h-[20vh]">
                    <h2 className="text-xl font-bold text-[#434242]">Follow us on</h2>
                    <div className="mt-3 flex space-x-4">
                        <Link href='/' className="text-2xl text-[#2A2929]"><FaFacebook /></Link>
                        <Link href='/' className="text-2xl text-[#2A2929]"><FaLinkedin /></Link>
                        <Link href='/' className="text-2xl text-[#2A2929]"><FaXTwitter /></Link>
                        <Link href='/' className="text-2xl text-[#2A2929]"><FaYoutube /></Link>
                    </div>
                </div>
            </div>

            <div className=" border-t border-gray-300 text-center h-[8vh] flex justify-center items-center">
                <h2 className="text-gray-400"> Designed By Ravindu Deshitha</h2>
            </div>
        </footer>
    )
}
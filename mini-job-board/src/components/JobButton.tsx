"use client"
import { IoArrowUndo } from "react-icons/io5";

export default function JobButton({buttonText}: {buttonText: string}) {
    return (
        <>
            <button className="bg-gray-200 text-slate-900 py-1 pr-1 pl-4 rounded-full hover:bg-[#A1F96A]/80 transition duration-300 ease-in-out cursor-pointer">
                <div className="flex justify-between gap-2">
                    <div className="py-1">{buttonText}</div>
                    <div className="w-8 h-8 rounded-full bg-[#2A2929] flex justify-center items-center">
                        <IoArrowUndo className="text-[#A1F96A] hover:text-slate-200 text-2xl transform rotate-[150deg]"/>
                    </div>
                </div>

            </button>
        </>
    )
}
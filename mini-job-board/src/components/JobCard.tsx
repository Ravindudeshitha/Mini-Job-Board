"use client"

import { usePopup } from "@/context/PopupContext";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";

interface JobcardProps{
    jobId: number,
    jobTitle: string,
    jobType: string,
    category: string,
    jobLocation: string,
    salaryRange: string,
    createdAt: string,
    description: string,
    skills: string,
    design: string,
    type: string,
    onDelete?: (jobId: number) => void;
    companyId?: number,
    comName?: string,
    image?: string,
}


interface Tab {
    name: string;
    image: string;
    color: string;
}

export default function JobCard({
    jobId,
    jobTitle,
    //jobType,
    category,
    //jobLocation,
    salaryRange,
    createdAt,
    description,
    //skills,
    design,
    type,
    onDelete,
    //companyId,
    comName,
    image,
  }: JobcardProps){
    const {openPopup} = usePopup();

    //const [tabs, setTabs] = useState<Tab[]>([]);
    const [color, setColor] = useState<string | null>(null);
    
    useEffect (() =>{
        const fetchTabs = async () => {
            try {
              const response = await fetch('/tabs.json');
              const data: Tab[] = await response.json();
              
              const matchedTab = data.find(tab => tab.name.toLowerCase() === category.toLowerCase());
              
              if (matchedTab) {
                setColor(matchedTab.color);
              } else {
                setColor("#EEEEEE");
              }
            } catch (error) {
              console.error('Error : ', error);
            }
        };
        fetchTabs();
    }, [category]);

    return(
        <div className="w-full h-full">
            {design&&design === "large" ? (
                <div className="w-full border border-gray-300 rounded-lg shadow-lg p-2">
                    <div className="flex justify-between relative">
                        {type&&type != "company" && (
                            <div className="flex gap-2 items-center">
                                <div className="relative w-8 h-8 overflow-hidden rounded-md">
                                {image ? (
                                    <Image 
                                    src={`/${image}`}
                                    alt="Company Logo"
                                    fill
                                    className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                                    N/A
                                    </div>
                                )}
                                </div>
                                                                
                                <div>
                                    <h2 className=" font-semibold text-gray-600">{comName&&comName}</h2>
                                </div>
                            </div>
                        )}
                        {/* ${color&&color || '#90CAF9'} */}
                        <div className="absolute top-0 right-0">
                            <h2 style={{ backgroundColor: color ?? "#EEEEEE" }} className={`px-2 rounded-full text-[0.7rem] font-bold text-gray-900`}>{category&&category}
                            </h2>
                        </div>
                    </div>

                    <div>
                        <h2 className="mt-1 font-bold text-gray-800">{jobTitle&&jobTitle}</h2>
                    </div>

                    <div className="pt-1 text-gray-500 text-[0.8rem] line-clamp-5">
                        <h2>{description&&description}</h2>
                    </div>

                    <div className="font-semibold pt-1 text-sm">{salaryRange&&salaryRange}/Month</div>

                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h2 className="text-[0.8rem] text-gray-400">{createdAt&&createdAt}</h2>
                        </div>

                        <div className="flex gap-3">

                            {type&&type === "company" &&(
                                <div className="text-red-600 p-1 rounded-lg border-2 border-red-600/50 flex justify-center items-center cursor-pointer" onClick={() => onDelete?.(jobId)}>
                                    <MdDelete />
                                </div> 
                            )}
                            

                            <Link  href='#' className="cursor-pointer" onClick={() => openPopup({jobId : jobId})} >
                                <button className="cursor-pointer text-[0.8rem] text-[#A1F96A] font-bold bg-[#2A2929] rounded-full py-1 px-2">View Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ):(
                <div className="w-full border border-gray-300 rounded-lg shadow-lg p-2">
                    <div className="flex justify-between relative">
                        
                        <div className="flex gap-2 items-center">
                            <div className="relative w-8 h-8 overflow-hidden rounded-md">
                                <div className="relative w-8 h-8 overflow-hidden rounded-md">
                                    
                                        <Image 
                                        src={`/${image}`}
                                        alt="Company Logo"
                                        fill
                                        className="object-cover"
                                        />
                                </div>
                             </div>
                                                                
                            <div>
                                <h2 className=" font-semibold text-gray-600">{comName&&comName}</h2>
                            </div>
                        </div>
                        
                    
                        <div className="absolute top-0 right-0">
                            <h2 className="px-2 bg-amber-500/50 rounded-full text-[0.7rem] font-bold text-gray-900">{category&&category}
                            </h2>
                        </div>
                    </div>

                    <div>
                        <h2 className="mt-1 font-bold text-gray-800">
                            {jobTitle
                                ? jobTitle.length > 30
                                ? jobTitle.slice(0, 30) + "..."
                                : jobTitle
                            : ""}
                        </h2>
                    </div>

                    <div className="pt-1 h-[10vh] text-gray-500 text-[0.8rem]">
                        <h2>
                        {description
                            ? description.length > 110
                            ? description.slice(0, 110) + "..."
                            : description
                        : ""}
                        </h2>
                    </div>

                    <div className="font-semibold pt-1 text-sm">{salaryRange&&salaryRange}/Month</div>

                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h2 className="text-[0.8rem] text-gray-400">{createdAt&&createdAt}</h2>
                        </div>

                        <div>
                            <Link  href='#' className="cursor-pointer"  onClick={() => openPopup({jobId : jobId})}>
                                <button className="cursor-pointer text-[0.8rem] text-[#A1F96A] font-bold bg-[#2A2929] rounded-full py-1 px-2">View Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
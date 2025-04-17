'use client'

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react"

interface Tab {
    name: string;
    image: string;
    color: string;
}

interface postProps {
    fetchJobs?: () => void
}


export default function NewPost({fetchJobs} : postProps) {
    const {currentUser} = useUser();
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [tempCategory, setTempCategory] = useState(false);
    const [postData,setPostData] = useState({
        jobTitle: "",
        jobType: "",
        category: "",
        jobLocation: "",
        salaryRange: "",
        createdAt: new Date(),
        description: "",
        skills: "",
        companyId: currentUser&&currentUser.companyId,
    });

    useEffect(() =>{
        const fetchTabs = async () =>{
            try {
                const response = await fetch('/tabs.json');
                const data: Tab[] = await response.json();
                setTabs(data);

              } catch (error) {
                console.error('Error : ', error);
              }
        }
        fetchTabs();
    }, [])

    const handleSubmit = async() =>{
        
        console.log(postData)
        fetch('/api/post',{
            body: JSON.stringify(postData),
            headers: {
            "Content-Type": 'application/json'
            },
            method: 'POST',
            credentials: 'include',
        })
        .then((res) =>{
            if(res.status === 200){
                setPostData({
                    jobTitle: "",
                    jobType: "",
                    category: "",
                    jobLocation: "",
                    salaryRange: "",
                    createdAt: new Date(),
                    description: "",
                    skills: "",
                    companyId: currentUser&&currentUser.companyId,
                });
                if(fetchJobs){
                    fetchJobs();
                }
            }

            console.log(res)
        })
        
    }

    const handleTempCategory = ( value : string ) =>{
        if (value === "Other"){
            setTempCategory(true);
            setPostData({...postData, category: ''})
        }
        else{
            setTempCategory(false);
            setPostData({...postData, category: value})
        }
    }

    return(
        <div className="w-full p-3 relatve">
            <div className="">
                <h2 className="font-bold text-[#2A2929] text-2xl">Add <span className="text-[#A1F96A] border-b-[3px] border-[#2A2929]">New </span><span className="border-b-[3px] border-[#A1F96A]">Job Post</span></h2>
            </div>

            <form className="pt-5 pb-10" onSubmit={(e) =>{
                e.preventDefault() 
                handleSubmit()}}>

                <div  className="w-full overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-red-100 pr-2">
                    <div>
                        <label htmlFor="jobTitle" className="block text-gray-700 font-bold pl-5">Job Title</label>
                        <input
                            type="text"
                            value={postData.jobTitle}
                            onChange={(e) => setPostData({...postData, jobTitle: e.target.value})}
                            required
                            placeholder="Enter Job Title"
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5 mb-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className="block text-gray-700 font-bold pl-5">Job Type</label>
                        <input
                            type="text"
                            value={postData.jobType}
                            onChange={(e) => setPostData({...postData, jobType: e.target.value})}
                            required
                            placeholder="Enter job type - e.g. Remote, Onsite, Hybrid.."
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5 mb-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className="block text-gray-700 font-bold pl-5">Job Category</label>
                        
                        <div className="w-full flex justify-between gap-4">
                            <div className="w-[50%]">
                                <select className="w-full h-10 bg-gray-200 rounded-full outline-none px-5 mb-3" value={postData.category} onChange={(e) => handleTempCategory(e.target.value)}>
                                    <option>Select Category</option>
                                    {tabs&&tabs.map((tab, index) =>(
                                        <option key={index} value={tab.name}>{tab.name}</option>
                                    ))}
                                </select>
                            </div>

                            {tempCategory && (
                                <input
                                    type="text"
                                    value={postData.category}
                                    onChange={(e) => setPostData({...postData, category: e.target.value})}
                                    required
                                    placeholder="Enter youe other category"
                                    className="w-[50%] h-10 bg-gray-200 rounded-full outline-none px-5 mb-3"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className="block text-gray-700 font-bold pl-5">Salary Range</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={postData.salaryRange}
                                onChange={(e) => setPostData({...postData, salaryRange: e.target.value})}
                                required
                                placeholder="Enter Salary Range - e.g. 40k - 60k"
                                className="w-[80%] h-10 bg-gray-200 rounded-full outline-none px-5 mb-3"
                            />
                            <h2 className="pt-3 font-bold">/Month</h2>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className="block text-gray-700 font-bold pl-5">Job Location</label>
                        <input
                            type="text"
                            value={postData.jobLocation}
                            onChange={(e) => setPostData({...postData, jobLocation: e.target.value})}
                            required
                            placeholder="Enter Job Location"
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5 mb-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className="block text-gray-700 font-bold pl-5">About Job</label>
                        <textarea
                            value={postData.description}
                            onChange={(e) => setPostData({...postData, description: e.target.value})}
                            required
                            rows={20}
                            cols={50}
                            placeholder="Enter job decription"
                            className="w-full h-40 bg-gray-200 rounded-2xl outline-none px-5 mb-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="jobTitle" className="block text-gray-700 font-bold pl-5">Skills & Requirements</label>
                        <textarea
                            value={postData.skills}
                            onChange={(e) => setPostData({...postData, skills: e.target.value})}
                            required
                            rows={20}
                            cols={50}
                            placeholder="Enter job requirements and skills"
                            className="w-full h-32 bg-gray-200 rounded-2xl outline-none px-5 mb-3"
                        />
                    </div>

                    <div className="w-full flex justify-end">
                        <button type="submit" className="cursor-pointer px-4 py-2 rounded-full text-center bg-[#2A2929] text-[#A1F96A] font-bold"> Add Post</button>
                    </div>

                </div>
            </form>


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
'use client'

import { useUser } from "@/context/UserContext"
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";

export default function Company() {
    const { currentUser, setCurrentUser} =  useUser();
    const [update, setUpdate] = useState(false);
    const [companyDetails, setCompanyDetails] = useState<{
        companyId: number ;
        comName: string;
        comEmail: string;
        comLocation: string;
        image: string | File;
        web: string;
        contact: string;
        userId: number;
      }>({
        companyId : 0,
        comName : "",
        comEmail : "",
        comLocation: "",
        image : "",
        web : "",
        contact : "",
        userId: 0
    });

    const updateUserDetails = (image: string) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          user.image = image;
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
        }
    };
      

    const handleSubmit = () =>{
        const isFile = companyDetails.image instanceof File;

        const formData = new FormData();
        formData.append("companyId", companyDetails.companyId.toString());
        formData.append("comName", companyDetails.comName);
        formData.append("comEmail", companyDetails.comEmail);
        formData.append("comLocation", companyDetails.comLocation);
        formData.append("web", companyDetails.web);
        formData.append("contact", companyDetails.contact);

        if (isFile) {
            formData.append("image", companyDetails.image);
        } else {
            formData.append("image", companyDetails.image.toString());
        }
        fetch(`/api/company`, {
            method: "PUT",
            body: formData,
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) =>{
            fetchCompany();
            setUpdate(false);
            setCompanyDetails({
                companyId : 0,
                comName : "",
                comEmail : "",
                comLocation: "",
                image : "",
                web : "",
                contact : "",
                userId: 0
            })
            updateUserDetails(data?.company?.image)
            console.log('data' ,data?.company?.image);
        })
    }

    const fetchCompany = async () => {
        fetch(`/api/company/${currentUser && currentUser.id}`, {
            headers: {
              "Content-Type": 'application/json'
            },
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data.company);
            setCompanyDetails(data.company);
        })
    }

    useEffect(()=>{
        fetchCompany();
    },[]);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full h-2/8 rounded-lg shadow-xl backdrop-blur-md bg-white/50 p-3">
                <h2 className='text-lg'>Hi,</h2>
                <h2 className="text-2xl font-bold">{currentUser && currentUser.name}</h2>
                <h2 className='text-sm text-gray-500'>{currentUser && currentUser.email}</h2>
            </div>


            <div className="w-full h-6/8 bg-white rounded-lg shadow-2xl overflow-hidden">
                {!update ? (
                    <div className="w-full h-full">
                        <div className="relative flex flex-col items-center bg-red-600">
                            <div className="w-full h-24 bg-[#2A2929]"></div>

                            <div className="w-28 h-28 rounded-full bg-gray-200 absolute top-10 overflow-hidden border-8 border-white">
                                {companyDetails && companyDetails.image && (
                                    <Image 
                                        src={typeof companyDetails.image === "string" ? `/${companyDetails.image}` : URL.createObjectURL(companyDetails.image)}
                                        alt="company"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            <div className=" absolute top-3 right-3 p-2 rounded-full bg-gray-100/10 hover:bg-amber-50 text-[#A1F96A] hover:text-[#2A2929]" onClick={() => setUpdate(true)}><RiEdit2Fill className=""/></div>

                        </div>

                        {companyDetails === null ? (
                            <div className="w-full h-full pt-16">
                                <h2 className="text-xl font-bold text-center mt-20">No Company Details</h2>
                                <p className="text-sm text-gray-500 text-center">Please add your company details</p>
                            </div>
                        ):(
                            <div className="pt-16">
                                <div className="text-center font-bold text-xl">{companyDetails&&companyDetails.comName}</div>
                                <div className="text-center text-gray-500">{companyDetails&&companyDetails.comLocation}</div>
                                <div className="text-center text-gray-800">{companyDetails&&companyDetails.comEmail}</div>
                                <div className="text-center text-gray-800">{companyDetails&&companyDetails.contact}</div>
                                <div className="text-center text-gray-500">{companyDetails&&companyDetails.web}</div>
                            </div>
                        )}
                    </div>
                ):(
                    <div className="w-full h-full">
                        <div className="relative h-[23%] flex flex-col items-center">
                            <div className="w-full h-24 bg-[#2A2929]"></div>

                            <label htmlFor="imageInput" className="w-28 h-28 rounded-full bg-gray-200 absolute top-10 overflow-hidden border-8 border-white cursor-pointer">
                            {companyDetails &&companyDetails.image ? (
                                <Image
                                src={typeof companyDetails.image === "string" ? `/${companyDetails.image}` : URL.createObjectURL(companyDetails.image)}
                                alt="company"
                                fill
                                className="object-cover"
                                />
                            ) : null}
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setCompanyDetails({ ...companyDetails, image: file });
                                }
                                }}
                            />
                            </label>

                            <div className=" absolute top-3 right-3 p-2 rounded-full bg-gray-100/10 hover:bg-amber-50 text-[#A1F96A] hover:text-[#2A2929]" onClick={() => setUpdate(false)}><RiEdit2Fill className=""/></div>

                        </div>

                        <form className="pt-16 px-4 flex flex-col gap-4 pb-3 h-[77%]" onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5"
                            value={companyDetails?.comName ?? ""}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, comName: e.target.value })}
                            />
                            <input
                            type="email"
                            placeholder="Email"
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5"
                            value={companyDetails?.comEmail ?? ""}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, comEmail: e.target.value })}
                            />
                            <input
                            type="text"
                            placeholder="Location"
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5"
                            value={companyDetails?.comLocation ?? ""}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, comLocation: e.target.value })}
                            />
                            <input
                            type="text"
                            placeholder="Website"
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5"
                            value={companyDetails?.web ?? ""}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, web: e.target.value })}
                            />
                            <input
                            type="text"
                            placeholder="Contact Number"
                            className="w-full h-10 bg-gray-200 rounded-full outline-none px-5"
                            value={companyDetails?.contact ?? ""}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, contact: e.target.value })}
                            />

                            <button
                            type="submit"
                            className="bg-[#2A2929] text-white w-full h-10 rounded-full outline-none px-5 hover:bg-black cursor-pointer"
                            >
                            Save
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
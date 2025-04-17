'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState} from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function Navbar() {

    
    const {currentUser, logout,} = useUser();
    const router = useRouter();
    
    const handleLogout = async() => {
        const result = await logout();
        if (result.status === 'success'){
            router.push('/');
        }
    }
    
    return (
        <nav className='bg-white shadow-md fixed top-0 left-0 w-full z-10'>
            <div className='container mx-auto flex justify-between items-center px-5 py-4'>
                <Link href='/' className='text-[#2A2929] text-2xl font-bold'>
                    <span className='text-[#A1F96A]'>.</span>Next<span className='text-[#A1F96A]'>Leap</span>
                </Link>

                <div className='flex items-center space-x-4'>
                    {currentUser ? (
                        <>

                            <button
                                onClick={() => handleLogout()}
                                className="px-3 h-10 rounded-full bg-[#2A2929] text-gray-300 hover:text-gray-300"
                            >
                                Logout
                            </button>

                            <Link href='/dashboard'>
                                <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md">
                                    {currentUser && currentUser.image == 'noCompanyImage' ? (
                                        <div className='w-full h-full bg-[#2A2929] flex justify-center items-center relative'>
                                            <div className='w-6 h-6 border-2 border-[#A1F96A] rounded-full flex justify-center items-center'>
                                                <div className=' w-2 h-2 rounded-full bg-[#A1F96A]'></div>
                                            </div>
                                            
                                        </div>
                                    ):(
                                      <Image
                                        src={`/${currentUser && currentUser.image}`}
                                        alt="User"
                                        fill
                                        className="object-cover"
                                        />  
                                    )}
                                    
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="px-3 h-10 rounded-full bg-gray-200 text-[#2A2929] hover:bg-[#2A2929] hover:text-gray-300">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">
                            <button className="px-3 h-10 rounded-full bg-[#2A2929] text-gray-300 hover:bg-gray-300 hover:text-[#2A2929]">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
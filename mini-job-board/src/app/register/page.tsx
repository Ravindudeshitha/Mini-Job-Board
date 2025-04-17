'use client'

import { useUser } from "@/context/UserContext";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { register } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await register(name, email, password);

        if (result.status === 'error'){
            setError(result.message);
        }
        else if ( result.status === 'success'){
            setError('');
            router.push('/login');
        }
    }

    return (
        <div className="w-full h-[100vh] bg-[#2A2929] text-[#2A2929] flex justify-center items-center relative">
            <Link href='/' className='text-[#2A2929] text-2xl font-bold absolute top-5 left-5'>
                <button className="bg-gray-200/50 px-3 py-2 rounded-full hover:bg-gray-200 cursor-pointer">
                    <span className='text-[#A1F96A]'>.</span>Next<span className='text-[#A1F96A]'>Leap</span>
                </button>
            </Link>

            <main className="w-[350px] bg-white mx-auto py-10 px-5 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                <form 
                    onSubmit={handleSubmit} 
                    className="max-w-md mx-auto"
                >
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#2A2929] text-[#A1F96A] p-2 rounded"
                >
                    Sign Up
                </button>
                </form>
                <p className="mt-4 text-center">
                Already have an account?{' '}
                <Link href="/login" className="text-[#A1F96A]">
                    Login
                </Link>
                </p>
            </main>
        </div>

    )
}
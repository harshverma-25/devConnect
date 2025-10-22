import React from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center relative">
            <img src={logo} alt="DevConnect Logo" className="absolute top-8 left-8 w-16 h-16 object-contain" />
            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 w-full max-w-md flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Create an Account</h2>
                <form className="space-y-5 w-full">
                    <div>
                        <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">First Name</label>
                        <input type="text" id="name" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block mb-1 text-gray-700 font-medium">Last Name</label>
                        <input type="text" id="lastname" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-1 text-gray-700 font-medium">Username</label>
                        <input type="text" id="username" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">Email</label>
                        <input type="email" id="email" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">Password</label>
                        <input type="password" id="password" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold shadow transition">Sign Up</button>
                </form>
                <p className="mt-4 text-gray-600 text-sm">
                    Already have an account? <span onClick={() => navigate("/login")} className="text-blue-500 hover:underline cursor-pointer">Sign In</span>
                </p>
            </div>
        </div>
    )
}

export default Signup;
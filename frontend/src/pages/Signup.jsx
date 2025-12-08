import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(authDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + "/api/auth/signup", {
        firstname,
        lastname,
        username,
        email,
        password,
      }, { withCredentials: true });

      console.log(result);
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center relative">
      <img src={logo} alt="DevConnect Logo" className="absolute top-8 left-8 w-16 h-16 object-contain" />
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Create an Account</h2>
        <form className="space-y-5 w-full" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">First Name</label>
            <input type="text" id="name" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={firstname} onChange={(e)=> setFirstname(e.target.value)} />
          </div>
          <div>
            <label htmlFor="lastname" className="block mb-1 text-gray-700 font-medium">Last Name</label>
            <input  type="text" id="lastname" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={lastname} onChange={(e)=> setLastname(e.target.value)} />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-700 font-medium">Username</label>
            <input type="text" id="username" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={username} onChange={(e)=> setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">Email</label>
            <input type="email" id="email" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">Password</label>
            <input type="password" id="password" className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={password} onChange={(e)=> setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold shadow transition">Sign Up</button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500 hover:underline cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

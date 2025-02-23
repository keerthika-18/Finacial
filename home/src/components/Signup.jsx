import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [email,setEmail] =useState("");
    const[password,setPassword]=useState("");
    const navigate =useNavigate();
    const handleSubmit= (e)=>{
        e.preventDefault();
        alert("signup sucessfull!");
        navigate("/");
    }
    return ( 
        <>
        <div className="flex flex-col items-center min-h-screen bg-gray1\ p=6">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <input type="email"placeholder="Email" className="border p-2 w-full mb-3"  onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={(e)=>setPassword(e.target.value)} required/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Register</button>
            </form>
        </div>
        </>
     );
}
 
export default Signup;

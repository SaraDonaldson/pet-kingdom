'use client'
import { FormEventHandler, useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { Login } from "@/lib/functions/login";
import { LoginFormData } from "@/lib/types/Login";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
    
        const formData: LoginFormData = { email, password};
        const login = await Login(formData);
        //@ts-ignore
        // console.log(login);

        if (login.error) {
        //@ts-ignore
          throw new Error(login.error);
        }
        // get user by id to add to local storage
        // Redirect or show a success message
        // need to get the user details to add name here
        // alert("Welcome Back: " + JSON.stringify(login));
        alert("Welcome Back: ");
   
      } catch (error:any) {
        setErrorMessage(error);
        alert("Error logging in. Please check your email and password");
      }
}
    return (
      <div className="flex dark:text-black  justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
          </div>
        </form>

        </div>
      </div>
    );
  }
  
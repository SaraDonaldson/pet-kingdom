'use client'
import { FormEventHandler, useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { Login } from "@/lib/functions/login";
import { LoginFormData } from "@/lib/types/Login";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e: any) => {
    e.preventDefault();
 
    let email = e.target.email.value;
    let password = e.target.password.value
    try {
    
        const formData: LoginFormData = { email, password};
        const login = await Login(formData);
        //@ts-ignore
        // console.log(login);

        if (login.error) {
        //@ts-ignore
          throw login.error;
        }
        // add user details to local storage
        let userString = JSON.stringify(login);
        localStorage.setItem("user", userString);

    //  create alert to show success - include user name
        const getUserInfo = localStorage.getItem("user");
        const parsedUserInfo = getUserInfo && JSON.parse(getUserInfo);
        alert("Welcome Back "+ parsedUserInfo.name);
   
      } catch (error:any) {
        // console.log("p",JSON.stringify(error))
        setErrorMessage(error.message);
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
              name= "email"
              id="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">password</label>
            <input
              type="password"
              name = "password"
              id="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{JSON.stringify(errorMessage)}</p>}
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
          </div>
        </form>

        </div>
      </div>
    );
  }
  
'use client'
import { FormEventHandler, useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { registerUser } from "@/lib/functions/registerUser";
import { RegistrationFormData } from "@/lib/types/Registration";


export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (name.length < 3) {
        throw new Error("Name Must be at least 3 characters long");
      }
      const formData: RegistrationFormData = { name, surname, email, password };
      const newlyCreatedUser = await registerUser(formData);
      if (newlyCreatedUser.error) {
        throw new Error(newlyCreatedUser.error);
      }
      alert("User created: " + JSON.stringify(newlyCreatedUser));
      // Redirect or show a success message
    } catch (error:any) {
      setErrorMessage(error);
      alert("Error creating your account, please try again later");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center">User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
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
            <label className="block text-sm font-medium mb-2" htmlFor="name">Surname</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
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
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

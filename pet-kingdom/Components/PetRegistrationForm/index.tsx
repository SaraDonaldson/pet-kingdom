'use client'
import { FormEventHandler, useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { PetRegistrationFormData } from "@/lib/types/PetRegistration";
import { registerPet } from "@/lib/functions/registerPet";


export default function PetRegistrationForm() {
  const [petName, setPetName] = useState("");
  const [animal, setAnimal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (petName.length < 3) {
        throw new Error("Name Must be at least 3 characters long");
      }

      const getUserInfo = localStorage.getItem("user")
      const parsedUserInfo = getUserInfo && JSON.parse(getUserInfo)
      const userId =parsedUserInfo && parsedUserInfo.id
      
      const formData: PetRegistrationFormData  = { petName, animal, userId};
      const newlyCreatedPet = await registerPet(formData);
      //@ts-ignore
      if (newlyCreatedPet.error) {
      //@ts-ignore
        throw new Error(newlyCreatedPet.error);
      }

      alert("Pet created: " + JSON.stringify(newlyCreatedPet));
      // Redirect or show a success message
    } catch (error:any) {
      setErrorMessage(error);
      alert("Error creating your pet profile, please try again later");
    }
  };

  return (
    <div className="flex dark:text-black  justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center">Register your pet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Pet's name</label>
            <input
              type="text"
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">What type of animal?</label>
            <input
              type="text"
              id="animal"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
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

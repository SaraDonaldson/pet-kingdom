'use server'

import { PrismaClient } from "@prisma/client";
import { PetRegistrationFormData } from "../types/PetRegistration";



const prisma = new PrismaClient();

async function registerPet(petRegistrationFormData: PetRegistrationFormData) {
  try {
    if (!petRegistrationFormData) {
      const error = new Error('missing form data');
      throw error;
    }
    const { petName, animal, userId }:PetRegistrationFormData = petRegistrationFormData;

    // fire the command to 
    const pet = await prisma.pet.create({
      data: {
        name: petName,
        animal: animal,
        userId: userId
      },
    });

    return pet;

  } catch (error:any) {
    return { error: error };
  }
}

export {registerPet}
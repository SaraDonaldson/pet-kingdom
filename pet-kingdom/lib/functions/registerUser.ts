'use server'

import { RegistrationFormData } from "../types/Registration";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";



const prisma = new PrismaClient();

async function registerUser(registrationFormData: RegistrationFormData) {
  try {
    if (!registrationFormData) {
      const error = new Error('missing form data');
      throw error;
    }
    const { name, email, password, surname }:RegistrationFormData = registrationFormData;

    // hash the password 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // fire the command to 
    const user = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        userCredentials: {
          create: {
            email: email,
            password: hashedPassword,  // The hashed password is stored!
          },
        },
      },
    });

    return user;

  } catch (error:any) {
    return { error: error };
  }
}

export {registerUser}
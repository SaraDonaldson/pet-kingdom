"use server";

import { PrismaClient } from "@prisma/client";
import { LoginFormData } from "../types/Login";
import bcrypt from "bcrypt";
import { error } from "console";

const prisma = new PrismaClient();

async function Login(LoginFormData: LoginFormData) {
  // get user credentials by email

  try {
    if (!LoginFormData) {
      const error = new Error("missing form data");
      throw error;
    }
    const { email, password }: LoginFormData = LoginFormData;

    // get user by email address
    const userCredentials = await prisma.user_Credentials.findUnique({
      where: {
        email: email,
      },
    });
    // password check via auth route -  bcrypt compare
    if (userCredentials) {
      const formPassword = password;
      const hash = userCredentials.password;
      const match = await bcrypt.compare(formPassword, hash);

      if (match) {
        // return user info from user table to use in local storage at client
        const user = await prisma.user.findUnique({
          where: {
            id: userCredentials.userId,
          },
        });
        return user;
      } else {
        throw error;
      }
    }
  } catch (error: any) {
    console.log("Error in Login : ", error);
    return {
      error: {
        message: "login error",
      },
    };
  }
}

export { Login };

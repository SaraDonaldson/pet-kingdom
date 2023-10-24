import { PrismaClient } from "@prisma/client";
import LoginForm from "@/Components/LoginForm";

const prisma = new PrismaClient();

export default function Login() {
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <LoginForm/>
    </div>
  );
}
import { PrismaClient } from "@prisma/client";
import RegistrationForm from "@/Components/RegistrationForm";

const prisma = new PrismaClient();

export default function Register() {
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <RegistrationForm/>
    </div>
  );
}

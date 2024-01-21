import { PrismaClient } from "@prisma/client";
import PetRegistrationForm from "@/Components/PetRegistrationForm";

const prisma = new PrismaClient();

export default function RegisterPet() {
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <PetRegistrationForm/>
    </div>
  );
}

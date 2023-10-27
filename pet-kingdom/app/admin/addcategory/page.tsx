import { PrismaClient } from "@prisma/client";
import AddCategory from "@/Components/AddCategory";

const prisma = new PrismaClient();

export default function addCategory() {
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <AddCategory/>
    </div>
  );
}
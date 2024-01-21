import { PrismaClient } from "@prisma/client";
import AddProduct from "@/Components/AddProduct";

const prisma = new PrismaClient();

export default function product() {
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <AddProduct/>
    </div>
  );
}
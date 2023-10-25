'use server'

import { PrismaClient } from "@prisma/client";
import { Category } from "../types/Category";


const prisma = new PrismaClient();
// newCategory:Category

async function getAllCategories() {

    
    try {
        const categories = await prisma.category.findMany()
    

        return categories
    
      } catch (error:any) {
        return { error: error };
      }
    
    
}

export {getAllCategories}
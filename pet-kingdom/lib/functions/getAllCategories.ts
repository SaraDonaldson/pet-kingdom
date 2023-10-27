'use server'

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function getAllCategories() {

    
    try {
        const categories = await prisma.category.findMany()
    

        return categories
   
        
    
      } catch (error:any) {
        return { error: error };
      }

    
}

export {getAllCategories}
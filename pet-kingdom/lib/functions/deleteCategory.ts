'use server'

import { PrismaClient } from "@prisma/client";
import { Category } from "../types/Category";

// Delete a category by it’s ID
const prisma = new PrismaClient();

async function deleteCategoryById( categoryId: string) {

    
    try {
        
        const deleteCategory = await prisma.category.delete({
            where: {
              id: categoryId
            },
          })

          if(deleteCategory){
            const categories = await prisma.category.findMany()
            return categories
    }        

      } catch (error:any) {
        return { error: error };
      }
    
}

export {deleteCategoryById}
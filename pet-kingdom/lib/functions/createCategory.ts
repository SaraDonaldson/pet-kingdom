'use server'

import { PrismaClient } from "@prisma/client";
import { Category } from "../types/Category";


const prisma = new PrismaClient();

async function createCategory(newCategory:Category) {

    
    try {
        const name: Category = newCategory
        const category = await prisma.category.create({
          data: {
            name:  name,
            },
          })

        
          return newCategory
      } catch (error:any) {
        return { error: error };
      }
    
}

export {createCategory}
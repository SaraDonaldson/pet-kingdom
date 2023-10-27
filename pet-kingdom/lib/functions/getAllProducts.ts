'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function getAllProducts() {

    
    try {
        const products = await prisma.product.findMany({
          include: {
            productInfo: {
              
            }
          },
        })

          return products
    
      } catch (error:any) {
        return { error: error };
      }
    
    
}

export {getAllProducts}
'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get the most recent active cart for the user that isn’t a complete or checked out cart


async function getRecentCart(userId:string) {

    
    try {
        const cart = await prisma.cart.findMany({
         where: {
            userId: userId,
            status: 'ACTIVE',
          },
        })

         return cart
    
      } catch (error:any) {
        return { error: error };
      }
    
    
}

export {getRecentCart}
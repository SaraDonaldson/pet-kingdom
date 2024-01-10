'use server'

import { PrismaClient } from "@prisma/client";
import { Cart } from "../types/Cart";


const prisma = new PrismaClient();


async function createCart(newCart:Cart) {

    
    try {


        const {userId}: Cart= newCart;
        const cart = await prisma.cart.create({
          data: {
            userId:  userId,
            },
          })

        
          return cart
      } catch (error:any) {
        return { error: error };
      }
    
}

export {createCart}
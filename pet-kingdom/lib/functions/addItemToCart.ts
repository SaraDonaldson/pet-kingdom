'use server'

import { PrismaClient } from "@prisma/client";
import { CartItem } from "../types/CartItem";


const prisma = new PrismaClient();


async function addItemToCart(newCartItem: CartItem) {

    // item quantity can have some logic here
    
    try {
     

        const {lineItemId, productId, cartId, itemQuantity}: CartItem= newCartItem;
        const cartItem = await prisma.cart_Item.create({
          data: {
            lineItemId: lineItemId,
            productId : productId, 
            cartId: cartId, 
            itemQuantity:itemQuantity
            },
          })

        
          return cartItem
      } catch (error:any) {
        return { error: error };
      }
    
}

export {addItemToCart}
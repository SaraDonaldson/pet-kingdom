'use server'
import { PrismaClient } from "@prisma/client";
import { CartItem } from "../types/CartItem";
const prisma = new PrismaClient();

async function updateCartItemQuantity( updateCartItem:CartItem) {

    try {

        // cartid, product line id, 
        const {lineItemId, productId, cartId, itemQuantity}: CartItem = updateCartItem;



       const cartItem = await prisma.cart_Item.update({
            where: {
              cartId: cartId,
              lineItemId: lineItemId,
            },
            data: {
                itemQuantity: itemQuantity
            },
          })

        return cartItem
    
      } catch (error:any) {
        return { error: error };
      }
    
}

export {updateCartItemQuantity}
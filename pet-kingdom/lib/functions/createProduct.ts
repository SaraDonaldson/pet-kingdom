'use server'

import { PrismaClient } from "@prisma/client";
import { Product } from "../types/Product";



const prisma = new PrismaClient();

async function createProduct(newProduct:Product) {


    try {
        
    //  check duplicates with existing products - name + category = same 
    //  return duplicate category and name message
    
        const {name, categoryId, description, inventory, inventoryWarning, price, imageUrl}: Product= newProduct;
        const product = await prisma.product.create({
          data: {
            name:  name,
            productInfo: {
                create: {
                    name: name,
                    description: description,
                    price: price,
                    inventory: inventory,
                    inventoryWarning: inventoryWarning,
                    images: {
                        create: {
                            imageUrl: imageUrl,
                        }
                    }
                }
            },
            categories: {
                create: {
                categoryId: categoryId,
                }
            },
            },
          })

        
          return product
      } catch (error:any) {
        return { error: error };
      }
    
}

export {createProduct}
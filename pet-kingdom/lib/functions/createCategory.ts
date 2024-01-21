'use server'

import { PrismaClient } from "@prisma/client";
import { Category } from "../types/Category";


const prisma = new PrismaClient();
// newCategory:Category

async function createCategory(newCategory:Category) {

    
    try {
        
    //  check duplicates with existing categories - name + parent = same 
    //  return duplicate category name at parent message
    //  check duplicates with existing order at level - order number + parent = same
    //  add number until not the same as existing
  
    // only for front end test of category
    if (!newCategory.parentId){
        newCategory.parentId = undefined
    }
    if (!newCategory.headerImg ){
        newCategory.headerImg = undefined
    }
    if (!newCategory.description){
        newCategory.description = undefined
    }



        const {name, link, order, parentId, headerImg, description}: Category = newCategory;
        const category = await prisma.category.create({
          data: {
            name:  name,
            link: link,
            order: order,
            parentId:  parentId,
            headerImg:  headerImg, 
            description: description,
            },
          })

        
          return category
      } catch (error:any) {
        return { error: error };
      }
    
}

export {createCategory}
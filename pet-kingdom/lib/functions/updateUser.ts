'use server'

import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();

async function updateUser(id:string) {

    try {
        if (!id) {
          const error = new Error('no user id');
          throw error;
        }

        // 
        // get user from db
        const originalUser = await prisma.user.findUnique({
            where: {
              id: id,
            },
          })
        // compare new details to user details
        // const 
       
          // if new info is different
       const updateUser = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
        //   parts to update
            },
          })

        return updateUser
    
      } catch (error:any) {
        return { error: error };
      }
    
}

export {updateUser}
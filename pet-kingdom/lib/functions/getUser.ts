'use server'

import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();

async function getUser(id:string) {

    try {
        if (!id) {
          const error = new Error('no user id');
          throw error;
        }
        const user = await prisma.user.findUnique({
            where: {
              id: id,
            },
          })

        return user
    
      } catch (error:any) {
        return { error: error };
      }
    
}

export {getUser}
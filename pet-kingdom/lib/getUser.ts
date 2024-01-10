'use server'

import prisma from "./prisma"


export async function getAllUsers (){


    const users = await prisma.user.findMany()
    if(users.length > 0){
        return users
    }

    return []

}
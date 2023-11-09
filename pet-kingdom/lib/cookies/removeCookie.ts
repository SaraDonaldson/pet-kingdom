'use server'

import { cookies } from "next/headers"


export async function removeCookie(name:string){
    const cookieStorage = cookies()
    cookieStorage.delete(name)
}
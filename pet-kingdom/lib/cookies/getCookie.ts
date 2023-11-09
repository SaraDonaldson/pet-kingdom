'use server'

import { cookies } from "next/headers"


export async function getCookie(name:string){
    const cookieStorage = cookies()
    const foundCookie = cookieStorage.get(name)
    return foundCookie
}
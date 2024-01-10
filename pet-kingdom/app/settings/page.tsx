
import Button from '@/components/Common/Button'
import { getAllUsers } from '@/lib/getUser'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useState } from 'react'

const getServerSideProps =( async (context:any) => {
    const users = await getAllUsers()
    
    return {props:{users}}
}) satisfies GetServerSideProps<{users:any}>

// "use client"
export default async function Settings({users}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    // const [users, setUsers] = useState<any>([])

// async function getAllTheUsers(){
//     const users =await gqetAllUsers()
//     setUsers(users)
// }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex ">
                <h2> Here are the Users</h2>
                <div className={"w-screen flex-col"} >
                    {/* <Button clickFunction={() => console.log("users", users)} label={"Fetch Users"} /> */}
                </div>
                {users && users.length > 0 && users.map((user:any) => <div>{user.name}</div>)}

      </div>
    </main>
  )
}

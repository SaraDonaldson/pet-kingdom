'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'



export default function Breadcrumbs(){
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [searchPhrase, setSearchPhrase] = useState("")
    let breadcrumbsArray= pathname.split("/")
    let lastParam= breadcrumbsArray.length -1
   
    useEffect (() => {
        extractSearchText()
    }, [pathname, searchParams])
  
 
  
   function extractSearchText(){
    let searchText = searchParams.toString()
    let modifiedSearchText= ""
        if(searchText.startsWith("q=")){
        modifiedSearchText= searchText.slice(2).replace("-", " ")
         setSearchPhrase(modifiedSearchText)
        }
   }


   
   return (
        <div className={"w-full text-lg font-semibold text-gray-900 m-4 mt-10"}>
           

        <div>
            <Link href="/home" className='no-underline hover:underline hover:text-blue-600 cursor-pointer'>Home /</Link>
            {breadcrumbsArray.map((p, i)=> 
            {if (p != "" && p != "home"){
                if(i != lastParam || p === "search"){
                    console.log(breadcrumbsArray)
                    let pageLink = breadcrumbsArray.slice(0,i+1)
             return <Link href= {pageLink.join("/")} className='no-underline hover:underline hover:text-blue-600 cursor-pointer'> {p.replaceAll("-"," ")} /</Link>
            }else{
                return <Link href= {p}  className='font-extrabold'> {p.replaceAll("-"," ")}</Link>
            }
            }
       })}

       { 
        pathname.includes("search") && searchPhrase
               ? <a className='font-extrabold'>  "{searchPhrase}"</a>
            : ""
        }
       

        </div>
        </div>
    )
}
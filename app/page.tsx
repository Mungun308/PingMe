import '@/app/globals.css'
import React from "react";
import {redirect} from "next/navigation"


export default async function Home() {

  return (
    <main>
      const session = await auth()
  
      if (session?.user) {
        redirect("/main")  // нэвтэрсэн → /main
      } else {
        redirect("/home")  // нэвтрээгүй → /home
      }
      
      
    </main>
  )
}
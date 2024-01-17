import Navbar from '@/Components/Navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/Components/Footer/Footer'
import TopSubNav from '@/Components/Navbar/Subnavs/TopSubNav/TopSubNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pet Kingdom',
  description: 'Your one-stop shop for pet supplies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <TopSubNav />
      <Navbar/>
        {children}
      <Footer />
        </body>
    
    </html>
   
  )
}

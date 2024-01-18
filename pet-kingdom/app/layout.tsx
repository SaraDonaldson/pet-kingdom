import Navbar from '@/Components/Navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/Components/Footer/Footer'
import TopSubNav from '@/Components/Navbar/Subnavs/TopSubNav/TopSubNav'
import MiniCart from '@/Components/MiniCart/MiniCart'

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

  const cartItems = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 7.99 },
  ];
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <TopSubNav />
      <Navbar/>
      <MiniCart items={cartItems}/>
        {children}
      <Footer />
        </body>
    
    </html>
   
  )
}

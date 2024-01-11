'use client';
import Button from '@/Components/Common/Button/Button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button clickFunction={() =>console.log('clicked')} label={"click me"}/>
    </main>
  )
}

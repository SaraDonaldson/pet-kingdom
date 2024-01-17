'use client';
import Button from '@/Components/Common/Button/Button'
import Slider from '@/Components/Common/Slider/Slider';
import Image from 'next/image'

export default function Home() {
  const heroBanners:any = [
    {imageUrl:"https://cdn.media.amplience.net/i/petsathome/hp-sldr-jan23-dt_2?w=3000&",
    caption:'Get a dog'},
    {
      imageUrl:"https://cdn.media.amplience.net/i/petsathome/hp-sldr-puppyshoppinglist-dt?w=2600&",
      caption:"get a cat"
    },
    {
      imageUrl:"https://cdn.media.amplience.net/i/petsathome/hp-sldr-easyrepeat-aug23-dt?w=2000&",
      caption:"Extra banner"
    }

  ]
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Button clickFunction={() =>console.log('clicked')} label={"click me"}/>
      <Slider slides={heroBanners}/>
    </main>
  )
}

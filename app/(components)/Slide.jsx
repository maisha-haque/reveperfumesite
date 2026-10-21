import React from 'react'
import { Amarante } from 'next/font/google'
import Container from './Container'
import PerfumeSlider from './PerfumeSlider'



const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],

})

const Slide = () => {
  return (
    <section className='py-8 sm:py-14 lg:py-20 overflow-hidden'>
      <Container className='max-w-full px-4 xl:px-0'>
        <h2 className={`font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[69px] text-center text-white leading-tight ${amarante.className}`}>
          OUR PRODUCTS
        </h2>
        <PerfumeSlider />
      </Container>
    </section>
  )
}

export default Slide
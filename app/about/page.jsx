import React from 'react'
import Link from 'next/link'
import Container from '../(components)/Container'
import { Amarante } from 'next/font/google'
import Image from 'next/image'


const amarante = Amarante({
  weight: ['400'],
  subsets: ['latin'],

})

const About = () => {
  return (
    <section className='py-12 sm:py-16 lg:py-24 overflow-hidden'>
      <Container>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16'>
          {/* Left Column: Story Text */}
          <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left'>
            <h2 className={`font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[69px] leading-tight text-white ${amarante.className}`}>
              OUR STORY
            </h2>

            <p className='mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-[20px] text-gray-200 max-w-xl leading-relaxed whitespace-pre-line font-light'>
              Born from a passion for timeless perfumery and modern elegance.

              We source the finest raw essences across the globe to craft distinct, enduring scents.

              Every note is intentionally curated to become a seamless extension of your presence.

              An understated luxury made to be felt, not just worn.
            </p>

            <Link
              href='/about'
              className={`mt-6 sm:mt-8 inline-block py-2.5 px-10 sm:px-11 bg-transparent border-2 border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 ${amarante.className}`}
            >
              LEARN MORE
            </Link>
          </div>

          {/* Right Column: Overlapping Staggered Images */}
          <div className='w-full lg:w-1/2 flex justify-center items-center'>
            <div className='relative w-[280px] sm:w-[360px] md:w-[420px] h-[300px] sm:h-[380px] md:h-[420px] shrink-0'>
              <Image
                src="/images/storyone.png"
                alt="Our Story Formulation"
                width={258}
                height={258}
                className="absolute top-0 left-0 w-[170px] sm:w-[220px] md:w-[258px] h-[170px] sm:h-[220px] md:h-[258px] object-cover rounded-2xl shadow-2xl shadow-black transition-transform duration-300 hover:scale-105"
              />

              <Image
                src="/images/storytwo.png"
                alt="Our Story Ingredients"
                width={258}
                height={258}
                className="absolute bottom-0 right-0 w-[170px] sm:w-[220px] md:w-[258px] h-[170px] sm:h-[220px] md:h-[258px] object-cover rounded-2xl shadow-2xl shadow-black transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Amarante } from 'next/font/google'
import Container from './Container'
import { useShop } from '../context/ShopContext'
import { products } from '../product/productsData'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],
})

const LimitedEdition = () => {
    const { addToCart } = useShop()
    return (
        <section className='py-16 md:py-24 lg:py-28 overflow-hidden'>
            <Container className='max-w-full px-6 xl:px-0'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-14 lg:gap-16'>
                    {/* Left: Perfume Image */}
                    <div className='w-full lg:w-1/2 flex justify-center items-center'>
                        <div className='relative w-full flex justify-center py-4'>
                            <Image
                                src='/images/perfumeone.png'
                                alt='Limited Edition Fragrance'
                                width={700}
                                height={900}
                                priority={false}
                                className='w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] h-64 sm:h-80 md:h-96 lg:h-[400px] object-contain rotate-12 sm:rotate-24 transition-transform duration-500 hover:scale-105'
                            />
                        </div>
                    </div>

                    {/* Right: Text and Action */}
                    <div className='w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start'>
                        <h2 className={`font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight text-white ${amarante.className}`}>
                            LIMITED EDITION
                        </h2>

                        <p className='mt-4 sm:mt-6 text-sm sm:text-base md:text-[17px] text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light'>
                            Crafted in numbered, artisanal batches, this exclusive fragrance captures
                            the luminous essence of sun-drenched golden amber, rare nocturnal blooms,
                            and velvety spiced vanilla. An intimate, private-reserve creation formulated
                            for connoisseurs of timeless distinction.
                        </p>

                        <div className='mt-6 sm:mt-8'>
                            <Link
                                href='/product'
                                className={`inline-block py-2.5 px-8 sm:px-11 bg-transparent border border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-sm text-sm sm:text-[16px] transition-colors duration-300 cursor-pointer ${amarante.className}`}
                            >
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default LimitedEdition

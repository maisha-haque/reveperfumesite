import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Container from './Container'
import { Amarante } from 'next/font/google'
import bannerImg from '@/public/images/banner.png'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],

})

const Banner = () => {
    return (
        <section className='relative w-full overflow-hidden py-4 sm:py-8 lg:py-16'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-2.5 sm:gap-6 lg:gap-12'>
                    {/* Left Column: Banner Image (Side-by-side on mobile, tablet, and desktop) */}
                    <div className='w-[40%] sm:w-[45%] lg:w-1/2 flex justify-center items-center shrink-0'>
                        <div className='relative w-full max-w-[170px] xs:max-w-[220px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px]'>
                            <Image
                                src={bannerImg}
                                alt="The GT Porcci Perfume"
                                width={500}
                                height={500}
                                priority
                                className='w-full h-auto object-contain mx-auto'
                            />
                        </div>
                    </div>

                    {/* Right Column: Content (Side-by-side on mobile, tablet, and desktop) */}
                    <div className='w-[60%] sm:w-[55%] lg:w-1/2 flex flex-col items-center text-center'>
                        <p className={`text-[#F5D57A] font-semibold text-[10px] xs:text-xs sm:text-base md:text-lg lg:text-[22px] tracking-wider sm:tracking-wide ${amarante.className}`}>
                            since 2005
                        </p>

                        <h1 className={`font-bold text-sm xs:text-lg sm:text-2xl md:text-4xl lg:text-[69px] leading-tight text-white mt-0.5 sm:mt-1 lg:mt-2 ${amarante.className}`}>
                            THE GT PORCCI
                        </h1>

                        <p className={`mt-1 xs:mt-2 sm:mt-3 lg:mt-4 text-[8.5px] xs:text-[10px] sm:text-xs md:text-base lg:text-[20px] text-gray-200 max-w-xl mx-auto leading-tight sm:leading-relaxed line-clamp-3 sm:line-clamp-none ${amarante.className}`}>
                            A heavy, full-bodied, powdery, warm fragrance note, amber oil comes
                            from the Baltic amber tree. &ldquo;Amber is a warm. powdery, sweet scent. It&rsquo;s
                            a combination of synthetic and natural ingredients such as vanilla,
                            patchouli, labdanum, styrax, and benzoin.&rdquo;
                        </p>

                        {/* Two Features */}
                        <div className='grid grid-cols-2 items-stretch gap-1.5 xs:gap-2.5 sm:gap-6 lg:gap-8 mt-2 xs:mt-3 sm:mt-6 lg:mt-10 w-full max-w-xl'>
                            {/* Feature 1 */}
                            <div className="flex flex-col items-center text-center h-full">
                                <Image
                                    src="/images/incensetwo.png"
                                    alt="GT Porcci Note"
                                    width={50}
                                    height={50}
                                    className='w-5 h-5 xs:w-7 xs:h-7 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] object-contain'
                                />
                                <p className={`mt-0.5 sm:mt-2 font-medium text-[9px] xs:text-[11px] sm:text-sm md:text-base lg:text-lg text-white ${amarante.className}`}>
                                    GT PORCCI
                                </p>
                                <p className='text-[7.5px] xs:text-[9px] sm:text-xs lg:text-[15px] text-gray-300 mt-0.5 sm:mt-1 max-w-[240px] leading-tight sm:leading-normal min-h-[2.5em] sm:min-h-[3em]'>
                                    GT PORCCI is a genus of 47 known species of flowering plants in the mint family
                                </p>
                                <Link
                                    href="/about"
                                    className={`mt-auto pt-1 xs:pt-2 sm:pt-4 lg:pt-6 inline-block text-[#F5D57A] hover:text-[#40E0D0] text-[8px] xs:text-[10px] sm:text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 whitespace-nowrap ${amarante.className}`}
                                >
                                    LEARN MORE
                                </Link>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col items-center text-center h-full">
                                <Image
                                    src="/images/incenseone.png"
                                    alt="Importance Note"
                                    width={50}
                                    height={50}
                                    className='w-5 h-5 xs:w-7 xs:h-7 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] object-contain'
                                />
                                <p className={`mt-0.5 sm:mt-2 font-medium text-[9px] xs:text-[11px] sm:text-sm md:text-base lg:text-lg text-white ${amarante.className}`}>
                                    IMPORTANCE
                                </p>
                                <p className='text-[7.5px] xs:text-[9px] sm:text-xs lg:text-[15px] text-gray-300 mt-0.5 sm:mt-1 max-w-[240px] leading-tight sm:leading-normal min-h-[2.5em] sm:min-h-[3em]'>
                                    One of the main benefits of wearing perfume is enhancing the mood.
                                </p>
                                <Link
                                    href="/product"
                                    className={`mt-auto pt-1 xs:pt-2 sm:pt-4 lg:pt-6 inline-block text-[#F5D57A] hover:text-[#40E0D0] text-[8px] xs:text-[10px] sm:text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 whitespace-nowrap ${amarante.className}`}
                                >
                                    BUY NOW
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Banner
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Amarante } from 'next/font/google'
import Container from './Container'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],
})

const Footer = () => {
    return (
        <footer className='w-full bg-[#151E25] border-t border-white/[0.08] text-white'>
            <Container className='max-w-full px-6 lg:px-12'>
                {/* Main Content */}
                <div className='pt-14 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 items-start'>
                    {/* Brand Column (Logo + REVE) */}
                    <div className='lg:col-span-2 flex items-center'>
                        <Link href='/' className='flex items-center group'>
                            <Image
                                src='/images/logo.png'
                                alt='Rêve logo'
                                width={155}
                                height={155}
                                className='w-24 h-24 sm:w-32 sm:h-32 lg:w-[155px] lg:h-[155px] object-contain transition-transform duration-300 group-hover:scale-105'
                            />
                            <span className='font-extralight uppercase text-2xl sm:text-3xl tracking-[0.25em] text-[#F5D57A]'>
                                Rêve
                            </span>
                        </Link>
                    </div>

                    {/* Column 2: COMPANY */}
                    <div>
                        <h3 className={`text-white text-base tracking-widest font-normal mb-5 uppercase ${amarante.className}`}>
                            COMPANY
                        </h3>
                        <ul className='space-y-3 text-sm text-gray-300 font-light'>
                            <li>
                                <Link href='/about' className='hover:text-[#40E0D0] transition-colors duration-200'>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href='/contact' className='hover:text-[#40E0D0] transition-colors duration-200'>
                                    contact us
                                </Link>
                            </li>
                            <li>
                                <Link href='/product' className='hover:text-[#40E0D0] transition-colors duration-200'>
                                    our products
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: SUPPORT */}
                    <div>
                        <h3 className={`text-white text-base tracking-widest font-normal mb-5 uppercase ${amarante.className}`}>
                            SUPPORT
                        </h3>
                        <ul className='space-y-3 text-sm text-gray-300 font-light'>
                            <li>
                                <Link href='/privacy' className='hover:text-[#40E0D0] transition-colors duration-200'>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href='/terms' className='hover:text-[#40E0D0] transition-colors duration-200'>
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href='/contact' className='hover:text-[#40E0D0] transition-colors duration-200'>
                                    Report Abuse
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: GET IN TOUCH */}
                    <div>
                        <h3 className={`text-white text-base tracking-widest font-normal mb-5 uppercase ${amarante.className}`}>
                            GET IN TOUCH
                        </h3>
                        <ul className='space-y-4 text-sm text-gray-300 font-light'>
                            <li className='flex items-center gap-3'>
                                <svg className='w-5 h-5 text-white shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
                                </svg>
                                <span>Paris,France</span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <svg className='w-5 h-5 text-white shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                                    <path fillRule='evenodd' clipRule='evenodd' d='M7 2C5.34315 2 4 3.34315 4 5V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V5C20 3.34315 18.6569 2 17 2H7ZM6.5 5.5C6.5 4.94772 6.94772 4.5 7.5 4.5H16.5C17.0523 4.5 17.5 4.94772 17.5 5.5V18.5C17.5 19.0523 17.0523 19.5 16.5 19.5H7.5C6.94772 19.5 6.5 19.0523 6.5 18.5V5.5Z' />
                                </svg>
                                <span>+33 (0)1 42 68 55 00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='py-5 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400 font-light text-center sm:text-left'>
                    <div className='w-full sm:w-auto'>
                        <p>2023. All Rights Reserved</p>
                    </div>

                    <div className='w-full sm:w-auto'>
                        <p className='hover:text-gray-300 transition-colors'>
                            Terms & Conditions Privacy
                        </p>
                    </div>

                    <div className='w-full sm:w-auto flex items-center justify-center sm:justify-end gap-5'>
                        {/* Facebook */}
                        <a
                            href='https://facebook.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Facebook'
                            className='text-white hover:text-[#40E0D0] transition-colors'
                        >
                            <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                                <path d='M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.593 0 9 1.583 9 4.615V8z' />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href='https://instagram.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Instagram'
                            className='text-white hover:text-[#40E0D0] transition-colors'
                        >
                            <svg className='w-4 h-4 fill-none stroke-current' strokeWidth='2' viewBox='0 0 24 24'>
                                <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                                <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                                <circle cx='17.5' cy='6.5' r='1.5' fill='currentColor' stroke='none' />
                            </svg>
                        </a>

                        {/* X */}
                        <a
                            href='https://x.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='X'
                            className='text-white hover:text-[#40E0D0] transition-colors'
                        >
                            <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                            </svg>
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer

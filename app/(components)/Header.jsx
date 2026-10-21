'use client'

import React, { useState } from 'react'
import Container from './Container'
import Link from 'next/link'
import Image from 'next/image'
import { useShop } from '../context/ShopContext'

const Header = () => {
    const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen } = useShop()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className='w-full bg-[#151E25]/90 backdrop-blur-md sticky top-0 z-40 border-b border-white/[0.06] transition-all'>
            <Container>
                <div className='flex justify-between items-center py-2 sm:py-3'>
                    {/* Brand Logo */}
                    <div>
                        <Link href='/' className='flex items-center gap-1.5 sm:gap-2 group'>
                            <Image
                                src='/images/logo.png'
                                alt='Rêve logo'
                                width={56}
                                height={56}
                                className='w-11 h-11 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105 object-contain'
                            />
                            <span className='font-extralight uppercase text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-[#F5D57A] group-hover:text-[#40E0D0] transition-colors'>
                                Rêve
                            </span>
                        </Link>
                    </div>

                    {/* Right side: Desktop Navigation Links (aligned far right) + Cart/Wishlist Actions */}
                    <div className='flex items-center gap-x-6 lg:gap-x-7'>
                        {/* Desktop Navigation Links */}
                        <nav className='hidden md:flex items-center gap-x-3 text-[#F5D57A] text-sm tracking-wider uppercase font-light'>
                            <Link href='/' className='px-2 py-1 hover:text-[#40E0D0] transition-colors duration-200'>
                                Home
                            </Link>
                            <Link href='/product' className='px-2 py-1 hover:text-[#40E0D0] transition-colors duration-200'>
                                Product
                            </Link>
                            <Link href='/about' className='px-2 py-1 hover:text-[#40E0D0] transition-colors duration-200'>
                                About us
                            </Link>
                            <Link href='/contact' className='px-2 py-1 hover:text-[#40E0D0] transition-colors duration-200'>
                                Contact us
                            </Link>
                        </nav>

                        {/* Actions: Wishlist, Cart & Mobile Menu Toggle */}
                        <div className='flex items-center gap-x-3 sm:gap-x-4 text-[#F5D57A]'>
                        {/* Wishlist Button */}
                        <button
                            type='button'
                            onClick={() => setIsWishlistOpen(true)}
                            className='relative p-2 rounded-full hover:bg-white/[0.05] hover:text-[#40E0D0] transition-all cursor-pointer'
                            aria-label={`View saved items (${wishlistCount})`}
                        >
                            <svg className='w-5 h-5 sm:w-6 sm:h-6 stroke-current' fill='none' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={1.6}
                                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                />
                            </svg>
                            {wishlistCount > 0 && (
                                <span className='absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F5D57A] text-[#151E25] text-[10px] font-bold flex items-center justify-center shadow-sm'>
                                    {wishlistCount}
                                </span>
                            )}
                        </button>

                        {/* Cart Button */}
                        <button
                            type='button'
                            onClick={() => setIsCartOpen(true)}
                            className='relative p-2 rounded-full hover:bg-white/[0.05] hover:text-[#40E0D0] transition-all cursor-pointer'
                            aria-label={`View shopping cart (${cartCount} items)`}
                        >
                            <svg className='w-5 h-5 sm:w-6 sm:h-6 stroke-current' fill='none' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={1.6}
                                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className='absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F5D57A] text-[#151E25] text-[10px] font-bold flex items-center justify-center shadow-sm'>
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Hamburger */}
                        <button
                            type='button'
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className='md:hidden p-2 rounded-lg text-gray-300 hover:text-[#40E0D0] transition-colors'
                            aria-label='Toggle navigation menu'
                        >
                            <svg className='w-6 h-6 stroke-current' fill='none' viewBox='0 0 24 24'>
                                {mobileMenuOpen ? (
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M6 18L18 6M6 6l12 12' />
                                ) : (
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M4 6h16M4 12h16M4 18h16' />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Navigation */}
                {mobileMenuOpen && (
                    <nav className='md:hidden border-t border-white/10 py-4 px-2 space-y-3 bg-[#151E25]'>
                        <Link
                            href='/'
                            onClick={() => setMobileMenuOpen(false)}
                            className='block text-sm uppercase tracking-widest text-[#F5D57A] hover:text-[#40E0D0] transition-colors py-1.5'
                        >
                            Home
                        </Link>
                        <Link
                            href='/product'
                            onClick={() => setMobileMenuOpen(false)}
                            className='block text-sm uppercase tracking-widest text-[#F5D57A] hover:text-[#40E0D0] transition-colors py-1.5'
                        >
                            Product
                        </Link>
                        <Link
                            href='/about'
                            onClick={() => setMobileMenuOpen(false)}
                            className='block text-sm uppercase tracking-widest text-[#F5D57A] hover:text-[#40E0D0] transition-colors py-1.5'
                        >
                            About us
                        </Link>
                        <Link
                            href='/contact'
                            onClick={() => setMobileMenuOpen(false)}
                            className='block text-sm uppercase tracking-widest text-[#F5D57A] hover:text-[#40E0D0] transition-colors py-1.5'
                        >
                            Contact us
                        </Link>
                    </nav>
                )}
            </Container>
        </header>
    )
}

export default Header
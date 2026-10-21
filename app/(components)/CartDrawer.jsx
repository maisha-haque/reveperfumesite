'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Amarante } from 'next/font/google'
import { useShop } from '../context/ShopContext'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],
})

const CartDrawer = () => {
    const {
        cart,
        cartCount,
        cartTotal,
        updateQuantity,
        removeFromCart,
        isCartOpen,
        setIsCartOpen
    } = useShop()

    // Lock body scroll when cart drawer is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isCartOpen])

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsCartOpen(false)
        }
        if (isCartOpen) {
            window.addEventListener('keydown', handleKeyDown)
        }
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isCartOpen, setIsCartOpen])

    if (!isCartOpen) return null

    return (
        <div className='fixed inset-0 z-50 overflow-hidden' role='dialog' aria-modal='true'>
            {/* Backdrop */}
            <div
                className='fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity'
                onClick={() => setIsCartOpen(false)}
            />

            {/* Slide-over panel */}
            <div className='fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10'>
                <div className='w-full sm:w-screen max-w-md bg-[#151E25] border-l border-[#F5D57A]/30 flex flex-col shadow-2xl'>
                    {/* Drawer Header */}
                    <div className='p-4 sm:p-6 border-b border-white/10 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <h2 className={`text-xl sm:text-2xl text-[#FAF9F6] font-bold tracking-wide ${amarante.className}`}>
                                Shopping Bag
                            </h2>
                            <span className='text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#F5D57A]/15 border border-[#F5D57A]/40 text-[#F5D57A] font-medium'>
                                {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                            </span>
                        </div>
                        <button
                            type='button'
                            onClick={() => setIsCartOpen(false)}
                            className='w-8 h-8 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-[#F5D57A] flex items-center justify-center transition-colors'
                            aria-label='Close shopping bag'
                        >
                            ✕
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 divide-y divide-white/10'>
                        {cart.length === 0 ? (
                            <div className='h-full flex flex-col items-center justify-center text-center py-16 space-y-4'>
                                <div className='w-16 h-16 rounded-full border border-[#F5D57A]/40 bg-white/[0.02] flex items-center justify-center text-[#F5D57A]'>
                                    <svg className='w-8 h-8 stroke-current' fill='none' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                    </svg>
                                </div>
                                <h3 className={`text-xl text-[#FAF9F6] ${amarante.className}`}>Your Bag is Empty</h3>
                                <p className='text-sm text-gray-400 max-w-xs leading-relaxed'>
                                    Discover our curated collection of artisanal fragrances and select your signature scent.
                                </p>
                                <Link
                                    href='/product'
                                    onClick={() => setIsCartOpen(false)}
                                    className={`mt-4 py-2.5 px-8 border border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${amarante.className}`}
                                >
                                    Explore Fragrances
                                </Link>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className='pt-5 first:pt-0 flex gap-4 items-center'>
                                    {/* Thumbnail */}
                                    <div className='w-20 h-24 rounded-lg bg-black/20 border border-white/10 flex items-center justify-center p-2 shrink-0'>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={70}
                                            height={90}
                                            style={{ width: 'auto', height: 'auto' }}
                                            className='max-h-full max-w-full object-contain'
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-start justify-between gap-2'>
                                            <div>
                                                <h4 className={`text-base text-[#FAF9F6] font-semibold leading-tight truncate ${amarante.className}`}>
                                                    {item.name}
                                                </h4>
                                                <p className='text-[11px] uppercase tracking-wider text-gray-400 mt-0.5 truncate'>
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                            <button
                                                type='button'
                                                onClick={() => removeFromCart(item.id)}
                                                className='text-gray-500 hover:text-red-400 transition-colors p-1'
                                                aria-label={`Remove ${item.name} from bag`}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className='mt-3 flex items-center justify-between'>
                                            {/* Quantity adjustment */}
                                            <div className='flex items-center border border-white/15 rounded-[4px] bg-white/[0.02]'>
                                                <button
                                                    type='button'
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className='w-7 h-7 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center text-sm transition-colors'
                                                    aria-label='Decrease quantity'
                                                >
                                                    −
                                                </button>
                                                <span className='w-8 text-center text-xs font-medium text-white'>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type='button'
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className='w-7 h-7 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center text-sm transition-colors'
                                                    aria-label='Increase quantity'
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <span className='text-sm font-medium text-[#F5D57A]'>
                                                ${item.priceNum * item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Drawer Footer with Checkout */}
                    {cart.length > 0 && (
                        <div className='p-4 sm:p-6 border-t border-white/10 bg-[#121920] space-y-4'>
                            <div className='space-y-2 text-sm'>
                                <div className='flex justify-between text-gray-400'>
                                    <span>Subtotal</span>
                                    <span className='text-[#FAF9F6] font-medium'>${cartTotal}</span>
                                </div>
                                <div className='flex justify-between text-gray-400'>
                                    <span>Shipping</span>
                                    <span className='text-[#F5D57A] font-light'>Complimentary</span>
                                </div>
                                <div className='pt-2 border-t border-white/10 flex justify-between text-base font-semibold text-[#FAF9F6]'>
                                    <span>Estimated Total</span>
                                    <span className='text-xl text-[#F5D57A]'>${cartTotal}</span>
                                </div>
                            </div>

                            <div className='pt-2 space-y-2.5'>
                                <Link
                                    href='/checkout'
                                    onClick={() => setIsCartOpen(false)}
                                    className={`w-full block text-center py-3.5 px-6 rounded-[5px] bg-[#F5D57A] text-[#151E25] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#40E0D0] hover:text-white transition-all duration-300 shadow-md ${amarante.className}`}
                                >
                                    Proceed to Checkout
                                </Link>

                                <button
                                    type='button'
                                    onClick={() => setIsCartOpen(false)}
                                    className='w-full text-center py-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors'
                                >
                                    Continue Browsing
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartDrawer

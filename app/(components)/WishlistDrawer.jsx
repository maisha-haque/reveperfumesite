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

const WishlistDrawer = () => {
    const {
        wishlist,
        wishlistCount,
        removeFromWishlist,
        addToCart,
        isWishlistOpen,
        setIsWishlistOpen
    } = useShop()

    // Lock body scroll when wishlist drawer is open
    useEffect(() => {
        if (isWishlistOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isWishlistOpen])

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsWishlistOpen(false)
        }
        if (isWishlistOpen) {
            window.addEventListener('keydown', handleKeyDown)
        }
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isWishlistOpen, setIsWishlistOpen])

    if (!isWishlistOpen) return null

    return (
        <div className='fixed inset-0 z-50 overflow-hidden' role='dialog' aria-modal='true'>
            {/* Backdrop */}
            <div
                className='fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity'
                onClick={() => setIsWishlistOpen(false)}
            />

            {/* Slide-over panel */}
            <div className='fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10'>
                <div className='w-full sm:w-screen max-w-md bg-[#151E25] border-l border-[#F5D57A]/30 flex flex-col shadow-2xl'>
                    {/* Drawer Header */}
                    <div className='p-4 sm:p-6 border-b border-white/10 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <h2 className={`text-xl sm:text-2xl text-[#FAF9F6] font-bold tracking-wide ${amarante.className}`}>
                                Saved Fragrances
                            </h2>
                            <span className='text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#F5D57A]/15 border border-[#F5D57A]/40 text-[#F5D57A] font-medium'>
                                {wishlistCount} {wishlistCount === 1 ? 'Item' : 'Items'}
                            </span>
                        </div>
                        <button
                            type='button'
                            onClick={() => setIsWishlistOpen(false)}
                            className='w-8 h-8 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-[#F5D57A] flex items-center justify-center transition-colors'
                            aria-label='Close wishlist'
                        >
                            ✕
                        </button>
                    </div>

                    {/* Wishlist Items List */}
                    <div className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 divide-y divide-white/10'>
                        {wishlist.length === 0 ? (
                            <div className='h-full flex flex-col items-center justify-center text-center py-16 space-y-4'>
                                <div className='w-16 h-16 rounded-full border border-[#F5D57A]/40 bg-white/[0.02] flex items-center justify-center text-[#F5D57A]'>
                                    <svg className='w-8 h-8 stroke-current' fill='none' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                                    </svg>
                                </div>
                                <h3 className={`text-xl text-[#FAF9F6] ${amarante.className}`}>Your Wishlist is Empty</h3>
                                <p className='text-sm text-gray-400 max-w-xs leading-relaxed'>
                                    Save your cherished elixirs here to revisit, explore their olfactory notes, or add to your collection later.
                                </p>
                                <Link
                                    href='/product'
                                    onClick={() => setIsWishlistOpen(false)}
                                    className={`mt-4 py-2.5 px-8 border border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${amarante.className}`}
                                >
                                    Explore Fragrances
                                </Link>
                            </div>
                        ) : (
                            wishlist.map((item) => (
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
                                                <Link
                                                    href={`/product#${item.id}`}
                                                    onClick={() => setIsWishlistOpen(false)}
                                                    className={`text-base text-[#FAF9F6] font-semibold leading-tight hover:text-[#40E0D0] transition-colors truncate block ${amarante.className}`}
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className='text-[11px] uppercase tracking-wider text-gray-400 mt-0.5 truncate'>
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                            <button
                                                type='button'
                                                onClick={() => removeFromWishlist(item.id)}
                                                className='text-gray-500 hover:text-red-400 transition-colors p-1'
                                                aria-label={`Remove ${item.name} from wishlist`}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className='mt-2 text-sm font-medium text-[#F5D57A]'>
                                            {item.price}
                                        </div>

                                        <div className='mt-3 flex items-center gap-2.5'>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    addToCart(item, 1)
                                                    setIsWishlistOpen(false)
                                                }}
                                                className={`flex-1 py-1.5 px-3 rounded-[4px] border border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white text-[11px] uppercase tracking-wider transition-colors ${amarante.className}`}
                                            >
                                                Add to Bag
                                            </button>

                                            <Link
                                                href={`/product#${item.id}`}
                                                onClick={() => setIsWishlistOpen(false)}
                                                className='py-1.5 px-3 rounded-[4px] border border-white/15 text-gray-300 hover:text-white hover:border-white/30 text-[11px] uppercase tracking-wider transition-colors text-center'
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Drawer Footer */}
                    {wishlist.length > 0 && (
                        <div className='p-5 border-t border-white/10 bg-[#121920] text-center'>
                            <Link
                                href='/product'
                                onClick={() => setIsWishlistOpen(false)}
                                className='text-xs uppercase tracking-widest text-gray-400 hover:text-[#F5D57A] transition-colors'
                            >
                                Continue Browsing All Fragrances
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WishlistDrawer

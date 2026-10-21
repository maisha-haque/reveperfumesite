'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Amarante } from 'next/font/google'
import { products } from './productsData'
import { useShop } from '../context/ShopContext'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],
})

const ProductPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const { addToCart, toggleWishlist, isInWishlist } = useShop()

    // Smooth scroll to product if URL has hash (e.g. from wishlist navigation)
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            const id = window.location.hash.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }, 200)
            }
        }
    }, [])

    // Lock body scroll when detailed product modal is open
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedProduct])

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedProduct(null)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <main className='min-h-screen text-white bg-[#151E25]'>
            {/* Full-width Centered Two-Column Perfume Showcase */}
            <div className='w-full'>
                {products.map((product, index) => {
                    const isEven = index % 2 === 1
                    return (
                        <section
                            key={product.id}
                            id={product.id}
                            className='w-full border-b border-white/[0.08] last:border-b-0 py-4 sm:py-6 lg:py-10'
                        >
                            <div className='w-full max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-10'>
                                <div className={`flex ${isEven ? 'flex-row-reverse' : 'flex-row'} items-center justify-between gap-2 sm:gap-6 lg:gap-8`}>
                                    {/* Column: Large Perfume Image (Enlarged, Clean & Minimal) - Side by Side on all screen sizes */}
                                    <div
                                        className={`w-1/2 flex items-center justify-center py-2 sm:py-6 lg:py-8 px-1.5 sm:px-6 lg:px-10 xl:px-14 ${
                                            isEven ? 'border-r border-[#F5D57A]/20' : 'border-l border-[#F5D57A]/20'
                                        }`}
                                    >
                                        <div className='relative w-full max-w-[500px] xl:max-w-[540px] h-[200px] xs:h-[240px] sm:h-[360px] md:h-[480px] lg:h-[580px] xl:h-[640px] flex items-center justify-center'>
                                            <div
                                                onClick={() => setSelectedProduct(product)}
                                                className='relative z-10 cursor-pointer flex justify-center items-center w-full h-full transition-transform duration-700 hover:scale-105'
                                                role='button'
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault()
                                                        setSelectedProduct(product)
                                                    }
                                                }}
                                                aria-label={`View details for ${product.name}`}
                                            >
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={560}
                                                    height={700}
                                                    priority={index === 0}
                                                    style={{ width: 'auto', height: 'auto' }}
                                                    className='max-h-full max-w-full object-contain'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column: Product Details - Side by Side on all screen sizes */}
                                    <div className='w-1/2 flex flex-col justify-center py-2 sm:py-6 lg:py-8 px-1.5 sm:px-6 lg:px-10 xl:px-14'>
                                        <div className={`w-full max-w-[500px] mx-auto ${isEven ? 'lg:ml-auto lg:mr-0' : 'lg:mr-auto lg:ml-0'} flex flex-col text-left`}>
                                            {/* Product Number & Category */}
                                            <div className='flex items-center gap-1.5 sm:gap-3 text-[9px] xs:text-[10px] sm:text-xs lg:text-[13px] tracking-wider sm:tracking-[0.25em] uppercase text-[#F5D57A] font-medium'>
                                                <span>{product.index}</span>
                                                <span className='opacity-60'>/</span>
                                                <span>14</span>
                                                <span className='text-gray-500'>•</span>
                                                <span>{product.family}</span>
                                            </div>

                                            {/* Title */}
                                            <h2 className={`text-sm xs:text-base sm:text-2xl md:text-4xl lg:text-[54px] font-bold text-[#FAF9F6] tracking-wide leading-tight mt-1 sm:mt-2.5 ${amarante.className}`}>
                                                {product.name}
                                            </h2>

                                            {/* Subtitle & Price */}
                                            <div className='mt-1 sm:mt-2 flex flex-wrap items-center gap-1.5 sm:gap-3.5 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-wider sm:tracking-[0.2em] uppercase text-gray-400'>
                                                <span>{product.subtitle}</span>
                                                <span className='text-gray-600'>•</span>
                                                <span className='text-xs xs:text-sm sm:text-xl lg:text-3xl text-[#F5D57A] font-light tracking-wide'>
                                                    {product.price}
                                                </span>
                                            </div>

                                            {/* Short Story */}
                                            <p className='mt-1.5 sm:mt-4 text-gray-300 text-[10px] xs:text-[11px] sm:text-sm lg:text-[16px] leading-relaxed font-light line-clamp-3 sm:line-clamp-none'>
                                                {product.shortDesc}
                                            </p>

                                            {/* Key Accords */}
                                            <div className='mt-2 sm:mt-5'>
                                                <span className='text-[8px] xs:text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-[0.25em] text-gray-400 font-medium block mb-1 sm:mb-2'>
                                                    KEY ACCORDS
                                                </span>
                                                <div className='flex flex-wrap gap-1 sm:gap-2 lg:gap-2.5'>
                                                    {[...product.notes.top, ...product.notes.heart, ...product.notes.base].slice(0, 4).map((note) => (
                                                        <span
                                                            key={note.name}
                                                            onClick={() => setSelectedProduct(product)}
                                                            className='text-[8px] xs:text-[9px] sm:text-xs tracking-wider uppercase text-gray-300 px-1.5 py-0.5 sm:px-3 sm:py-1 lg:px-4 lg:py-1.5 rounded-full border border-white/15 bg-white/[0.04] transition-colors hover:border-[#F5D57A]/50 hover:text-white cursor-pointer truncate max-w-full'
                                                        >
                                                            {note.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Add to Cart & Wishlist Actions */}
                                            <div className='mt-3 sm:mt-6 lg:mt-8 flex items-center gap-1.5 sm:gap-3 w-full max-w-[460px]'>
                                                <button
                                                    type='button'
                                                    onClick={() => addToCart(product, 1)}
                                                    className={`flex-1 text-center py-1.5 px-2 xs:py-2 xs:px-3 sm:py-2.5 sm:px-6 lg:px-8 bg-transparent border border-sm:border-2 border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[4px] sm:rounded-[5px] text-[9px] xs:text-[10px] sm:text-sm sm:text-[15px] tracking-wider sm:tracking-[0.18em] uppercase transition-colors duration-300 cursor-pointer whitespace-nowrap ${amarante.className}`}
                                                >
                                                    ADD TO CART
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={() => toggleWishlist(product)}
                                                    className={`p-1.5 xs:p-2 sm:p-2.5 lg:p-3 rounded-[4px] sm:rounded-[5px] border border-sm:border-2 transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0 ${
                                                        isInWishlist(product.id)
                                                            ? 'border-[#F5D57A] bg-[#F5D57A] text-[#151E25]'
                                                            : 'border-[#F5D57A]/50 text-[#F5D57A] hover:border-[#40E0D0] hover:text-[#40E0D0]'
                                                    }`}
                                                    aria-label={isInWishlist(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                                                    title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                                >
                                                    <svg
                                                        className='w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6'
                                                        fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                                                        stroke='currentColor'
                                                        viewBox='0 0 24 24'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={1.8}
                                                            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>

            {/* Expanded Product Details Modal: Compact Horizontal Layout */}
            {selectedProduct && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-[#151E25]/80 backdrop-blur-md'
                    onClick={() => setSelectedProduct(null)}
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby='modal-product-title'
                >
                    <div
                        className='relative w-full max-w-4xl lg:max-w-[940px] bg-[#151E25] border border-[#C9A84C]/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] max-h-[92vh] overflow-y-auto lg:max-h-none lg:overflow-visible'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Accessible Close Button */}
                        <button
                            type='button'
                            onClick={() => setSelectedProduct(null)}
                            className='absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-[#151E25] border border-white/20 text-gray-300 hover:text-white hover:border-[#F5D57A] flex items-center justify-center text-sm transition-colors z-20'
                            aria-label='Close product details'
                        >
                            ✕
                        </button>

                        {/* Horizontal Expanded Layout */}
                        <div className='flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8'>
                            {/* Left: Perfume Image & Price */}
                            <div className='w-full lg:w-[35%] flex flex-col items-center justify-between p-4 sm:p-5 rounded-xl bg-[#18232c]/40 border border-white/10 shrink-0'>
                                <div className='relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center'>
                                    <Image
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        width={260}
                                        height={340}
                                        style={{ width: 'auto', height: 'auto' }}
                                        className='max-h-full w-auto object-contain'
                                    />
                                </div>
                                <div className='mt-3 text-center'>
                                    <span className='text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium'>
                                        {selectedProduct.subtitle}
                                    </span>
                                    <p className='text-2xl font-light text-[#F5D57A] mt-0.5'>
                                        {selectedProduct.price}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Details & Compact Scent-Note Boxes */}
                            <div className='w-full lg:w-[65%] flex flex-col justify-between'>
                                <div>
                                    <div className='text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#F5D57A]/80 font-medium'>
                                        {selectedProduct.index} / 14 • {selectedProduct.family}
                                    </div>

                                    <h3
                                        id='modal-product-title'
                                        className={`text-2xl sm:text-3xl text-[#FAF9F6] font-bold tracking-wide mt-1 ${amarante.className}`}
                                    >
                                        {selectedProduct.name}
                                    </h3>

                                    <p className='mt-2 text-gray-300 text-xs sm:text-sm leading-relaxed'>
                                        {selectedProduct.longDesc}
                                    </p>
                                </div>

                                {/* Scent Notes Architecture: Fully visible names without truncation */}
                                <div className='mt-4 pt-3 border-t border-white/10'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <h4 className={`text-sm sm:text-base text-[#F5D57A] font-semibold tracking-wide ${amarante.className}`}>
                                            Olfactory Notes
                                        </h4>
                                        <span className='text-[10px] text-gray-400 uppercase tracking-wider'>Three Harmonious Accords</span>
                                    </div>

                                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3'>
                                        {/* Top Notes */}
                                        <div className='flex flex-col bg-[#18232c]/40 p-2.5 rounded-xl border border-white/10'>
                                            <span className='text-[10px] uppercase tracking-wider text-[#F5D57A] font-medium mb-2 text-center block'>
                                                Top Notes
                                            </span>
                                            <div className='grid grid-cols-2 gap-2 items-start'>
                                                {selectedProduct.notes.top.map((note) => (
                                                    <div key={note.name} className='flex flex-col items-center text-center group min-w-0 w-full'>
                                                        <div className='w-11 h-11 sm:w-12 sm:h-12 rounded-lg border border-[#F5D57A]/40 bg-[#151E25] flex items-center justify-center p-1.5 group-hover:border-[#F5D57A] transition-colors shadow-sm shrink-0 overflow-hidden relative'>
                                                            {note.image ? (
                                                                <Image
                                                                    src={note.image}
                                                                    alt={note.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className='w-full h-full object-contain'
                                                                />
                                                            ) : (
                                                                <svg className='w-4 h-4 stroke-current opacity-70 mb-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className='mt-1.5 text-[10px] sm:text-[10.5px] text-gray-200 text-center font-medium leading-[1.25] w-full break-words'>
                                                            {note.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Heart Notes */}
                                        <div className='flex flex-col bg-[#18232c]/40 p-2.5 rounded-xl border border-white/10'>
                                            <span className='text-[10px] uppercase tracking-wider text-[#F5D57A] font-medium mb-2 text-center block'>
                                                Heart Notes
                                            </span>
                                            <div className='grid grid-cols-2 gap-2 items-start'>
                                                {selectedProduct.notes.heart.map((note) => (
                                                    <div key={note.name} className='flex flex-col items-center text-center group min-w-0 w-full'>
                                                        <div className='w-11 h-11 sm:w-12 sm:h-12 rounded-lg border border-[#F5D57A]/40 bg-[#151E25] flex items-center justify-center p-1.5 group-hover:border-[#F5D57A] transition-colors shadow-sm shrink-0 overflow-hidden relative'>
                                                            {note.image ? (
                                                                <Image
                                                                    src={note.image}
                                                                    alt={note.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className='w-full h-full object-contain'
                                                                />
                                                            ) : (
                                                                <svg className='w-4 h-4 stroke-current opacity-70 mb-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className='mt-1.5 text-[10px] sm:text-[10.5px] text-gray-200 text-center font-medium leading-[1.25] w-full break-words'>
                                                            {note.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Base Notes */}
                                        <div className='flex flex-col bg-[#18232c]/40 p-2.5 rounded-xl border border-white/10'>
                                            <span className='text-[10px] uppercase tracking-wider text-[#F5D57A] font-medium mb-2 text-center block'>
                                                Base Notes
                                            </span>
                                            <div className='grid grid-cols-2 gap-2 items-start'>
                                                {selectedProduct.notes.base.map((note) => (
                                                    <div key={note.name} className='flex flex-col items-center text-center group min-w-0 w-full'>
                                                        <div className='w-11 h-11 sm:w-12 sm:h-12 rounded-lg border border-[#F5D57A]/40 bg-[#151E25] flex items-center justify-center p-1.5 group-hover:border-[#F5D57A] transition-colors shadow-sm shrink-0 overflow-hidden relative'>
                                                            {note.image ? (
                                                                <Image
                                                                    src={note.image}
                                                                    alt={note.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className='w-full h-full object-contain'
                                                                />
                                                            ) : (
                                                                <svg className='w-4 h-4 stroke-current opacity-70 mb-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className='mt-1.5 text-[10px] sm:text-[10.5px] text-gray-200 text-center font-medium leading-[1.25] w-full break-words'>
                                                            {note.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Compact Action Buttons */}
                                <div className='mt-4 pt-3 border-t border-white/10 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3'>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            addToCart(selectedProduct, 1)
                                            setSelectedProduct(null)
                                        }}
                                        className={`flex-1 min-w-[200px] py-2 sm:py-2.5 px-4 sm:px-6 bg-transparent border border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[3px] text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 font-medium ${amarante.className}`}
                                    >
                                        Acquire Fragrance • {selectedProduct.price}
                                    </button>
                                    <div className='flex items-center gap-2 shrink-0'>
                                        <button
                                            type='button'
                                            onClick={() => toggleWishlist(selectedProduct)}
                                            className={`p-2 sm:p-2.5 rounded-[3px] border transition-colors flex items-center justify-center ${
                                                isInWishlist(selectedProduct.id)
                                                    ? 'border-[#F5D57A] bg-[#F5D57A] text-[#151E25]'
                                                    : 'border-[#F5D57A]/50 text-[#F5D57A] hover:border-[#40E0D0] hover:text-[#40E0D0]'
                                            }`}
                                            aria-label={isInWishlist(selectedProduct.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                                            title={isInWishlist(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                        >
                                            <svg
                                                className='w-5 h-5'
                                                fill={isInWishlist(selectedProduct.id) ? 'currentColor' : 'none'}
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={1.8}
                                                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => setSelectedProduct(null)}
                                            className='py-2 px-3 sm:px-4 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors'
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default ProductPage
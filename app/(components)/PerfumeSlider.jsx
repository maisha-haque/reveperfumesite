'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Amarante } from 'next/font/google'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],
})

const perfumes = [
    { id: 1, name: 'FLORAL SPICY', price: '$80', image: '/images/perfumeone.png' },
    { id: 2, name: 'FRUITY OCEANIC', price: '$110', image: '/images/perfumetwo.png' },
    { id: 3, name: 'WOODY LAVENDER', price: '$100', image: '/images/perfumethree.png' },
    { id: 4, name: 'CRYSTAL EMERALD', price: '$95', image: '/images/perfumefour.png' },
]

// Duplicate items to form two identical halves for a continuous infinite marquee
const items = [...perfumes, ...perfumes]

const PerfumeSlider = () => {
    const [isPaused, setIsPaused] = useState(false)

    // Ensure animation safely resumes whenever pointer/touch is released anywhere
    useEffect(() => {
        const handleRelease = () => setIsPaused(false)
        window.addEventListener('pointerup', handleRelease)
        window.addEventListener('pointercancel', handleRelease)
        window.addEventListener('touchend', handleRelease)
        window.addEventListener('touchcancel', handleRelease)
        return () => {
            window.removeEventListener('pointerup', handleRelease)
            window.removeEventListener('pointercancel', handleRelease)
            window.removeEventListener('touchend', handleRelease)
            window.removeEventListener('touchcancel', handleRelease)
        }
    }, [])

    const renderCard = (perfume, keyPrefix, index) => (
        <div key={`${keyPrefix}-${perfume.id}-${index}`} className="shrink-0 pr-6 sm:pr-8 md:pr-10">
            <div
                className="perfume-card group flex w-[240px] sm:w-[270px] md:w-[290px] flex-col items-center border border-[#C9A84C]/80 bg-[#151E25] px-5 pt-7 pb-8 md:px-6 md:pt-8 md:pb-9 transition-colors duration-300 hover:border-[#F5D57A] cursor-pointer select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onPointerDown={() => setIsPaused(true)}
                onPointerUp={() => setIsPaused(false)}
            >
                <div className="flex h-40 sm:h-44 md:h-48 w-full items-center justify-center">
                    <Image
                        src={perfume.image}
                        alt={perfume.name}
                        width={240}
                        height={240}
                        draggable={false}
                        style={{ width: 'auto', height: 'auto' }}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <h3 className={`mt-5 text-[17px] sm:text-[18px] md:text-[19px] tracking-wide text-center text-[#FAF9F6] ${amarante.className}`}>
                    {perfume.name}
                </h3>

                <p className="mt-1.5 text-[14px] sm:text-[15px] md:text-[16px] text-gray-300 text-center">
                    {perfume.price}
                </p>

                <Link
                    href="/product"
                    className={`mt-5 text-center inline-block py-1.5 px-8 sm:px-9 bg-transparent border border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[4px] text-[14px] sm:text-[15px] transition-colors duration-300 ${amarante.className}`}
                >
                    Buy Now
                </Link>
            </div>
        </div>
    )

    return (
        <div className="mt-8 md:mt-12 w-full overflow-hidden py-4">
            <style>{`
                @keyframes perfumeContinuousScroll {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-50%, 0, 0);
                    }
                }
                .perfume-continuous-track {
                    display: flex;
                    width: max-content;
                    will-change: transform;
                    animation: perfumeContinuousScroll 32s linear infinite;
                }
                /* Pause immediately on the GPU thread when hovering or holding any card */
                .perfume-continuous-track:has(.perfume-card:hover),
                .perfume-continuous-track:has(.perfume-card:active) {
                    animation-play-state: paused;
                }
                @media (prefers-reduced-motion: reduce) {
                    .perfume-continuous-track {
                        animation-play-state: paused;
                    }
                }
            `}</style>

            <div
                className="perfume-continuous-track"
                style={{
                    animationPlayState: isPaused ? 'paused' : 'running',
                }}
            >
                {/* First half */}
                <div className="flex shrink-0">
                    {items.map((perfume, index) => renderCard(perfume, 'first', index))}
                </div>

                {/* Second half (exact duplicate to guarantee endless seamless loop) */}
                <div className="flex shrink-0" aria-hidden="true">
                    {items.map((perfume, index) => renderCard(perfume, 'second', index))}
                </div>
            </div>
        </div>
    )
}

export default PerfumeSlider

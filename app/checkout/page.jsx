'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Amarante } from 'next/font/google'
import { useShop } from '../context/ShopContext'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],
})

const CheckoutPage = () => {
    const {
        cart,
        cartCount,
        cartTotal,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useShop()

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        phone: '',
        deliveryNotes: '',
        paymentMethod: 'delivery'
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [confirmedOrder, setConfirmedOrder] = useState(null)

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }))
        }
    }

    // Form Validation
    const validate = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Please enter your full name'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Please enter your email address'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Please enter your delivery address'
        } else if (formData.address.trim().length < 8) {
            newErrors.address = 'Please provide a complete delivery address'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Please enter your phone number'
        } else if (!/^[\d\s+\-()]{7,20}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle Confirm Order
    const handleSubmit = (e) => {
        e.preventDefault()

        if (cart.length === 0) {
            return
        }

        if (!validate()) {
            // Scroll to the first error
            window.scrollTo({ top: 120, behavior: 'smooth' })
            return
        }

        setIsSubmitting(true)

        // Simulate secure order dispatch preparation
        setTimeout(() => {
            const randomCode = Math.floor(100000 + Math.random() * 900000)
            const orderPayload = {
                orderId: `RÊVE-${randomCode}`,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                time: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                customer: { ...formData },
                items: [...cart],
                subtotal: cartTotal,
                shipping: 0,
                total: cartTotal
            }

            setConfirmedOrder(orderPayload)
            clearCart()
            setIsSubmitting(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 600)
    }

    // ----------------------------------------------------
    // 1. ORDER CONFIRMED SUCCESS VIEW
    // ----------------------------------------------------
    if (confirmedOrder) {
        return (
            <main className='min-h-screen bg-[#151E25] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-3xl mx-auto'>
                    {/* Confirmation Card */}
                    <div className='bg-[#18232c]/70 border border-[#F5D57A]/40 rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'>
                        {/* Luxury Seal & Checkmark */}
                        <div className='flex flex-col items-center text-center'>
                            <div className='w-20 h-20 rounded-full border-2 border-[#F5D57A] bg-[#151E25] flex items-center justify-center text-[#F5D57A] shadow-[0_0_25px_rgba(245,213,122,0.25)] mb-6'>
                                <svg className='w-10 h-10 stroke-current' fill='none' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M5 13l4 4L19 7'
                                    />
                                </svg>
                            </div>

                            <span className='text-xs uppercase tracking-[0.3em] text-[#F5D57A] font-medium'>
                                Order Confirmed
                            </span>

                            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF9F6] mt-2 ${amarante.className}`}>
                                Merci Pour Votre Commande
                            </h1>

                            <p className='mt-3 text-gray-300 text-sm sm:text-base max-w-lg leading-relaxed'>
                                Thank you, <span className='text-white font-medium'>{confirmedOrder.customer.fullName}</span>.
                                Your bespoke order has been registered and is now being hand-packaged in our atelier.
                            </p>
                        </div>

                        {/* Order ID & Meta Box */}
                        <div className='mt-8 p-4 sm:p-5 rounded-xl bg-[#151E25] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left'>
                            <div>
                                <span className='text-[11px] uppercase tracking-widest text-gray-400 block'>
                                    Order Reference
                                </span>
                                <span className={`text-lg sm:text-xl text-[#F5D57A] font-semibold tracking-wider ${amarante.className}`}>
                                    {confirmedOrder.orderId}
                                </span>
                            </div>
                            <div>
                                <span className='text-[11px] uppercase tracking-widest text-gray-400 block'>
                                    Date & Time
                                </span>
                                <span className='text-xs sm:text-sm text-gray-200'>
                                    {confirmedOrder.date} at {confirmedOrder.time}
                                </span>
                            </div>
                            <div>
                                <span className='text-[11px] uppercase tracking-widest text-gray-400 block'>
                                    Status
                                </span>
                                <span className='inline-flex items-center gap-1.5 text-xs text-[#40E0D0] font-medium'>
                                    <span className='w-2 h-2 rounded-full bg-[#40E0D0] animate-pulse' />
                                    Atelier Preparation
                                </span>
                            </div>
                        </div>

                        {/* Customer & Delivery Summary */}
                        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-sm'>
                            <div className='space-y-1.5'>
                                <h3 className={`text-xs uppercase tracking-[0.2em] text-[#F5D57A] font-medium mb-3 ${amarante.className}`}>
                                    Delivery Details
                                </h3>
                                <p className='text-white font-medium'>{confirmedOrder.customer.fullName}</p>
                                <p className='text-gray-300 whitespace-pre-line leading-relaxed'>{confirmedOrder.customer.address}</p>
                                <p className='text-gray-400 text-xs mt-2'>
                                    Phone: <span className='text-gray-200'>{confirmedOrder.customer.phone}</span>
                                </p>
                                <p className='text-gray-400 text-xs'>
                                    Email: <span className='text-gray-200'>{confirmedOrder.customer.email}</span>
                                </p>
                            </div>

                            <div className='space-y-1.5'>
                                <h3 className={`text-xs uppercase tracking-[0.2em] text-[#F5D57A] font-medium mb-3 ${amarante.className}`}>
                                    White-Glove Fulfillment
                                </h3>
                                <p className='text-gray-200 text-xs leading-relaxed'>
                                    Complimentary Insured Courier Dispatch. Each bottle is secured with an authentic wax seal, signature presentation box, and personalised olfactive monograph.
                                </p>
                                <div className='mt-3 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-gray-300'>
                                    <span className='text-[#F5D57A] font-medium block mb-1'>Estimated Delivery:</span>
                                    2–4 business days with direct signature required.
                                </div>
                            </div>
                        </div>

                        {/* Purchased Fragrances Itemized */}
                        <div className='mt-8 pt-6 border-t border-white/10'>
                            <h3 className={`text-xs uppercase tracking-[0.2em] text-[#F5D57A] font-medium mb-4 ${amarante.className}`}>
                                Fragrance Manifest ({confirmedOrder.items.length})
                            </h3>

                            <div className='space-y-3 divide-y divide-white/10'>
                                {confirmedOrder.items.map((item) => (
                                    <div key={item.id} className='pt-3 first:pt-0 flex items-center justify-between gap-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-14 h-16 rounded-md bg-[#151E25] border border-white/10 flex items-center justify-center p-1.5 shrink-0'>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={45}
                                                    height={60}
                                                    style={{ width: 'auto', height: 'auto' }}
                                                    className='max-h-full max-w-full object-contain'
                                                />
                                            </div>
                                            <div>
                                                <h4 className={`text-sm text-white font-medium ${amarante.className}`}>
                                                    {item.name}
                                                </h4>
                                                <p className='text-[11px] text-gray-400 uppercase tracking-wider'>
                                                    Qty: {item.quantity} • {item.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <span className='text-sm text-[#F5D57A] font-medium'>
                                            ${item.priceNum * item.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total summary */}
                            <div className='mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-sm'>
                                <span className='text-gray-300 uppercase tracking-wider text-xs'>
                                    Total Paid
                                </span>
                                <span className={`text-2xl text-[#F5D57A] font-light ${amarante.className}`}>
                                    ${confirmedOrder.total}
                                </span>
                            </div>
                        </div>

                        {/* Next Steps CTA */}
                        <div className='mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4'>
                            <Link
                                href='/product'
                                className={`w-full sm:w-auto text-center py-3 px-8 bg-transparent border-2 border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${amarante.className}`}
                            >
                                Continue Browsing Collection
                            </Link>

                            <Link
                                href='/'
                                className='w-full sm:w-auto text-center py-3 px-6 text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors'
                            >
                                Return to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    // ----------------------------------------------------
    // 2. EMPTY BAG STATE
    // ----------------------------------------------------
    if (cart.length === 0) {
        return (
            <main className='min-h-screen bg-[#151E25] text-white py-16 sm:py-24 px-4 flex items-center justify-center'>
                <div className='max-w-md w-full text-center space-y-6 bg-[#18232c]/50 border border-white/10 rounded-2xl p-8 sm:p-12 shadow-xl'>
                    <div className='w-20 h-20 mx-auto rounded-full border border-[#F5D57A]/40 bg-white/[0.02] flex items-center justify-center text-[#F5D57A]'>
                        <svg className='w-10 h-10 stroke-current' fill='none' viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                            />
                        </svg>
                    </div>

                    <div>
                        <span className='text-[11px] uppercase tracking-[0.25em] text-[#F5D57A] font-medium'>
                            Acquisition Bag
                        </span>
                        <h1 className={`text-2xl sm:text-3xl font-bold text-[#FAF9F6] mt-2 ${amarante.className}`}>
                            Your Bag is Empty
                        </h1>
                        <p className='mt-3 text-sm text-gray-400 leading-relaxed'>
                            You currently have no fragrances selected for checkout. Explore our 14 mastercrafted perfumes to assemble your personal collection.
                        </p>
                    </div>

                    <div className='pt-2'>
                        <Link
                            href='/product'
                            className={`inline-block w-full py-3 px-8 bg-transparent border-2 border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${amarante.className}`}
                        >
                            Explore Fragrances
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    // ----------------------------------------------------
    // 3. CHECKOUT FORM & ORDER SUMMARY VIEW
    // ----------------------------------------------------
    return (
        <main className='min-h-screen bg-[#151E25] text-white py-8 sm:py-14 lg:py-16 px-3 sm:px-6 lg:px-12'>
            <div className='max-w-6xl mx-auto'>
                {/* Header & Breadcrumb */}
                <div className='mb-6 sm:mb-10 text-center sm:text-left'>
                    <div className='flex items-center justify-center sm:justify-start gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#F5D57A] mb-2'>
                        <Link href='/product' className='hover:text-[#40E0D0] transition-colors'>
                            Collection
                        </Link>
                        <span>/</span>
                        <span className='text-gray-400'>Checkout</span>
                    </div>

                    <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-[#FAF9F6] leading-tight ${amarante.className}`}>
                        Luxury Acquisition
                    </h1>
                    <p className='mt-2 text-xs sm:text-base text-gray-400 font-light max-w-xl'>
                        Complete your recipient details below to dispatch your complimentary white-glove delivery.
                    </p>
                </div>

                {/* Two-Column Grid: Form & Summary */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
                    {/* Left: Customer Information Form (7 cols) */}
                    <div className='lg:col-span-7 bg-[#18232c]/50 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-9 shadow-lg'>
                        <form onSubmit={handleSubmit} noValidate className='space-y-6'>
                            <div>
                                <h2 className={`text-lg sm:text-xl text-[#F5D57A] font-semibold tracking-wide ${amarante.className}`}>
                                    1. Delivery Destination
                                </h2>
                                <p className='text-xs text-gray-400 mt-1'>
                                    Please specify the exact recipient and address for hand-courier dispatch.
                                </p>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor='fullName'
                                    className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                >
                                    Your Full Name <span className='text-[#F5D57A]'>*</span>
                                </label>
                                <input
                                    type='text'
                                    id='fullName'
                                    name='fullName'
                                    autoComplete='name'
                                    placeholder='Enter your full name'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-[#151E25] border ${
                                        errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-[#F5D57A]'
                                    } rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors`}
                                />
                                {errors.fullName && (
                                    <p className='mt-1.5 text-xs text-red-400'>{errors.fullName}</p>
                                )}
                            </div>

                            {/* Email Address */}
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                >
                                    Your Email Address <span className='text-[#F5D57A]'>*</span>
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    autoComplete='email'
                                    placeholder='Enter your email address'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-[#151E25] border ${
                                        errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-[#F5D57A]'
                                    } rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors`}
                                />
                                {errors.email && (
                                    <p className='mt-1.5 text-xs text-red-400'>{errors.email}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label
                                    htmlFor='phone'
                                    className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                >
                                    Phone Number <span className='text-[#F5D57A]'>*</span>
                                </label>
                                <input
                                    type='tel'
                                    id='phone'
                                    name='phone'
                                    autoComplete='tel'
                                    placeholder='Enter your phone number'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-[#151E25] border ${
                                        errors.phone ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-[#F5D57A]'
                                    } rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors`}
                                />
                                {errors.phone && (
                                    <p className='mt-1.5 text-xs text-red-400'>{errors.phone}</p>
                                )}
                            </div>

                            {/* Delivery Address */}
                            <div>
                                <label
                                    htmlFor='address'
                                    className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                >
                                    Your Delivery Address <span className='text-[#F5D57A]'>*</span>
                                </label>
                                <textarea
                                    id='address'
                                    name='address'
                                    rows={3}
                                    autoComplete='street-address'
                                    placeholder='Enter your delivery address'
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-[#151E25] border ${
                                        errors.address ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-[#F5D57A]'
                                    } rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none`}
                                />
                                {errors.address && (
                                    <p className='mt-1.5 text-xs text-red-400'>{errors.address}</p>
                                )}
                            </div>

                            {/* Delivery Notes (Optional) */}
                            <div>
                                <label
                                    htmlFor='deliveryNotes'
                                    className='block text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-2'
                                >
                                    Delivery Instructions <span className='text-gray-500 lowercase font-normal'>(optional)</span>
                                </label>
                                <input
                                    type='text'
                                    id='deliveryNotes'
                                    name='deliveryNotes'
                                    placeholder='Enter special delivery instructions (optional)'
                                    value={formData.deliveryNotes}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 bg-[#151E25] border border-white/15 focus:border-[#F5D57A] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors'
                                />
                            </div>

                            {/* Payment Preference */}
                            <div className='pt-4 border-t border-white/10'>
                                <h2 className={`text-lg sm:text-xl text-[#F5D57A] font-semibold tracking-wide ${amarante.className}`}>
                                    2. Concierge Payment Arrangement
                                </h2>
                                <p className='text-xs text-gray-400 mt-1 mb-4'>
                                    Select your preferred settlement method upon order dispatch.
                                </p>

                                <div className='space-y-3'>
                                    <label className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-colors ${
                                        formData.paymentMethod === 'delivery'
                                            ? 'bg-white/[0.05] border-[#F5D57A]'
                                            : 'bg-[#151E25] border-white/10 hover:border-white/20'
                                    }`}>
                                        <div className='flex items-center gap-3'>
                                            <input
                                                type='radio'
                                                name='paymentMethod'
                                                value='delivery'
                                                checked={formData.paymentMethod === 'delivery'}
                                                onChange={handleChange}
                                                className='accent-[#F5D57A] w-4 h-4'
                                            />
                                            <div>
                                                <span className='text-sm text-white font-medium block'>
                                                    Settlement Upon White-Glove Delivery
                                                </span>
                                                <span className='text-xs text-gray-400'>
                                                    Card or cash accepted upon personal courier handover
                                                </span>
                                            </div>
                                        </div>
                                        <span className='text-xs text-[#F5D57A] font-light hidden sm:inline-block'>
                                            Recommended
                                        </span>
                                    </label>

                                    <label className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-colors ${
                                        formData.paymentMethod === 'concierge'
                                            ? 'bg-white/[0.05] border-[#F5D57A]'
                                            : 'bg-[#151E25] border-white/10 hover:border-white/20'
                                    }`}>
                                        <div className='flex items-center gap-3'>
                                            <input
                                                type='radio'
                                                name='paymentMethod'
                                                value='concierge'
                                                checked={formData.paymentMethod === 'concierge'}
                                                onChange={handleChange}
                                                className='accent-[#F5D57A] w-4 h-4'
                                            />
                                            <div>
                                                <span className='text-sm text-white font-medium block'>
                                                    Private Concierge Bank Transfer
                                                </span>
                                                <span className='text-xs text-gray-400'>
                                                    Invoice and atelier IBAN details dispatched immediately
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Confirm Order Button */}
                            <div className='pt-6 border-t border-white/10'>
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className={`w-full py-4 px-8 bg-transparent border-2 border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-sm sm:text-base tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-md disabled:opacity-50 cursor-pointer ${amarante.className}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                                            <span>Recording Acquisition...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Confirm Order</span>
                                            <span className='opacity-60'>•</span>
                                            <span>${cartTotal}</span>
                                        </>
                                    )}
                                </button>

                                <div className='mt-4 flex items-center justify-center gap-2 text-xs text-gray-400'>
                                    <svg className='w-4 h-4 text-[#F5D57A]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                    </svg>
                                    <span>256-Bit SSL Encrypted & Certified Authentic Formulation</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right: Order Summary Card (5 cols) */}
                    <div className='lg:col-span-5 bg-[#18232c]/60 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-lg sticky top-24'>
                        <div className='flex items-center justify-between pb-4 border-b border-white/10'>
                            <h2 className={`text-lg text-[#FAF9F6] font-semibold tracking-wide ${amarante.className}`}>
                                Order Summary
                            </h2>
                            <span className='text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#F5D57A]/15 border border-[#F5D57A]/30 text-[#F5D57A]'>
                                {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                            </span>
                        </div>

                        {/* Cart Items list in summary */}
                        <div className='py-4 max-h-[340px] overflow-y-auto space-y-4 divide-y divide-white/10 pr-1'>
                            {cart.map((item) => (
                                <div key={item.id} className='pt-4 first:pt-0 flex gap-3.5 items-center'>
                                    <div className='w-16 h-20 rounded-lg bg-[#151E25] border border-white/10 flex items-center justify-center p-2 shrink-0'>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={60}
                                            height={80}
                                            style={{ width: 'auto', height: 'auto' }}
                                            className='max-h-full max-w-full object-contain'
                                        />
                                    </div>

                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-start justify-between gap-1'>
                                            <h3 className={`text-sm text-white font-medium truncate ${amarante.className}`}>
                                                {item.name}
                                            </h3>
                                            <button
                                                type='button'
                                                onClick={() => removeFromCart(item.id)}
                                                className='text-gray-500 hover:text-red-400 transition-colors p-0.5 text-xs'
                                                title='Remove item'
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <p className='text-[10px] uppercase tracking-wider text-gray-400 mt-0.5 truncate'>
                                            {item.subtitle}
                                        </p>

                                        <div className='mt-2 flex items-center justify-between'>
                                            {/* Quantity adjustment buttons */}
                                            <div className='flex items-center border border-white/15 rounded bg-white/[0.02]'>
                                                <button
                                                    type='button'
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className='w-6 h-6 text-gray-400 hover:text-white flex items-center justify-center text-xs'
                                                >
                                                    −
                                                </button>
                                                <span className='w-6 text-center text-xs text-white'>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type='button'
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className='w-6 h-6 text-gray-400 hover:text-white flex items-center justify-center text-xs'
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className='text-sm text-[#F5D57A] font-medium'>
                                                ${item.priceNum * item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cost Breakdown */}
                        <div className='pt-4 border-t border-white/10 space-y-2.5 text-xs sm:text-sm'>
                            <div className='flex justify-between text-gray-400'>
                                <span>Subtotal</span>
                                <span className='text-white font-medium'>${cartTotal}</span>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <span>White-Glove Shipping</span>
                                <span className='text-[#F5D57A] font-light'>Complimentary</span>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <span>Atelier Presentation Case</span>
                                <span className='text-[#F5D57A] font-light'>Included</span>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <span>Estimated Taxes</span>
                                <span className='text-white font-medium'>Included</span>
                            </div>

                            <div className='pt-3 border-t border-white/10 flex justify-between items-center text-base font-semibold'>
                                <span className='text-white'>Total Amount</span>
                                <span className={`text-2xl text-[#F5D57A] font-light ${amarante.className}`}>
                                    ${cartTotal}
                                </span>
                            </div>
                        </div>

                        {/* Luxury Guarantees */}
                        <div className='mt-6 pt-5 border-t border-white/10 space-y-2.5 text-[11px] text-gray-400'>
                            <div className='flex items-center gap-2'>
                                <span className='text-[#F5D57A]'>✦</span>
                                <span>Artisanal distillation formulated in Grasse & Paris</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-[#F5D57A]'>✦</span>
                                <span>Signature tamper-evident wax seal</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-[#F5D57A]'>✦</span>
                                <span>30-day complimentary bespoke exchange privilege</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CheckoutPage

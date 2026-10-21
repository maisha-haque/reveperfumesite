'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Amarante } from 'next/font/google'

const amarante = Amarante({
    weight: ['400'],
    subsets: ['latin'],
})

const ContactPage = () => {
    // Form fields state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submittedData, setSubmittedData] = useState(null)

    // Handle field input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }))
        }
    }

    // Comprehensive client-side validation
    const validate = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Please enter your full name'
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Please enter your email address'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Please enter a subject for your inquiry'
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Please enter your message'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validate()) {
            return
        }

        setIsSubmitting(true)

        // Simulate local concierge processing with clear feedback
        setTimeout(() => {
            const referenceId = `RÊVE-INQ-${Math.floor(10000 + Math.random() * 90000)}`
            const record = {
                id: referenceId,
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
                timestamp: new Date().toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                })
            }

            // Persist locally for session continuity
            try {
                const existing = JSON.parse(localStorage.getItem('reve_inquiries') || '[]')
                localStorage.setItem('reve_inquiries', JSON.stringify([record, ...existing]))
            } catch (err) {
                console.error('Failed to store inquiry locally:', err)
            }

            setSubmittedData(record)
            setIsSubmitting(false)
            setFormData({ fullName: '', email: '', subject: '', message: '' })
        }, 500)
    }

    const handleReset = () => {
        setSubmittedData(null)
        setErrors({})
    }

    return (
        <main className='min-h-screen bg-[#151E25] text-white py-8 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-12'>
            <div className='max-w-6xl mx-auto'>
                {/* Header Section */}
                <div className='text-center max-w-2xl mx-auto mb-8 sm:mb-16'>
                    <span className='text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#F5D57A] font-medium'>
                        Atelier Concierge
                    </span>
                    <h1 className={`text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#FAF9F6] mt-2 sm:mt-3 leading-tight ${amarante.className}`}>
                        Connect With Rêve
                    </h1>
                    <p className='mt-3 sm:mt-4 text-xs sm:text-base text-gray-300 leading-relaxed font-light'>
                        Whether you seek an intimate olfactory consultation, bespoke bottle engraving, or private salon appointments, our Parisian concierge is devoted to your service.
                    </p>
                </div>

                {/* Two-Column Grid: Form & Atelier Details */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start'>
                    {/* Left: Contact Form or Success Feedback (7 cols) */}
                    <div className='lg:col-span-7 bg-[#18232c]/50 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-9 shadow-xl'>
                        {submittedData ? (
                            /* Transparent Success Feedback */
                            <div className='space-y-6'>
                                <div className='flex items-center gap-3.5 pb-4 border-b border-white/10'>
                                    <div className='w-12 h-12 rounded-full border border-[#F5D57A] bg-[#151E25] flex items-center justify-center text-[#F5D57A] shrink-0'>
                                        <svg className='w-6 h-6 stroke-current' fill='none' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className={`text-xl sm:text-2xl text-[#FAF9F6] font-semibold ${amarante.className}`}>
                                            Inquiry Validated & Recorded
                                        </h2>
                                        <span className='text-xs text-[#F5D57A] tracking-wider uppercase'>
                                            Reference #{submittedData.id}
                                        </span>
                                    </div>
                                </div>

                                {/* Transparent status notice */}
                                <div className='p-4 rounded-xl bg-white/[0.03] border border-[#F5D57A]/30 text-xs sm:text-sm text-gray-300 leading-relaxed'>
                                    <p>
                                        <strong className='text-[#F5D57A] font-medium'>Concierge Notice:</strong> Thank you, <span className='text-white font-medium'>{submittedData.fullName}</span>. Your message has passed frontend validation and has been recorded in your local browser session.
                                    </p>
                                    <p className='mt-2 text-xs text-gray-400'>
                                        Please note: An external SMTP email dispatch service is not currently configured for this demo environment, so no outbound email was transmitted. For immediate assistance, please use our concierge telephone or direct email below.
                                    </p>
                                </div>

                                {/* Submitted Details Card */}
                                <div className='p-4 sm:p-5 rounded-xl bg-[#151E25] border border-white/10 space-y-3 text-xs sm:text-sm'>
                                    <div className='flex justify-between border-b border-white/10 pb-2'>
                                        <span className='text-gray-400 uppercase tracking-wider text-[11px]'>Recipient</span>
                                        <span className='text-white font-medium'>{submittedData.fullName}</span>
                                    </div>
                                    <div className='flex justify-between border-b border-white/10 pb-2'>
                                        <span className='text-gray-400 uppercase tracking-wider text-[11px]'>Email</span>
                                        <span className='text-white'>{submittedData.email}</span>
                                    </div>
                                    <div className='flex justify-between border-b border-white/10 pb-2'>
                                        <span className='text-gray-400 uppercase tracking-wider text-[11px]'>Subject</span>
                                        <span className='text-[#F5D57A] font-medium'>{submittedData.subject}</span>
                                    </div>
                                    <div className='flex justify-between border-b border-white/10 pb-2'>
                                        <span className='text-gray-400 uppercase tracking-wider text-[11px]'>Timestamp</span>
                                        <span className='text-gray-300'>{submittedData.timestamp}</span>
                                    </div>
                                    <div>
                                        <span className='text-gray-400 uppercase tracking-wider text-[11px] block mb-1'>Message Content</span>
                                        <p className='text-gray-300 bg-white/[0.02] p-3 rounded border border-white/10 whitespace-pre-line leading-relaxed'>
                                            {submittedData.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='pt-2 flex flex-col sm:flex-row gap-3'>
                                    <button
                                        type='button'
                                        onClick={handleReset}
                                        className={`flex-1 py-3 px-6 bg-transparent border-2 border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${amarante.className}`}
                                    >
                                        Send Another Inquiry
                                    </button>

                                    <Link
                                        href='/product'
                                        className='py-3 px-6 text-center text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors'
                                    >
                                        Explore Collection
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            /* Interactive Contact Form */
                            <form onSubmit={handleSubmit} noValidate className='space-y-6'>
                                <div className='border-b border-white/10 pb-4'>
                                    <h2 className={`text-xl sm:text-2xl text-[#FAF9F6] font-semibold tracking-wide ${amarante.className}`}>
                                        Private Inquiry Form
                                    </h2>
                                    <p className='text-xs text-gray-400 mt-1'>
                                        All correspondence is treated with strictest confidentiality.
                                    </p>
                                </div>

                                {/* Full Name Field */}
                                <div>
                                    <label
                                        htmlFor='fullName'
                                        className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                    >
                                        Full Name <span className='text-[#F5D57A]'>*</span>
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

                                {/* Email Address Field */}
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                    >
                                        Email Address <span className='text-[#F5D57A]'>*</span>
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

                                {/* Subject Field */}
                                <div>
                                    <label
                                        htmlFor='subject'
                                        className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                    >
                                        Subject <span className='text-[#F5D57A]'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        id='subject'
                                        name='subject'
                                        placeholder='Enter inquiry subject'
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-[#151E25] border ${
                                            errors.subject ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-[#F5D57A]'
                                        } rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors`}
                                    />
                                    {errors.subject && (
                                        <p className='mt-1.5 text-xs text-red-400'>{errors.subject}</p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label
                                        htmlFor='message'
                                        className='block text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mb-2'
                                    >
                                        Message <span className='text-[#F5D57A]'>*</span>
                                    </label>
                                    <textarea
                                        id='message'
                                        name='message'
                                        rows={5}
                                        placeholder='Enter your message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-[#151E25] border ${
                                            errors.message ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-[#F5D57A]'
                                        } rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none`}
                                    />
                                    {errors.message && (
                                        <p className='mt-1.5 text-xs text-red-400'>{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className='pt-2'>
                                    <button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className={`w-full py-3.5 px-8 bg-transparent border-2 border-[#F5D57A] text-[#F5D57A] hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white rounded-[5px] text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 ${amarante.className}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                                                <span>Transmitting to Concierge...</span>
                                            </>
                                        ) : (
                                            <span>Send Inquiry</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right: Atelier & Salon Directory (5 cols) */}
                    <div className='lg:col-span-5 space-y-6'>
                        {/* Paris Flagship Card */}
                        <div className='bg-[#18232c]/50 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-lg space-y-4'>
                            <div className='flex items-center gap-2.5 text-[#F5D57A] text-xs uppercase tracking-widest font-medium'>
                                <span>✦</span>
                                <span>Paris Flagship Atelier</span>
                            </div>

                            <h3 className={`text-xl sm:text-2xl text-[#FAF9F6] font-semibold ${amarante.className}`}>
                                Maison de Rêve
                            </h3>

                            <p className='text-xs sm:text-sm text-gray-300 leading-relaxed font-light'>
                                14 Place Vendôme<br />
                                75001 Paris, France
                            </p>

                            <div className='pt-3 border-t border-white/10 space-y-2 text-xs sm:text-sm'>
                                <div className='flex flex-wrap items-center justify-between gap-1 text-gray-400'>
                                    <span>Concierge Line:</span>
                                    <a href='tel:+33142685500' className='text-white hover:text-[#40E0D0] transition-colors'>
                                        +33 (0)1 42 68 55 00
                                    </a>
                                </div>
                                <div className='flex flex-wrap items-center justify-between gap-1 text-gray-400'>
                                    <span>Direct Email:</span>
                                    <a href='mailto:concierge@reveparfums.com' className='text-[#F5D57A] hover:text-[#40E0D0] transition-colors break-all'>
                                        concierge@reveparfums.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Salon Hours & Bespoke Consultations */}
                        <div className='bg-[#18232c]/50 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-lg space-y-4'>
                            <h4 className={`text-lg text-[#FAF9F6] font-semibold ${amarante.className}`}>
                                Atelier Hours
                            </h4>

                            <div className='space-y-2 text-xs sm:text-sm text-gray-300'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-400'>Monday – Friday:</span>
                                    <span>10:00 – 19:30 CET</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-400'>Saturday:</span>
                                    <span>11:00 – 19:00 CET</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-400'>Sunday:</span>
                                    <span className='text-[#F5D57A]'>Private Appointment Only</span>
                                </div>
                            </div>

                            <div className='pt-3 border-t border-white/10 space-y-2 text-xs text-gray-400'>
                                <p className='flex items-center gap-2'>
                                    <span className='text-[#F5D57A]'>✦</span>
                                    <span>Personalized flacon monogramming available on-site</span>
                                </p>
                                <p className='flex items-center gap-2'>
                                    <span className='text-[#F5D57A]'>✦</span>
                                    <span>Complimentary sample discovery set with every salon visit</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ContactPage
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const ShopContext = createContext(null)

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    // Load from localStorage on client mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('reve_cart')
            if (savedCart) {
                setCart(JSON.parse(savedCart))
            }
            const savedWishlist = localStorage.getItem('reve_wishlist')
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist))
            }
        } catch (e) {
            console.error('Failed to load shop state from localStorage:', e)
        }
        setIsInitialized(true)
    }, [])

    // Save cart to localStorage
    useEffect(() => {
        if (!isInitialized) return
        try {
            localStorage.setItem('reve_cart', JSON.stringify(cart))
        } catch (e) {
            console.error('Failed to save cart to localStorage:', e)
        }
    }, [cart, isInitialized])

    // Save wishlist to localStorage
    useEffect(() => {
        if (!isInitialized) return
        try {
            localStorage.setItem('reve_wishlist', JSON.stringify(wishlist))
        } catch (e) {
            console.error('Failed to save wishlist to localStorage:', e)
        }
    }, [wishlist, isInitialized])

    // Add product to cart
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                const updated = [...prevCart]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity
                }
                return updated
            } else {
                return [
                    ...prevCart,
                    {
                        id: product.id,
                        name: product.name,
                        subtitle: product.subtitle,
                        price: product.price,
                        priceNum: product.priceNum || parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 0,
                        image: product.image,
                        family: product.family,
                        quantity
                    }
                ]
            }
        })
        setIsCartOpen(true)
    }

    // Update quantity
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    // Remove from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    // Clear cart
    const clearCart = () => {
        setCart([])
        try {
            localStorage.removeItem('reve_cart')
        } catch (e) {
            console.error('Failed to clear cart in localStorage:', e)
        }
    }

    // Wishlist toggle
    const toggleWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.some((item) => item.id === product.id)
            if (exists) {
                return prevWishlist.filter((item) => item.id !== product.id)
            } else {
                return [
                    ...prevWishlist,
                    {
                        id: product.id,
                        name: product.name,
                        subtitle: product.subtitle,
                        price: product.price,
                        priceNum: product.priceNum || parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 0,
                        image: product.image,
                        family: product.family,
                        shortDesc: product.shortDesc
                    }
                ]
            }
        })
    }

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId)
    }

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId))
    }

    // Totals
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
    const cartTotal = cart.reduce((total, item) => total + item.priceNum * item.quantity, 0)
    const wishlistCount = wishlist.length

    return (
        <ShopContext.Provider
            value={{
                cart,
                cartCount,
                cartTotal,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                isCartOpen,
                setIsCartOpen,

                wishlist,
                wishlistCount,
                toggleWishlist,
                isInWishlist,
                removeFromWishlist,
                isWishlistOpen,
                setIsWishlistOpen
            }}
        >
            {children}
        </ShopContext.Provider>
    )
}

export const useShop = () => {
    const context = useContext(ShopContext)
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider')
    }
    return context
}

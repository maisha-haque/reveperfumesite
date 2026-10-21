import React from 'react'

export const metadata = {
    title: 'Checkout | Rêve Haute Parfumerie',
    description: 'Complete your luxury fragrance acquisition with complimentary white-glove delivery.',
}

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

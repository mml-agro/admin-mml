export interface Product {
    id: string
    name: string
    slug: string
    brand: string
    category: 'SUNFLOWER_OIL' | 'SPECIALTY_OIL' | 'TRADITIONAL_OIL'
    description: string
    shortDesc: string
    features: string[]
    imageUrls: string[]
    emoji: string
    isActive: boolean
    isFeatured: boolean
    badge?: string
    avgRating: number
    reviewCount: number
    totalSold: number
    variants: Variant[]
    createdAt: string
}

export interface Variant {
    id: string
    size: 'SIZE_1L' | 'SIZE_5L' | 'SIZE_15L'
    price: number
    mrp: number
    stockQuantity: number
    stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK'
    sku: string
    isActive: boolean
}
export interface CartItem { product: Product; size: '1L' | '5L' | '15L'; quantity: number, price: number; }
export interface User { name: string; email: string; phone: string; role: string; avatar?: string }
export interface Order { id: string; date: string; status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled'; items: string[]; total: number }
export interface Blog { id: number; title: string; excerpt: string; date: string; readTime: string; emoji: string; category: string }
export interface Testimonial { id: number; name: string; city: string; text: string; rating: number; product: string }
export interface TeamMember { name: string; role: string; emoji: string }

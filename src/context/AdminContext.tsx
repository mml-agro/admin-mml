// import React, { createContext, useContext, useState } from 'react'
// import { orders as initialOrders, products as initialProducts, customers as initialCustomers, reviews as initialReviews, coupons as initialCoupons, notifications as initialNotifications } from '../data'
// import type { Order, Product, Customer, Review, Coupon, Notification } from '../data'

// interface AdminCtx {
//   orders: Order[]; setOrders: React.Dispatch<React.SetStateAction<Order[]>>
//   products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>
//   customers: Customer[]; setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
//   reviews: Review[]; setReviews: React.Dispatch<React.SetStateAction<Review[]>>
//   coupons: Coupon[]; setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>
//   notifications: Notification[]; setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
//   sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void
//   unreadCount: number
//   markAllRead: () => void
// }
// const Ctx = createContext<AdminCtx | null>(null)

// export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [orders, setOrders] = useState<Order[]>(initialOrders)
//   const [products, setProducts] = useState<Product[]>(initialProducts)
//   const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
//   const [reviews, setReviews] = useState<Review[]>(initialReviews)
//   const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
//   const [sidebarOpen, setSidebarOpen] = useState(true)

//   const unreadCount = notifications.filter(n => !n.read).length
//   const markAllRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })))

//   return (
//     <Ctx.Provider value={{ orders, setOrders, products, setProducts, customers, setCustomers, reviews, setReviews, coupons, setCoupons, notifications, setNotifications, sidebarOpen, setSidebarOpen, unreadCount, markAllRead }}>
//       {children}
//     </Ctx.Provider>
//   )
// }
// export const useAdmin = () => { const c = useContext(Ctx); if (!c) throw new Error('no admin'); return c }








import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
    getOrdersAPI,
    getProductsAPI,
    getUsersAPI,
    getCouponsAPI,
    getReviewsAPI,
} from '../service'

// ─────────────────────────────────────────────────────────────────────────────
// Domain types
// ─────────────────────────────────────────────────────────────────────────────

export interface OrderItem {
    id: string
    productId: string
    productName: string
    productEmoji: string
    size: string
    quantity: number
    unitPrice: number
    totalPrice: number
}

export interface DeliveryAddress {
    name: string
    line1: string
    line2: string
    city: string
    state: string
    country: string
    pincode: string
    phone: string
}

export interface Order {
    id: string
    orderNumber: string
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED'
    paymentMethod: string
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
    paymentReference: string | null
    subtotal: number
    deliveryCharge: number
    discountAmount: number
    gstAmount: number
    totalAmount: number
    couponCode: string | null
    deliveryAddress: DeliveryAddress
    trackingNumber: string | null
    courierPartner: string | null
    notes: string
    createdAt: string
    shippedAt: string | null
    deliveredAt: string | null
    items: OrderItem[]
}

export interface ProductVariant {
    id: string
    size: string
    price: number
    mrp: number
    stockQuantity: number
    stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
    sku: string
    isActive: boolean
}

export interface Product {
    id: string
    name: string
    slug: string
    brand: string
    category: string
    description: string
    shortDesc: string
    features: string[]
    imageUrls: string[]
    emoji: string
    isActive: boolean
    isFeatured: boolean
    badge: string | null
    avgRating: number
    reviewCount: number
    totalSold: number
    variants: ProductVariant[]
    createdAt: string
}

export interface Customer {
    id: string
    name: string
    email: string
    phone: string
    role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN' | 'DISTRIBUTOR'
    status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
    emailVerified: boolean
    phoneVerified: boolean
    createdAt?: string
}

export interface Coupon {
    id: number
    code: string
    description: string
    type: 'PERCENTAGE' | 'FLAT'
    value: number
    minOrderValue: number
    maxDiscount: number | null
    maxUses: number
    usedCount: number
    perUserLimit: number
    status: 'ACTIVE' | 'EXPIRED' | 'DISABLED'
    startsAt: string
    expiresAt: string
}

export interface Review {
    id: string
    customerName: string
    productName: string
    rating: number
    title: string
    comment: string
    isVerified: boolean
    status: 'PUBLISHED' | 'PENDING' | 'REJECTED'
    adminReply: string | null
    createdAt: string
}

export interface Notification {
    id: number
    title: string
    message: string
    read: boolean
    createdAt: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────

interface PagedResponse<T> {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}

interface AsyncSlice<T> {
    data: T[]
    loading: boolean
    error: string | null
    totalElements: number
    totalPages: number
    page: number
}

function initialSlice<T>(): AsyncSlice<T> {
    return {
        data: [],
        loading: true,
        error: null,
        totalElements: 0,
        totalPages: 1,
        page: 0,
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Context interface
// ─────────────────────────────────────────────────────────────────────────────

interface AdminCtx {
    orders: Order[]
    ordersLoading: boolean
    ordersError: string | null
    ordersMeta: { totalElements: number; totalPages: number; page: number }
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
    refetchOrders: (page?: number, status?: string) => Promise<void>

    products: Product[]
    productsLoading: boolean
    productsError: string | null
    productsMeta: { totalElements: number; totalPages: number; page: number }
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
    refetchProducts: (page?: number) => Promise<void>

    customers: Customer[]
    customersLoading: boolean
    customersError: string | null
    customersMeta: { totalElements: number; totalPages: number; page: number }
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
    refetchCustomers: (page?: number) => Promise<void>

    coupons: Coupon[]
    couponsLoading: boolean
    couponsError: string | null
    setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>
    refetchCoupons: () => Promise<void>

    reviews: Review[]
    reviewsLoading: boolean
    reviewsError: string | null
    reviewsMeta: { totalElements: number; totalPages: number; page: number }
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>
    refetchReviews: (page?: number) => Promise<void>

    notifications: Notification[]
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
    unreadCount: number
    markAllRead: () => void

    sidebarOpen: boolean
    setSidebarOpen: (v: boolean) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

const Ctx = createContext<AdminCtx | null>(null)

const PAGE_SIZE = 20

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // orders
    const [ordersSlice, setOrdersSlice] = useState<AsyncSlice<Order>>(initialSlice<Order>())
    const fetchOrders = useCallback(async (page = 0, status?: string) => {
        setOrdersSlice(p => ({ ...p, loading: true, error: null }))
        try {
            const res = await getOrdersAPI(page, PAGE_SIZE, status)
            const d: PagedResponse<Order> = res.data
            setOrdersSlice({ data: d.content, loading: false, error: null, totalElements: d.totalElements, totalPages: d.totalPages, page: d.page })
        } catch (e: any) {
            setOrdersSlice(p => ({ ...p, loading: false, error: e?.message ?? 'Failed to load orders' }))
        }
    }, [])

    // products
    const [productsSlice, setProductsSlice] = useState<AsyncSlice<Product>>(initialSlice<Product>())
    const fetchProducts = useCallback(async (page = 0) => {
        setProductsSlice(p => ({ ...p, loading: true, error: null }))
        try {
            const res = await getProductsAPI(page, PAGE_SIZE)
            const d: PagedResponse<Product> = res.data
            setProductsSlice({ data: d.content, loading: false, error: null, totalElements: d.totalElements, totalPages: d.totalPages, page: d.page })
        } catch (e: any) {
            setProductsSlice(p => ({ ...p, loading: false, error: e?.message ?? 'Failed to load products' }))
        }
    }, [])

    // customers
    const [customersSlice, setCustomersSlice] = useState<AsyncSlice<Customer>>(initialSlice<Customer>())
    const fetchCustomers = useCallback(async (page = 0) => {
        setCustomersSlice(p => ({ ...p, loading: true, error: null }))
        try {
            const res = await getUsersAPI(page, PAGE_SIZE)
            const d: PagedResponse<Customer> = res.data
            setCustomersSlice({ data: d.content, loading: false, error: null, totalElements: d.totalElements, totalPages: d.totalPages, page: d.page })
        } catch (e: any) {
            setCustomersSlice(p => ({ ...p, loading: false, error: e?.message ?? 'Failed to load customers' }))
        }
    }, [])

    // coupons
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [couponsLoading, setCouponsLoading] = useState<boolean>(true)
    const [couponsError, setCouponsError] = useState<string | null>(null)
    const fetchCoupons = useCallback(async () => {
        setCouponsLoading(true)
        setCouponsError(null)
        try {
            const res = await getCouponsAPI()
            setCoupons(res.data ?? [])
        } catch (e: any) {
            setCouponsError(e?.message ?? 'Failed to load coupons')
        } finally {
            setCouponsLoading(false)
        }
    }, [])

    // reviews
    const [reviewsSlice, setReviewsSlice] = useState<AsyncSlice<Review>>(initialSlice<Review>())
    const fetchReviews = useCallback(async (page = 0) => {
        setReviewsSlice(p => ({ ...p, loading: true, error: null }))
        try {
            const res = await getReviewsAPI(page, PAGE_SIZE)
            const d: PagedResponse<Review> = res.data
            setReviewsSlice({ data: d.content, loading: false, error: null, totalElements: d.totalElements, totalPages: d.totalPages, page: d.page })
        } catch (e: any) {
            setReviewsSlice(p => ({ ...p, loading: false, error: e?.message ?? 'Failed to load reviews' }))
        }
    }, [])

    // notifications (local only)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const unreadCount = notifications.filter(n => !n.read).length
    const markAllRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })))

    // ui
    const [sidebarOpen, setSidebarOpen] = useState(true)

    // bootstrap
    useEffect(() => {
        fetchOrders()
        fetchProducts()
        fetchCustomers()
        fetchCoupons()
        fetchReviews()
    }, [fetchOrders, fetchProducts, fetchCustomers, fetchCoupons, fetchReviews])

    const value: AdminCtx = {
        orders: ordersSlice.data,
        ordersLoading: ordersSlice.loading,
        ordersError: ordersSlice.error,
        ordersMeta: { totalElements: ordersSlice.totalElements, totalPages: ordersSlice.totalPages, page: ordersSlice.page },
        setOrders: (updater) => setOrdersSlice(p => ({ ...p, data: typeof updater === 'function' ? updater(p.data) : updater })),
        refetchOrders: fetchOrders,

        products: productsSlice.data,
        productsLoading: productsSlice.loading,
        productsError: productsSlice.error,
        productsMeta: { totalElements: productsSlice.totalElements, totalPages: productsSlice.totalPages, page: productsSlice.page },
        setProducts: (updater) => setProductsSlice(p => ({ ...p, data: typeof updater === 'function' ? updater(p.data) : updater })),
        refetchProducts: fetchProducts,

        customers: customersSlice.data,
        customersLoading: customersSlice.loading,
        customersError: customersSlice.error,
        customersMeta: { totalElements: customersSlice.totalElements, totalPages: customersSlice.totalPages, page: customersSlice.page },
        setCustomers: (updater) => setCustomersSlice(p => ({ ...p, data: typeof updater === 'function' ? updater(p.data) : updater })),
        refetchCustomers: fetchCustomers,

        coupons,
        couponsLoading,
        couponsError,
        setCoupons,
        refetchCoupons: fetchCoupons,

        reviews: reviewsSlice.data,
        reviewsLoading: reviewsSlice.loading,
        reviewsError: reviewsSlice.error,
        reviewsMeta: { totalElements: reviewsSlice.totalElements, totalPages: reviewsSlice.totalPages, page: reviewsSlice.page },
        setReviews: (updater) => setReviewsSlice(p => ({ ...p, data: typeof updater === 'function' ? updater(p.data) : updater })),
        refetchReviews: fetchReviews,

        notifications,
        setNotifications,
        unreadCount,
        markAllRead,

        sidebarOpen,
        setSidebarOpen,
    }

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useAdmin = () => {
    const c = useContext(Ctx)
    if (!c) throw new Error('useAdmin must be used inside AdminProvider')
    return c
}
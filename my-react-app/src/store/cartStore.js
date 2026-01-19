import { create } from 'zustand'

const LOCAL_KEY = 'myshop_cart_v1'

const load = () => {
    try {
        const raw = localStorage.getItem(LOCAL_KEY)
        return raw ? JSON.parse(raw) : { items: [] }
    } catch (e) {
        return { items: [] }
    }
}

export const useCart = create((set, get) => ({
    ...load(),
    addItem: (product, qty = 1) => {
        const items = [...(get().items || [])]
        const idx = items.findIndex((i) => i.id === product.id)
        if (idx > -1) {
            items[idx].qty += qty
        } else {
            items.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty })
        }
        set({ items })
        localStorage.setItem(LOCAL_KEY, JSON.stringify({ items }))
    },
    updateQty: (productId, qty) => {
        let items = (get().items || []).map((i) => i.id === productId ? { ...i, qty: Math.max(1, qty) } : i)
        set({ items })
        localStorage.setItem(LOCAL_KEY, JSON.stringify({ items }))
    },
    removeItem: (productId) => {
        let items = (get().items || []).filter((i) => i.id !== productId)
        set({ items })
        localStorage.setItem(LOCAL_KEY, JSON.stringify({ items }))
    },
    clearCart: () => {
        set({ items: [] })
        localStorage.removeItem(LOCAL_KEY)
    },
    count: () => (get().items || []).reduce((s, i) => s + i.qty, 0),
    total: () => (get().items || []).reduce((s, i) => s + i.qty * i.price, 0),
}))

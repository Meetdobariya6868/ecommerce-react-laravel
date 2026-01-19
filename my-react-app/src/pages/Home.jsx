import React from 'react'
import ProductGrid from '../components/ProductGrid'
import { useCart } from '../store/cartStore'
import Header from '../components/Header'

export default function Home() {
    // const featured = products.slice(0, 6)
    const addItem = useCart((s) => s.addItem)

    function handleAdd(product, qty = 1) {
        addItem(product, qty)
        // quick non-blocking feedback
        const msg = `${product.name} (x${qty}) added to cart`
        // small toast using native Notification API is intrusive, use console + alert fallback
        try { console.info(msg) } catch (e) {}
        // optional: lightweight toast
        const el = document.createElement('div')
        el.textContent = msg
        el.style.position = 'fixed'
        el.style.right = '16px'
        el.style.bottom = '16px'
        el.style.background = '#111'
        el.style.color = '#fff'
        el.style.padding = '10px 14px'
        el.style.borderRadius = '8px'
        el.style.boxShadow = '0 4px 18px rgba(2,6,23,0.3)'
        document.body.appendChild(el)
        setTimeout(()=> el.remove(), 1400)
    }

    return (
        <main>
            <Header />

            <section className="container">
                <div className="hero">
                    <div>
                        <h2>Simple, beautiful shopping</h2>
                        <p className="text-muted">Browse curated products, add them to your cart, and checkout in a few clicks.</p>
                        <div className="hero-cta" >
                            <a href="#products" className="btn btn-primary">Shop Now</a>
                            <a href="#" className="btn btn-outline">Learn more</a>
                        </div>
                    </div>
                    <div>
                        <img src="https://picsum.photos/seed/hero/900/600" alt="Hero" style={{ width: '100%', borderRadius: 8 }} />
                    </div>
                </div>
            </section>

            <section id="products" className="container">
                <div className="mb-6">
                    <h3>Featured products</h3>
                    <a href="#" className="text-muted">View all</a>
                </div>
                <ProductGrid onAdd={handleAdd} />
            </section>

            <footer className="site-footer">
                <div className="container">© {new Date().getFullYear()} MyShop — Small demo store</div>
            </footer>
        </main>
    )
}

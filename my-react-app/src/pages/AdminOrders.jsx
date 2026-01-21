import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid'
import { getAuthHeaders } from "../api/auth";
import { logoutUser } from "../services/api";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    function handleAdd() {
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


    // const parsedItems = Array.isArray(order.items)
    //     ? order.items
    //     : JSON.parse(order.items || "[]");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/admin/orders", {
            headers: getAuthHeaders()
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Order fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <main>
                <Header />
                <p style={{ textAlign: "center", padding: 40 }}>Loading orders...</p>
            </main>
        );
    }

    return (
        <main style={{ background: "#f6f7fb", minHeight: "100vh" }}>
            {/* <Header /> */}
            <div style={{ position: "absolute", top: 10, right: 10 }}>
                <button onClick={logoutUser} style={{ padding: "10px 20px", background: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Logout
                </button>
            </div>
            {/* <Link to="/add-product" className='btn btn-outline'>Add products</Link> */}
            <Link to="/add-product" className='btn btn-outline'>Add Product</Link>

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: 30 }}>
                <h2 style={{ marginBottom: 20 }}>Admin – Orders</h2>

                <section id="products" className="container">
                <div className="mb-6">
                    <h3>Featured products</h3>
                    <a href="#" className="text-muted">View all</a>
                </div>
                <ProductGrid onAdd={handleAdd} />
            </section>
            </div>
        </main>
    );
}

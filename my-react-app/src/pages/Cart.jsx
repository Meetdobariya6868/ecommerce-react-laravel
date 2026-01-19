import React from 'react'
import { useCart } from '../store/cartStore'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Cart() {
    const items = useCart((s) => s.items)
    const updateQty = useCart((s) => s.updateQty)
    const removeItem = useCart((s) => s.removeItem)
    const total = useCart((s) => s.total)()
    const navigate = useNavigate()

    return (
        <main style={{ background: "#f7f8fa", minHeight: "100vh" }}>
            <Header />

            <div className="container" style={{ padding: '40px 0', maxWidth: 1100, margin: '0 auto' }}>
                <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 20 }}>Shopping Cart</h2>

                {items && items.length ? (
                    <div>

                        {/* PRODUCT LIST */}
                        <div style={{
                            display: 'grid',
                            gap: 16,
                            marginTop: 16
                        }}>
                            {items.map((i) => (
                                <div key={i.id}
                                    style={{
                                        display: 'flex',
                                        background: "#fff",
                                        borderRadius: 12,
                                        padding: 16,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                                        alignItems: 'center'
                                    }}
                                >
                                    <img
                                        src={i.image}
                                        alt={i.name}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            objectFit: "cover",
                                            borderRadius: 8
                                        }}
                                    />

                                    <div style={{ flex: 1, padding: "0 16px" }}>
                                        <div style={{ fontWeight: 700, fontSize: 17 }}>{i.name}</div>
                                        <div style={{ color: "#6b7280", marginTop: 4 }}>₹{i.price.toFixed(2)}</div>

                                        {/* QTY */}
                                        <div style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                                            <label style={{ fontWeight: 600 }}>Qty:</label>

                                            <input
                                                aria-label="quantity"
                                                type="number"
                                                min="1"
                                                value={i.qty}
                                                onChange={(e) => updateQty(i.id, Number(e.target.value))}
                                                style={{
                                                    width: 70,
                                                    padding: "8px 10px",
                                                    borderRadius: 8,
                                                    border: "1px solid #d1d5db",
                                                    fontSize: 14
                                                }}
                                            />

                                            <button
                                                onClick={() => removeItem(i.id)}
                                                style={{
                                                    padding: "8px 14px",
                                                    borderRadius: 8,
                                                    background: "#ef4444",
                                                    color: "#fff",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    fontWeight: 600
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL + BUTTONS */}
                        <div style={{
                            marginTop: 24,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: "#fff",
                            padding: 20,
                            borderRadius: 12,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
                        }}>
                            <div style={{ fontWeight: 700, fontSize: 20 }}>
                                Total: ${total.toFixed(2)}
                            </div>

                            <div>
                                <button
                                    onClick={() => navigate(-1)}
                                    style={{
                                        padding: "10px 18px",
                                        borderRadius: 8,
                                        border: "2px solid #2563eb",
                                        background: "#fff",
                                        color: "#2563eb",
                                        marginRight: 10,
                                        fontWeight: 600,
                                        cursor: "pointer"
                                    }}
                                >
                                    Continue shopping
                                </button>

                                <Link
                                    to="/checkout"
                                    style={{
                                        padding: "10px 18px",
                                        borderRadius: 8,
                                        background: "#2563eb",
                                        color: "#fff",
                                        fontWeight: 600,
                                        textDecoration: "none"
                                    }}
                                >
                                    Proceed to checkout
                                </Link>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div style={{
                        textAlign: "center",
                        marginTop: 60,
                        color: "#6b7280",
                        fontSize: 18
                    }}>
                        Your cart is empty.{" "}
                        <Link to="/" style={{ color: "#2563eb", fontWeight: 600 }}>
                            Start shopping
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}

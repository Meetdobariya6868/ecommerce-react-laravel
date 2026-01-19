import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // const parsedItems = Array.isArray(order.items)
    //     ? order.items
    //     : JSON.parse(order.items || "[]");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/admin/orders")
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
            <Header />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: 30 }}>
                <h2 style={{ marginBottom: 20 }}>Admin – Orders</h2>

                {orders.length === 0 && <p>No orders found.</p>}

                {orders.map(order => (
                    <div
                        key={order.id}
                        style={{
                            background: "#fff",
                            padding: 20,
                            borderRadius: 10,
                            marginBottom: 20,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <div style={{ marginBottom: 10 }}>
                            <strong>Order ID:</strong> #{order.id}<br />
                            <strong>Name:</strong> {order.name}<br />
                            <strong>Email:</strong> {order.email}<br />
                            <strong>Phone:</strong> {order.phone}<br />
                            <strong>Address:</strong> {order.address}<br />
                            <strong>Total:</strong> ₹{Number(order.total).toFixed(2)}<br />
                            <strong>Date:</strong> {new Date(order.created_at).toLocaleString()}
                        </div>

                        <hr />

                        <h4>Items</h4>

                        {(() => {
                            const parsedItems = Array.isArray(order.items)
                                ? order.items
                                : JSON.parse(order.items || "[]");

                            return parsedItems.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "6px 0",
                                        borderBottom: "1px solid #eee"
                                    }}
                                >
                                    {/* <div>
                                        {item.image && (
                                            <img
                                                src={item.image }
                                                alt={item.name}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    objectFit: "cover",
                                                    borderRadius: 4
                                                }}
                                            />
                                        )}
                                    </div> */}
                                    <div>
                                        {item.name} × {item.qty}
                                    </div>
                                    <div>
                                        ₹{(item.price * item.qty).toFixed(2)}
                                    </div>
                                </div>
                            ));
                        })()}

                    </div>
                ))}
            </div>
        </main>
    );
}

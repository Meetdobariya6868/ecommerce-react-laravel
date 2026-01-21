import React, { useState } from 'react'
import { useCart } from '../store/cartStore'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Checkout() {
  const items = useCart((s) => s.items)
  const total = useCart((s) => s.total)()
  const clearCart = useCart((s) => s.clearCart)
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function placeOrder(e) {
  e.preventDefault();

  if (!form.name || !form.email || !form.address || !form.phone) {
    alert("Please fill all details");
    return;
  }

  setSubmitting(true);

  const order = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    total: Number(total),
    items: items
  };

  try {
    const res = await fetch("http://localhost:8000/api/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(order)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Order failed");
    }

    clearCart();
    navigate("/order-confirmation", {
      state: { orderId: data.order.id }
    });

  } catch (err) {
    console.error("Order Error:", err);
    alert("Could not place order");
  } finally {
    setSubmitting(false);
  }
}



  return (
    <main style={{ background: '#f6f7fb', minHeight: '100vh' }}>
      <Header />

      <div className="container" style={{ padding: '40px 0', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 32,
          marginBottom: 20,
          fontWeight: 700,
          textAlign: 'center',
          color: '#1f2937'
        }}>Checkout</h2>

        <form
          onSubmit={placeOrder}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 30
          }}
        >

          <div style={{
            background: '#fff',
            padding: '25px 30px',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>

            <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 22 }}>Shipping Details</h3>

            <label className="kicker" style={{ fontWeight: 600 }}>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                marginTop: 6,
                border: '1px solid #d4d7dd',
                borderRadius: 8,
                fontSize: 15
              }}
              placeholder="Enter your full name"
            />

            <label className="kicker" style={{ marginTop: 16, fontWeight: 600 }}>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                marginTop: 6,
                border: '1px solid #d4d7dd',
                borderRadius: 8,
                fontSize: 15
              }}
              placeholder="example@gmail.com"
            />

             <label className="kicker" style={{ fontWeight: 600 }}>Phone number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                marginTop: 6,
                border: '1px solid #d4d7dd',
                borderRadius: 8,
                fontSize: 15
              }}
              placeholder="Enter your mobile number"
            />

            <label className="kicker" style={{ marginTop: 16, fontWeight: 600 }}>Shipping Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                marginTop: 6,
                border: '1px solid #d4d7dd',
                borderRadius: 8,
                fontSize: 15,
                resize: 'vertical'
              }}
              rows={5}
              placeholder="Enter full address"
            />

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: 24,
                width: '100%',
                padding: '12px 0',
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 8,
                border: 'none',
                background: submitting ? '#9ca3af' : '#2563eb',
                color: '#fff',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>

          <aside style={{
            background: '#fff',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            height: 'fit-content'
          }}>

            <h3 style={{ marginTop: 0, marginBottom: 15 }}>Order Summary</h3>

            <div style={{ marginBottom: 10 }}>
              {(items || []).map(it => (
                <div key={it.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid #f1f1f1'
                }}>
                  <div style={{ color: '#555' }}>{it.name} × {it.qty}</div>
                  <div style={{ fontWeight: 600 }}>₹{(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: '2px solid #e5e7eb',
              paddingTop: 12,
              marginTop: 12,
              fontSize: 18,
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 700,
              color: '#111'
            }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

          </aside>
        </form>
      </div>
    </main>
  )
}

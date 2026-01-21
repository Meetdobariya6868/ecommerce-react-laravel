import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { getUserOrders } from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      const data = await getUserOrders()
      if (data) {
        setOrders(data)
      }
    } catch (err) {
      setError('Failed to load orders')
      console.error('Orders fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main style={{ background: '#f6f7fb', minHeight: '100vh' }}>
        <Header />
        <div className="container" style={{ padding: '40px 0', maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>My Orders</h2>
          <div style={{ textAlign: 'center' }}>Loading orders...</div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main style={{ background: '#f6f7fb', minHeight: '100vh' }}>
        <Header />
        <div className="container" style={{ padding: '40px 0', maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>My Orders</h2>
          <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
        </div>
      </main>
    )
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
        }}>My Orders</h2>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
            {orders.map((order) => (
              <div key={order.id} style={{
                background: '#fff',
                padding: '25px',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: 15
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18 }}>Order #{order.id}</h3>
                    <p style={{ margin: 5, color: '#6b7280' }}>
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                      Total: ${order.total}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: 15 }}>
                  <h4 style={{ marginBottom: 10 }}>Shipping Details</h4>
                  <p style={{ margin: 5 }}><strong>Name:</strong> {order.name}</p>
                  <p style={{ margin: 5 }}><strong>Email:</strong> {order.email}</p>
                  <p style={{ margin: 5 }}><strong>Phone:</strong> {order.phone}</p>
                  <p style={{ margin: 5 }}><strong>Address:</strong> {order.address}</p>
                </div>

                <div>
                  <h4 style={{ marginBottom: 10 }}>Items Ordered</h4>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {(Array.isArray(order.items) ? order.items : []).map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        background: '#f9fafb',
                        borderRadius: 8
                      }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 500 }}>{item.name}</p>
                          <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
                            Quantity: {item.qty}
                          </p>
                        </div>
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
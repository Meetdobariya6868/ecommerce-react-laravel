import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function OrderConfirmation(){
  const loc = useLocation()
  const state = loc.state || {}
  let order = null
  if(state.orderId){
    const raw = localStorage.getItem('myshop_orders_v1')
    if(raw){
      const arr = JSON.parse(raw)
      order = arr.find(o=> o.id === state.orderId) || arr[arr.length-1]
    }
  } else {
    const raw = localStorage.getItem('myshop_orders_v1')
    if(raw){
      const arr = JSON.parse(raw)
      order = arr[arr.length-1]
    }
  }

  if(!order) return (
    <main>
      <div className="container" style={{padding:'32px 0'}}>
        <h2>Order not found</h2>
        <p className="text-muted">No recent order found. <Link to="/home">Continue shopping</Link></p>
      </div>
    </main>
  )

  return (
    <main>
      <div className="container" style={{padding:'32px 0'}}>
        <h2>Thank you — your order is confirmed</h2>
        <p className="text-muted">Order ID: <strong>{order.id}</strong></p>
        <div style={{marginTop:16}}>
          <h4>Items</h4>
          {order.items.map(it=> (
            <div key={it.id} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f1f5f9'}}>
              <div>{it.name} × {it.qty}</div>
              <div>₹{(it.price * it.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:16,fontWeight:700}}>Total: ₹{order.total.toFixed(2)}</div>
        <div style={{marginTop:24}}>
          <Link to="/home" className="btn btn-primary">Continue shopping</Link>
        </div>
      </div>
    </main>
  )
}
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import { useCart } from '../store/cartStore'
// import api from '../services/api'

export default function ProductDetail(){
  const { id } = useParams()
  const addItem = useCart((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log("API Error:", err)
        // setError(err.message)
        setLoading(false)
      })
  }, [id]);

  if (loading) return (
    <main>
      <Header />
      <div className="container" style={{padding:32}}>
        <div>Loading product details...</div>
      </div>
    </main>
  )

  if (error) return (
    <main>
      <Header />
      <div className="container" style={{padding:32}}>
        <div>Error loading product: {error}</div>
      </div>
    </main>
  )

  if(!product) return (
    <main>
      <Header />
      <div className="container" style={{padding:32}}>
        <h2>Product not found</h2>
        <p className="text-muted">This product does not exist. <Link to="/">Back to store</Link></p>
      </div>
    </main>
  )

  function handleAdd(){
    const n = Math.max(1, Number(qty) || 1)
    addItem(product, n)
    // small confirmation
    const el = document.createElement('div')
    el.textContent = `${product.name} (x${n}) added to cart`
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
      <div className="container" style={{padding:32}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:24}}>
          <div>
            <img src={product.image} alt={product.name} style={{width:'100%',borderRadius:8}} />
          </div>
          <aside style={{background:'#fff',padding:16,borderRadius:8,boxShadow:'0 2px 6px rgba(15,23,42,0.06)'}}>
            <div style={{fontSize:'1.25rem',fontWeight:700}}>{product.name}</div>
            <div className="kicker text-muted">{product.category} • {product.rating} ★</div>
            <div style={{marginTop:12,fontSize:'1.125rem',fontWeight:700}}>₹{product.price.toFixed(2)}</div>
            <p className="text-muted" style={{marginTop:12}}>{product.description}</p>

            <div style={{display:'flex',gap:8,marginTop:14,alignItems:'center'}}>
              <label style={{fontSize:'0.9rem'}}>Qty</label>
              <input aria-label="quantity" type="number" min="1" value={qty} onChange={(e)=> setQty(e.target.value)} style={{width:76,padding:8,border:'1px solid #eee',borderRadius:6}} />
            </div>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <button className="btn btn-primary" onClick={handleAdd}>Add to cart</button>
              <Link to="/cart" className="btn btn-outline">View cart</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((err) => console.log("API Error:", err));
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="product-detail">
//       <img src={product.image} width="200" />
//       <h2>{product.name}</h2>
//       <p>₹{product.price}</p>
//       <p>{product.description}</p>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAdd }) {
    const [qty, setQty] = useState(1)

    function handleAdd() {
        const n = Math.max(1, Number(qty) || 1)
        onAdd && onAdd(product, n)
    }

    return (
        <article className="product-card">
            <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="meta">
                <h3><Link to={`/product/${product.id}`} style={{color:'inherit',textDecoration:'none'}}>{product.name}</Link></h3>
                <p className="category">{product.category}</p>
                <div className="bottom">
                    <div className="price">₹{product.price.toFixed(2)}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input aria-label="qty" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} style={{ width: 64, padding: 6, border: '1px solid #eee', borderRadius: 6 }} />
                        <button onClick={handleAdd} className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </article>
    )
}

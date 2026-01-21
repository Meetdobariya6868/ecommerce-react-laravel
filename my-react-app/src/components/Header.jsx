import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cartStore'
import { logoutUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const items = useCart((s) => s.items)
  const count = items.reduce((s, i) => s + i.qty, 0)
  const navigate = useNavigate();

  return (
    <header className="site-header" >
      <div className="container inner">
        <div className="site-brand">MyShop</div>
        <nav className="site-nav">
          <Link to="/home">Home</Link>
          {/* <Link to="/catalog">Catalog</Link> */}
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart ({count})</Link>
          <button
            onClick={logoutUser}
          >
            Logout
          </button>
          {/* <Link to="/add-product">Add Product</Link> */}
          {/* <Link to="/admin/orders" className='btn btn-outline'>Admin Orders</Link> */}
        </nav>
      </div>
    </header>
  )
}

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({onAdd}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
         console.log("API PRODUCTS:", data);
        setItems(data);
  })
      .catch((err) => console.log("API Error:", err));
  }, []);

  return (
    <div className="product-grid">
      {items.length === 0 && (
        <p style={{ padding: 16 }}>No products found.</p>
      )}
      {items.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd}/>
      ))}
    </div>
  );
};

export default ProductGrid;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/add-product.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    rating: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    fetch("http://127.0.0.1:8000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Product created successfully") {
          alert("Product added!");
          navigate("/");  // redirect to homepage
        } else {
          setError("Something went wrong.");
        }
      })
      .catch(err => setError("API Error: " + err))
      .finally(() => setLoading(false));
  }

  return (
    <main>
      <Header />
      <div className="add-product-container" >
        <h2>Add New Product</h2>

        {error && (
          <div style={{ background: "#fee", padding: 10, marginBottom: 10, borderRadius: 6 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (0–5)"
            value={form.rating}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
          ></textarea>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </main>
  );
}

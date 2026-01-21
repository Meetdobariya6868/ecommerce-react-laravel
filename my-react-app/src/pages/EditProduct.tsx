import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { getAuthHeaders } from "../api/auth";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    rating: "",
    description: ""
  });

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  await axiosClient.put(`/products/${id}`, form, {
    headers: getAuthHeaders(),
  });

  alert("Product updated successfully!");
  navigate(`/admin/orders`);
};


  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} />

        <label>Price</label>
        <input name="price" value={form.price} onChange={onChange} />

        <label>Image URL</label>
        <input name="image" value={form.image} onChange={onChange} />

        <label>Category</label>
        <input name="category" value={form.category} onChange={onChange} />

        <label>Rating</label>
        <input name="rating" value={form.rating} onChange={onChange} />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

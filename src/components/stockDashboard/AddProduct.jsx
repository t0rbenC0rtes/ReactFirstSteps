import { useState } from "react";
import Navbar from "./Navbar";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    currency: "€",
    year: "",
    stock: "",
    imgSrc: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (formData.title.trim() === "") newErrors.title = "Title is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be positive";
    if (!formData.year || formData.year < 2000)
      newErrors.year = "Year must be 2000 or later";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Stock must be 0 or greater";
    if (!formData.imgSrc.trim().startsWith("http"))
      newErrors.imgSrc = "Image URL must start with 'http'";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "year"
          ? parseFloat(value) // Convertit les valeurs numériques en nombres
          : value, // Laisse les autres valeurs (comme title) telles quelles
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    fetch("http://localhost:3002/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData, // On s'assure que formData contient bien les bonnes valeurs
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added:", data);
        alert("Product successfully added!");
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="container addProductForm">
      <h1>Enter product's info:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            className="infoField"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>

        <div>
          <label>Price: </label>
          <input
            className="infoField"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p>{errors.price}</p>}
        </div>

        <div>
          <label>Currency: </label>
          <input
            className="infoField"
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Year: </label>
          <input
            className="infoField"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          {errors.year && <p>{errors.year}</p>}
        </div>

        <div>
          <label>Stock: </label>
          <input
            className="infoField"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <p>{errors.stock}</p>}
        </div>

        <div>
          <label>Image URL: </label>
          <input
            className="infoField"
            type="text"
            name="imgSrc"
            value={formData.imgSrc}
            onChange={handleChange}
          />
          {errors.imgSrc && <p>{errors.imgSrc}</p>}
        </div>

        <button className="addBtn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

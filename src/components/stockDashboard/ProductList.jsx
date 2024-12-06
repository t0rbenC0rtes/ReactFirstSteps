import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://6752d6c3f3754fcea7b9c905.mockapi.io/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const updateStock = (id, change) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const updatedProduct = { ...product, stock: product.stock + change };

    fetch(`https://6752d6c3f3754fcea7b9c905.mockapi.io/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === id ? data : p))
        );
      })
      .catch((error) => console.error("Error updating stock:", error));
  };

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    fetch(`https://6752d6c3f3754fcea7b9c905.mockapi.io/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="dashboard" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdateStock={updateStock}
            onDeleteProduct={deleteProduct}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;

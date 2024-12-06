import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AddProduct from "./AddProduct"; // Page pour ajouter un produit
import ProductList from "./ProductList"; // Page principale du tableau de bord

function Dashboard() {
  return (
    <div className="container">
      {/* Navbar pour la navigation locale */}
      <Navbar />
      
      {/* Sous-routes du Dashboard */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="add-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default Dashboard;

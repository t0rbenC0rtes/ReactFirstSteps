import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/stock-dashboard">Dashboard</Link>
      <Link to="/stock-dashboard/add-product">Add Product</Link>
    </nav>
  );
};

export default Navbar;

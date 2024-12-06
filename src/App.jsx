import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import des composants principaux
import FormValidation from "./components/FormValidation";
import TodoList from "./components/TodoList";
import Dashboard from "./components/stockDashboard/Dashboard";

import "../main.css";

const App = () => {
  return (
    <Router>
      {/* Navigation principale */}
      <nav className="navMain">
        <Link to="/">Home</Link>
        <Link to="/form-validation">Form</Link>
        <Link to="/todos">To-Do</Link>
        <Link to="/stock-dashboard">Stock Manager</Link>
      </nav>

      {/* Routes principales */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-validation" element={<FormValidation />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/stock-dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

// Composant d'accueil
const Home = () => (
  <div style={{ textAlign: "center", marginTop: "2rem" }}>
    <h1>Welcome to my first React projects</h1>
    <p>Click a link above to explore a project.</p>
    <p className="description"><span>Form</span>  asks the user for inputs and checks if these are valid. It then prints the data in a list.</p>
    <p className="description"><span>To-Do</span>  is a to-do list that saves tasks in a "fake" json server using MockAPI.</p>
    <p className="description"><span>Stock Manager</span>  is a 2-page component that simulates a stock managing system.</p>
  </div>
);

export default App;

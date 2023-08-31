import Screen from "./components/signin/signin";
import "./style.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Sign from "./components/signin/Sign";
import Login from "./components/signin/login";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/signin" element={<Screen />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

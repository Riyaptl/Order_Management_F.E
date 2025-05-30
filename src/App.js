// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import { Toaster } from "react-hot-toast";
import './index.css';
import Navbar from './components/NavbarComponents';
import RoutesListPage from './pages/RoutesListPage';
import ShopsListPage from './pages/ShopsListPage';
import OrdersListPage from './pages/OrdersListPage';

export default function App() {
  const { user } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/shops" element={user ? <ShopPage /> : <Navigate to="/login" />} />
        <Route path="/routes_list" element={role=="admin" ? <RoutesListPage /> : <Navigate to="/" />} />
        <Route path="/shops_list" element={role=="admin" ? <ShopsListPage /> : <Navigate to="/" />} />
        <Route path="/orders_list" element={role=="admin" ? <OrdersListPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

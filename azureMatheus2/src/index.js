import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import header from './components/Header'
import './index.css'
import Header from './components/Header';
import Footer from "./components/Footer";
import ComputerVision from "./components/ComputerVision";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Header />
    <ComputerVision />


    <Footer />
  </div>
);
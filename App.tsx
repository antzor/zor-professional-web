import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import AboutPage from './components/pages/AboutPage';
import WhitelabelPage from './components/pages/WhitelabelPage';
import FaqPage from './components/pages/FaqPage';
import ContactPage from './components/pages/ContactPage';
import OutletPage from './components/pages/OutletPage';
import CheckoutPage from './components/pages/CheckoutPage';
import ProductDetailPage from './components/pages/ProductDetailPage';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:handle" element={<ProductDetailPage />} />
              <Route path="/outlet" element={<OutletPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/whitelabel" element={<WhitelabelPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;

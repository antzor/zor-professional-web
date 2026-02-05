import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import BlogPage from './components/pages/BlogPage';
import BlogPostPage from './components/pages/BlogPostPage';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:handle" element={<ProductDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/outlet" element={<OutletPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/whitelabel" element={<WhitelabelPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;

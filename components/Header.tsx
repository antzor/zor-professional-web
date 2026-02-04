import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import LanguageSwitcher from './ui/LanguageSwitcher';
import CartDrawer from './ui/CartDrawer';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const { t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  const navLinks = [
    { to: '/products', label: t('nav.products') },
    { to: '/outlet', label: t('nav.outlet'), highlight: true },
    { to: '/about', label: t('nav.about') },
    { to: '/whitelabel', label: t('nav.whitelabel') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Determine if header should be solid (scrolled or not transparent mode)
  const isSolid = !transparent || scrolled;

  return (
    <>
      <header
        className={`${transparent ? 'absolute top-0 left-0 right-0' : 'sticky top-0'} z-40 transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 backdrop-blur-sm border-b border-gray-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSolid ? 'bg-primary' : 'bg-white'}`}>
              <span className={`font-black text-lg ${isSolid ? 'text-white' : 'text-primary'}`}>Z</span>
            </div>
            <span className={`text-xl font-bold tracking-tight ${isSolid ? 'text-primary' : 'text-white'}`}>
              ZOR Professional
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  link.highlight
                    ? isSolid
                      ? 'text-red-600 hover:text-red-700 font-bold'
                      : 'text-yellow-400 hover:text-yellow-300 font-bold'
                    : isSolid
                      ? isActive(link.to)
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-primary'
                      : isActive(link.to)
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                }`}
              >
                {link.highlight && <span className="mr-1">🔥</span>}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher transparent={!isSolid} />
            </div>
            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                isSolid
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Cart"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
            <Link
              to="/contact"
              className={`hidden sm:flex items-center justify-center rounded-lg h-10 px-5 text-sm font-semibold transition-colors ${
                isSolid
                  ? 'bg-primary text-white hover:bg-primary-light'
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
            >
              {t('nav.quote')}
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden flex items-center justify-center w-10 h-10 ${isSolid ? 'text-gray-700' : 'text-white'}`}
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-border">
              <span className="text-lg font-bold text-primary">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="text-gray-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-6 py-3 text-base font-medium transition-colors ${
                    link.highlight
                      ? 'text-red-600 bg-red-50 font-bold'
                      : isActive(link.to)
                        ? 'text-primary bg-accent'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.highlight && <span className="mr-1">🔥</span>}
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-6 py-4 border-t border-gray-border mt-auto">
              <div className="mb-4">
                <LanguageSwitcher />
              </div>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-lg h-10 w-full bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors"
              >
                {t('nav.quote')}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
};

export default Header;

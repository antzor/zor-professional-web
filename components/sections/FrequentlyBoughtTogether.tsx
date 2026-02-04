import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { getProducts } from '../../lib/shopify';
import type { Product } from '../../types/shopify';

interface FrequentlyBoughtTogetherProps {
  currentProduct: {
    handle: string;
    title: string;
    price: number;
    image: string | null;
    variantId: string;
  };
  productHandles: string[];
}

const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({
  currentProduct,
  productHandles,
}) => {
  const { t } = useLanguage();
  const { addItem, isLoading: cartLoading } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await getProducts(50);
        const matchedProducts = allProducts.filter((p) =>
          productHandles.includes(p.handle)
        );
        setProducts(matchedProducts);
        // Select all by default
        setSelectedProducts(new Set(matchedProducts.map((p) => p.handle)));
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productHandles.length > 0) {
      fetchProducts();
    }
  }, [productHandles]);

  if (!productHandles || productHandles.length === 0 || products.length === 0) {
    return null;
  }

  const toggleProduct = (handle: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(handle)) {
      newSelected.delete(handle);
    } else {
      newSelected.add(handle);
    }
    setSelectedProducts(newSelected);
  };

  const totalPrice =
    currentProduct.price +
    products
      .filter((p) => selectedProducts.has(p.handle))
      .reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = async () => {
    // Add current product
    if (currentProduct.variantId) {
      await addItem(currentProduct.variantId, 1);
    }
    // Add selected products
    for (const product of products) {
      if (selectedProducts.has(product.handle) && product.variantId) {
        await addItem(product.variantId, 1);
      }
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('sections.frequentlyBought')}
      </h2>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Current product */}
        <div className="flex flex-col items-center w-32">
          <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center mb-2 border-2 border-primary">
            {currentProduct.image ? (
              <img
                src={currentProduct.image}
                alt={currentProduct.title}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <span className="material-symbols-outlined text-gray-300 text-3xl">
                inventory_2
              </span>
            )}
          </div>
          <span className="text-xs text-gray-600 text-center line-clamp-2">
            {currentProduct.title}
          </span>
          <span className="text-sm font-bold text-primary mt-1">
            €{currentProduct.price.toFixed(2)}
          </span>
        </div>

        {/* Plus signs and other products */}
        {products.map((product) => (
          <React.Fragment key={product.handle}>
            <span className="text-2xl text-gray-300 font-light">+</span>
            <button
              onClick={() => toggleProduct(product.handle)}
              className={`flex flex-col items-center w-32 transition-opacity ${
                selectedProducts.has(product.handle) ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div
                className={`w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center mb-2 border-2 ${
                  selectedProducts.has(product.handle)
                    ? 'border-primary'
                    : 'border-gray-200'
                }`}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="material-symbols-outlined text-gray-300 text-3xl">
                    inventory_2
                  </span>
                )}
                {selectedProducts.has(product.handle) && (
                  <span className="absolute top-1 right-1 material-symbols-outlined text-primary text-lg">
                    check_circle
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-600 text-center line-clamp-2">
                {product.title}
              </span>
              <span className="text-sm font-bold text-primary mt-1">
                €{product.price.toFixed(2)}
              </span>
            </button>
          </React.Fragment>
        ))}

        {/* Total and Add button */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-2xl text-gray-300 font-light">=</span>
          <div className="text-right">
            <p className="text-sm text-gray-500">{t('sections.bundleTotal')}</p>
            <p className="text-2xl font-black text-primary">
              €{totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleAddAll}
        disabled={cartLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined">add_shopping_cart</span>
        {t('sections.addAllToCart')}
      </button>
    </div>
  );
};

export default FrequentlyBoughtTogether;

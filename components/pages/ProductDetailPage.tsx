import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getProductByHandle, getRelatedProducts, isShopifyConfigured } from '../../lib/shopify';
import { useProductContent } from '../../hooks/useSanityProductContent';
import type { ProductDetail, Product } from '../../types/shopify';

// Section components
import ProductFeatures from '../sections/ProductFeatures';
import ProductSpecs from '../sections/ProductSpecs';
import ProductFAQ from '../sections/ProductFAQ';
import FrequentlyBoughtTogether from '../sections/FrequentlyBoughtTogether';
import ProductTestimonials from '../sections/ProductTestimonials';
import ProductCTA from '../sections/ProductCTA';

const ProductDetailPage: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const { language, t } = useLanguage();
  const { addItem, isLoading: cartLoading } = useCart();
  const headerRef = useScrollAnimation();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product content from Sanity
  const { content } = useProductContent(handle || '');

  // Fetch product by handle from Shopify
  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) {
        setError('Product not found');
        setIsLoading(false);
        return;
      }

      if (!isShopifyConfigured()) {
        setError('Shopify nije konfiguriran.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const shopifyProduct = await getProductByHandle(handle);

        if (!shopifyProduct) {
          setError('Proizvod nije pronađen.');
          setIsLoading(false);
          return;
        }

        setProduct(shopifyProduct);
        setSelectedVariantId(shopifyProduct.variants[0]?.id || '');
        setError(null);

        // Fetch related products
        const related = await getRelatedProducts(handle, shopifyProduct.tags, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Greška pri dohvaćanju proizvoda.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const selectedVariant = product?.variants.find((v) => v.id === selectedVariantId);
  const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
  const currentCompareAtPrice = selectedVariant?.compareAtPrice ?? product?.compareAtPrice;
  const isAvailable = selectedVariant?.availableForSale ?? product?.availableForSale ?? false;

  const handleAddToCart = async () => {
    if (selectedVariantId) {
      await addItem(selectedVariantId, quantity);
    }
  };

  const discount = currentCompareAtPrice && currentCompareAtPrice > currentPrice
    ? Math.round(((currentCompareAtPrice - currentPrice) / currentCompareAtPrice) * 100)
    : null;

  // Calculate average rating from testimonials
  const averageRating = content?.testimonials?.length
    ? content.testimonials.reduce((sum, t) => sum + t.rating, 0) / content.testimonials.length
    : null;

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">
            progress_activity
          </span>
          <p className="text-gray-500 mt-4">{t('products.loading')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
          <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">
            error_outline
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || t('product.notFound')}
          </h1>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light mt-4"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {t('product.backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  // Badge color classes
  const getBadgeColorClass = (color?: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'primary': return 'bg-primary';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
            <Link to="/products" className="text-gray-500 hover:text-primary transition-colors">
              {t('product.breadcrumb.products')}
            </Link>
            <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-border relative">
              {/* Badge */}
              {content?.badge && (
                <span className={`absolute top-4 left-4 z-10 ${getBadgeColorClass(content.badge.color)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {content.badge.text[language]}
                </span>
              )}
              {product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex]?.url}
                  alt={product.images[selectedImageIndex]?.altText || product.title}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/20 text-8xl">
                    inventory_2
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            {/* Title & Rating */}
            <div className="mb-4">
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                {product.title}
              </h1>
              {/* Rating stars from testimonials */}
              {averageRating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`material-symbols-outlined text-lg ${
                          star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({content?.testimonials?.length} {t('sections.reviews')})
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mb-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-primary">
                  €{currentPrice.toFixed(2)}
                </span>
                {currentCompareAtPrice && currentCompareAtPrice > currentPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      €{currentCompareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              {/* Price note from content */}
              {content?.priceNote && (
                <p className="text-sm text-gray-500 mt-1">
                  {content.priceNote[language]}
                </p>
              )}
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="mb-6 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.variant')}
                </label>
                <select
                  value={selectedVariantId}
                  onChange={(e) => setSelectedVariantId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title} - €{variant.price.toFixed(2)}
                      {!variant.availableForSale && ` (${t('product.outOfStock')})`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('product.quantity')}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mb-6">
              
              <button
                onClick={handleAddToCart}
                disabled={cartLoading || !isAvailable}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
                {isAvailable ? t('product.addToCart') : t('product.outOfStock')}
              </button>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                title={t('product.requestQuote')}
              >
                <span className="material-symbols-outlined">request_quote</span>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                {t('sections.fastDelivery')}
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                {t('sections.freeSamples')}
              </div>
            </div>

            {/* Bulk note */}
            <div className="bg-accent rounded-lg p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl shrink-0">info</span>
              <p className="text-sm text-primary">{t('products.bulkNote')}</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {content?.features && content.features.length > 0 && (
          <ProductFeatures features={content.features} />
        )}

        {/* Video Section - from content or Shopify */}
        {(content?.video || product.videoUrl) && (
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {content?.video?.title?.[language] || t('product.video')}
            </h2>
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <iframe
                src={content?.video?.url || product.videoUrl}
                title={content?.video?.title?.[language] || `${product.title} video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Specifications Section */}
        {content?.specifications && content.specifications.length > 0 && (
          <ProductSpecs specifications={content.specifications} />
        )}

        {/* Description Section */}
        {product.descriptionHtml && (
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('product.description')}</h2>
            <div
              className="prose prose-lg max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        )}

        {/* Frequently Bought Together */}
        {content?.frequentlyBoughtWith && content.frequentlyBoughtWith.length > 0 && (
          <FrequentlyBoughtTogether
            currentProduct={{
              handle: product.handle,
              title: product.title,
              price: currentPrice,
              image: product.images[0]?.url || null,
              variantId: selectedVariantId,
            }}
            productHandles={content.frequentlyBoughtWith}
          />
        )}

        {/* Testimonials Section */}
        {content?.testimonials && content.testimonials.length > 0 && (
          <ProductTestimonials testimonials={content.testimonials} />
        )}

        {/* FAQ Section */}
        {content?.faq && content.faq.length > 0 && (
          <ProductFAQ faq={content.faq} />
        )}

        {/* CTA Section */}
        {content?.cta && (
          <ProductCTA cta={content.cta} />
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('product.relatedProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/products/${relProduct.handle}`}
                  className="group border border-gray-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    {relProduct.image ? (
                      <img
                        src={relProduct.image}
                        alt={relProduct.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary/20 text-4xl">
                          inventory_2
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {relProduct.title}
                    </h3>
                    <p className="text-primary font-bold mt-2">€{relProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

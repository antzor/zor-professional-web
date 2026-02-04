import React from 'react';
import type { ProductSpec } from '../../types/productContent';
import { useLanguage } from '../../context/LanguageContext';

interface ProductSpecsProps {
  specifications: ProductSpec[];
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specifications }) => {
  const { language, t } = useLanguage();

  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('sections.specifications')}
      </h2>
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <table className="w-full">
          <tbody>
            {specifications.map((spec, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/2">
                  {spec.label[language]}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSpecs;

import React from 'react';
import { Product } from '../../types';
import { Edit, Trash2, Eye } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Stock</th>
            <th className="text-left p-4">Sales</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    {product.image}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {product.category}
                </span>
              </td>
              <td className="p-4 font-medium">${product.price.toFixed(2)}</td>
              <td className="p-4">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="ml-2">{product.stock}</span>
                </div>
              </td>
              <td className="p-4">{product.sales}</td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
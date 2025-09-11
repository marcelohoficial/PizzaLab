import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { Pizza } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface PizzaCardProps {
  pizza: Pizza;
}

export const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
          <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{pizza.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pizza.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            {formatPrice(pizza.price)}
          </span>
          
          <button
            onClick={() => addItem(pizza)}
            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 group"
          >
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
            <span className="text-sm font-medium">Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </div>
  );
};
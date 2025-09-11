import React, { useState, useEffect } from 'react';
import { PizzaCard } from '../components/ui/PizzaCard';
import { Pizza } from '../types';
import { mockPizzas } from '../lib/api';

const categories = [
  { id: 'todas', name: 'Todas' },
  { id: 'classica', name: 'Clássicas' },
  { id: 'brasileira', name: 'Brasileiras' },
  { id: 'especial', name: 'Especiais' },
  { id: 'vegetariana', name: 'Vegetarianas' }
];

export const CardapioPage: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPizzas(mockPizzas);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPizzas = selectedCategory === 'todas'
    ? pizzas
    : pizzas.filter(pizza => pizza.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossas Deliciosas Pizzas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Feitas com ingredientes frescos e massa artesanal, direto do nosso forno à lenha
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>

        {filteredPizzas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhuma pizza encontrada para esta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
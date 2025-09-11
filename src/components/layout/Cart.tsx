import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

export const Cart: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    totalPrice,
    clearCart 
  } = useCart();
  const { user } = useAuth();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Aqui você faria a integração com a API de pedidos
    alert(`Pedido realizado! Total: ${formatPrice(totalPrice)}`);
    clearCart();
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Seu Carrinho</h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Carrinho vazio</h3>
                <p className="text-sm text-center">
                  Adicione algumas pizzas deliciosas!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.pizza.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.pizza.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatPrice(item.pizza.price)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.pizza.id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.pizza.id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.pizza.id)}
                            className="text-red-500 hover:text-red-700 text-sm transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-orange-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={!user}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {user ? 'Finalizar Pedido' : 'Faça login para continuar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
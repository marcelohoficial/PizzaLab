import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pizza, ShoppingCart, User, LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import clsx from 'clsx';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleCart, totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Pizza className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">PizzaLab</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/cardapio"
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/cardapio')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
              )}
            >
              Cardápio
            </Link>
            
            {user?.role === 'admin' && (
              <Link
                to="/dashboard"
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive('/dashboard')
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                )}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <button
                  onClick={toggleCart}
                  className="p-2 text-gray-600 hover:text-orange-600 relative transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                <div className="flex items-center space-x-3">
                  <Link
                    to="/perfil"
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block text-sm">{user.name}</span>
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    title="Sair"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
import React, { useState, useEffect } from 'react';
import { DollarSign, Package, TrendingUp, Pizza } from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';
import { DashboardMetrics } from '../types';
import { mockDashboardData } from '../lib/api';

const timeRanges = [
  { id: '7d', name: 'Últimos 7 dias' },
  { id: '30d', name: 'Últimos 30 dias' },
  { id: '3m', name: 'Últimos 3 meses' }
];

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [selectedRange, setSelectedRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockDashboardData);
      setLoading(false);
    }, 500);
  }, [selectedRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">Visão geral das vendas e performance da PizzaLab</p>
        </div>

        <div className="flex space-x-4 mb-8">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedRange === range.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:text-orange-600 border border-gray-200'
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Receita Total"
            value={formatCurrency(data.totalRevenue)}
            change="+12.5%"
            icon={DollarSign}
            iconColor="bg-green-500"
          />
          <MetricCard
            title="Pedidos Totais"
            value={data.totalOrders.toString()}
            change="+8.2%"
            icon={Package}
            iconColor="bg-blue-500"
          />
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(data.averageTicket)}
            change="+5.1%"
            icon={TrendingUp}
            iconColor="bg-purple-500"
          />
          <MetricCard
            title="Pizzas Vendidas"
            value={data.pizzasSold.toString()}
            change="+15.8%"
            icon={Pizza}
            iconColor="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Vendas por Dia</h3>
            <div className="space-y-4">
              {data.dailySales.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{day.date}</span>
                    <p className="text-sm text-gray-600">{day.orders} pedidos</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(day.value / 5000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-900 w-20 text-right">
                      {formatCurrency(day.value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Pizzas Mais Vendidas</h3>
            <div className="space-y-4">
              {data.topPizzas.map((item) => (
                <div key={item.pizza.id} className="flex items-center space-x-4">
                  <img
                    src={item.pizza.image}
                    alt={item.pizza.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.pizza.name}</h4>
                    <p className="text-sm text-gray-600">{formatCurrency(item.pizza.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.sales} vendas</p>
                    <p className="text-xs text-gray-500">#{item.ranking}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações de Gestão</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="p-3 bg-orange-500 rounded-xl w-fit mx-auto mb-4">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Gerenciar Usuários</h4>
              <p className="text-sm text-gray-600 mb-4">Visualizar e editar clientes</p>
              <button className="text-orange-600 font-medium hover:text-orange-700">
                Ver todos →
              </button>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="p-3 bg-blue-500 rounded-xl w-fit mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Gerenciar Pedidos</h4>
              <p className="text-sm text-gray-600 mb-4">Acompanhar status dos pedidos</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                Ver todos →
              </button>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-500 rounded-xl w-fit mx-auto mb-4">
                <Pizza className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Gerenciar Cardápio</h4>
              <p className="text-sm text-gray-600 mb-4">Adicionar e editar pizzas</p>
              <button className="text-green-600 font-medium hover:text-green-700">
                Ver todos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
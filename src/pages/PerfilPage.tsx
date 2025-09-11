import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const mockOrders = [
  {
    id: '#001',
    date: '06/01/2024',
    items: ['Margherita', 'Pepperoni'],
    total: 71.80,
    status: 'entregue' as const
  },
  {
    id: '#002',
    date: '04/01/2024',
    items: ['Calabresa Especial', 'Frango com Catupiry'],
    total: 75.80,
    status: 'entregue' as const
  },
  {
    id: '#003',
    date: '02/01/2024',
    items: ['Quattro Stagioni'],
    total: 42.90,
    status: 'entregue' as const
  }
];

export const PerfilPage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const handleSave = () => {
    // Aqui você faria a chamada para a API para atualizar o usuário
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'text-green-600 bg-green-50';
      case 'preparando':
        return 'text-yellow-600 bg-yellow-50';
      case 'pendente':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e pedidos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Informações Pessoais</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {isEditing ? 'Cancelar' : 'Editar'}
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <User className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user?.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user?.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user?.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user?.address}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-6 w-6 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">Histórico de Pedidos</h2>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">Pedido {order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status === 'entregue' && <CheckCircle className="h-3 w-3 inline mr-1" />}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {order.date}
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      {order.items.join(', ')}
                    </p>
                    
                    <p className="text-lg font-bold text-orange-600">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="w-full text-gray-600 hover:text-orange-600 text-sm font-medium transition-colors">
                  Ver Todos os Pedidos →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
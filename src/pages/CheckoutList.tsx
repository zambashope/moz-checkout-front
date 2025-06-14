
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, BarChart3, Copy, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutList = () => {
  // Mock data - in real app this would come from API
  const [checkouts] = useState([
    {
      id: 1,
      title: "E-book: Marketing Digital",
      product: "Marketing Digital Completo",
      price: 99.99,
      conversions: 12,
      views: 156,
      status: "Ativo",
      createdAt: "2024-01-15",
      url: "checkout-pro.com/marketing-digital"
    },
    {
      id: 2,
      title: "Curso: React Avançado",
      product: "Curso React Avançado",
      price: 299.99,
      conversions: 8,
      views: 89,
      status: "Ativo",
      createdAt: "2024-01-10",
      url: "checkout-pro.com/react-avancado"
    },
    {
      id: 3,
      title: "Template: Landing Page",
      product: "Template Landing Page Pro",
      price: 49.99,
      conversions: 23,
      views: 234,
      status: "Pausado",
      createdAt: "2024-01-05",
      url: "checkout-pro.com/template-landing"
    }
  ]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    // In real app, show toast notification
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Páginas de Checkout</h1>
            <p className="text-gray-600 mt-2">Gerencie suas páginas de vendas</p>
          </div>
          <Link to="/checkout-builder">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Página
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Páginas</p>
                  <p className="text-2xl font-bold">{checkouts.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Conversões</p>
                  <p className="text-2xl font-bold">
                    {checkouts.reduce((sum, checkout) => sum + checkout.conversions, 0)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conversão Média</p>
                  <p className="text-2xl font-bold">
                    {(checkouts.reduce((sum, checkout) => sum + (checkout.conversions / checkout.views * 100), 0) / checkouts.length).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkouts List */}
        <div className="space-y-4">
          {checkouts.map((checkout) => (
            <Card key={checkout.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {checkout.title}
                      </h3>
                      <Badge variant={checkout.status === 'Ativo' ? 'default' : 'secondary'}>
                        {checkout.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      Produto: {checkout.product} • {checkout.price.toLocaleString('pt-BR', { style: 'currency', currency: 'MZN' })}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>{checkout.views} visualizações</span>
                      <span>{checkout.conversions} conversões</span>
                      <span>{((checkout.conversions / checkout.views) * 100).toFixed(1)}% taxa de conversão</span>
                      <span>Criado em {new Date(checkout.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <div className="flex items-center mt-3 space-x-2">
                      <span className="text-sm text-gray-500">URL:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{checkout.url}</code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(checkout.url)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Link to={`/checkout-builder/${checkout.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Relatório
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {checkouts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Eye className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma página de checkout criada
              </h3>
              <p className="text-gray-600 mb-6">
                Crie sua primeira página de checkout para começar a vender
              </p>
              <Link to="/checkout-builder">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Página
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutList;

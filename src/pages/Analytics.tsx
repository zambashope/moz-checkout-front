
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  CreditCard, 
  Calendar,
  Filter,
  Download
} from 'lucide-react';

const Analytics = () => {
  // Mock data - in real app this would come from API
  const [timeRange, setTimeRange] = useState('7d');
  
  const stats = {
    totalViews: 1234,
    totalSales: 156,
    conversionRate: 12.6,
    revenue: 45600,
    avgOrderValue: 292.31
  };

  const checkoutData = [
    {
      id: 1,
      checkoutName: "E-book Marketing Digital",
      product: "Marketing Digital Completo",
      views: 456,
      sales: 23,
      conversionRate: 5.04,
      revenue: 2277,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      checkoutName: "Curso React Avançado",
      product: "Curso React Avançado",
      views: 234,
      sales: 12,
      conversionRate: 5.13,
      revenue: 3599,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      checkoutName: "Template Landing Page",
      product: "Template Landing Page Pro",
      views: 544,
      sales: 34,
      conversionRate: 6.25,
      revenue: 1699,
      createdAt: "2024-01-05"
    }
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      customer: "João Silva",
      email: "joao@email.com",
      product: "E-book Marketing Digital",
      amount: 99,
      status: "Aprovado",
      date: "2024-01-20 14:30"
    },
    {
      id: "TXN002",
      customer: "Maria Santos",
      email: "maria@email.com",
      product: "Curso React Avançado",
      amount: 299,
      status: "Pendente",
      date: "2024-01-20 13:15"
    },
    {
      id: "TXN003",
      customer: "Pedro Costa",
      email: "pedro@email.com",
      product: "Template Landing Page",
      amount: 49,
      status: "Aprovado",
      date: "2024-01-20 12:45"
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Análise completa de performance das suas vendas</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '24h' ? '24 horas' : 
               range === '7d' ? '7 dias' :
               range === '30d' ? '30 dias' : '90 dias'}
            </Button>
          ))}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground">+15% vs período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSales}</div>
              <p className="text-xs text-muted-foreground">+8% vs período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'MZN' })}
              </div>
              <p className="text-xs text-muted-foreground">+22% vs período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.avgOrderValue.toLocaleString('pt-BR', { style: 'currency', currency: 'MZN' })}
              </div>
              <p className="text-xs text-muted-foreground">+5% vs período anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Checkout Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance dos Checkouts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Checkout</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Vendas</TableHead>
                    <TableHead>Conv%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checkoutData.map((checkout) => (
                    <TableRow key={checkout.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{checkout.checkoutName}</p>
                          <p className="text-xs text-gray-500">{checkout.product}</p>
                        </div>
                      </TableCell>
                      <TableCell>{checkout.views}</TableCell>
                      <TableCell>{checkout.sales}</TableCell>
                      <TableCell>
                        <Badge variant={checkout.conversionRate > 5 ? 'default' : 'secondary'}>
                          {checkout.conversionRate}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{transaction.customer}</p>
                      <p className="text-xs text-gray-500">{transaction.product}</p>
                      <p className="text-xs text-gray-400">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'MZN' })}
                      </p>
                      <Badge 
                        variant={transaction.status === 'Aprovado' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Análise do Funil de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-gray-600">Visitantes</div>
                <div className="text-xs text-gray-500">100%</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">456</div>
                <div className="text-sm text-gray-600">Iniciaram Checkout</div>
                <div className="text-xs text-gray-500">37%</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">234</div>
                <div className="text-sm text-gray-600">Preencheram Dados</div>
                <div className="text-xs text-gray-500">19%</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Finalizaram Compra</div>
                <div className="text-xs text-gray-500">12.6%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;

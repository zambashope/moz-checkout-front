
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, Package } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const MyProducts = () => {
  const { purchasedProducts } = useAuth();

  const handleDownload = (product: any) => {
    // Simulate download - in real app this would be a secure download link
    console.log('Downloading product:', product.title);
    // You could trigger an actual download here
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meus Produtos</h1>
          <p className="text-gray-600 mt-2">Acesse todos os produtos que você adquiriu</p>
        </div>

        {purchasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {product.coverImage && (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">
                      {product.price.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'MZN' 
                      })}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(product.purchaseDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDownload(product)}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Produto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum produto adquirido
              </h3>
              <p className="text-gray-600 mb-6">
                Quando você comprar produtos, eles aparecerão aqui para download
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyProducts;

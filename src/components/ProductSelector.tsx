
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Check } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage?: string;
}

interface ProductSelectorProps {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProductId,
  onSelectProduct
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Escolher Produto</h3>
      <p className="text-gray-600 text-sm">Selecione o produto que será vendido neste checkout</p>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedProductId === product.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => onSelectProduct(product.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base line-clamp-2">{product.title}</CardTitle>
                  </div>
                  {selectedProductId === product.id && (
                    <div className="ml-2 text-blue-600">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm">
                    {product.price.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'MZN' 
                    })}
                  </Badge>
                  
                  <Button 
                    size="sm" 
                    variant={selectedProductId === product.id ? "default" : "outline"}
                    onClick={() => onSelectProduct(product.id)}
                  >
                    {selectedProductId === product.id ? 'Selecionado' : 'Selecionar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Package className="h-12 w-12 mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum produto encontrado
            </h4>
            <p className="text-gray-600 mb-4">
              Você precisa criar produtos antes de configurar um checkout
            </p>
            <Button 
              onClick={() => window.location.href = '/create-product'}
              variant="outline"
            >
              Criar Produto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductSelector;

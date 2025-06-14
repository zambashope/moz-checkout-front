
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, TrendingUp, TrendingDown } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface UpsellDownsellManagerProps {
  products: Product[];
  selectedProductId: string | null;
  upsells: Product[];
  downsells: Product[];
  onAddUpsell: (product: Product) => void;
  onRemoveUpsell: (productId: string) => void;
  onAddDownsell: (product: Product) => void;
  onRemoveDownsell: (productId: string) => void;
}

const UpsellDownsellManager: React.FC<UpsellDownsellManagerProps> = ({
  products,
  selectedProductId,
  upsells,
  downsells,
  onAddUpsell,
  onRemoveUpsell,
  onAddDownsell,
  onRemoveDownsell
}) => {
  const selectedProduct = products.find(p => p.id === selectedProductId);
  const availableUpsells = products.filter(
    p => p.id !== selectedProductId && 
        selectedProduct && 
        p.price > selectedProduct.price && 
        !upsells.find(u => u.id === p.id)
  );
  const availableDownsells = products.filter(
    p => p.id !== selectedProductId && 
        selectedProduct && 
        p.price < selectedProduct.price && 
        !downsells.find(d => d.id === p.id)
  );

  if (!selectedProductId) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Selecione um produto principal primeiro para configurar upsells e downsells
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upsells */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <TrendingUp className="h-5 w-5" />
            Upsells (Produtos Complementares)
          </CardTitle>
          <p className="text-sm text-gray-600">
            Products com preço maior que serão oferecidos como complemento
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {upsells.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Upsells Configurados:</h4>
              {upsells.map((upsell) => (
                <div key={upsell.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{upsell.title}</h5>
                    <Badge variant="secondary" className="mt-1">
                      {upsell.price.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'MZN' 
                      })}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveUpsell(upsell.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {availableUpsells.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Adicionar Upsell:</h4>
              {availableUpsells.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{product.title}</h5>
                    <p className="text-xs text-gray-600 line-clamp-1">{product.description}</p>
                    <Badge variant="outline" className="mt-1">
                      {product.price.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'MZN' 
                      })}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddUpsell(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              {upsells.length > 0 
                ? "Todos os produtos elegíveis já foram adicionados" 
                : "Nenhum produto disponível para upsell (produtos devem ter preço maior que o principal)"
              }
            </p>
          )}
        </CardContent>
      </Card>

      {/* Downsells */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <TrendingDown className="h-5 w-5" />
            Downsells (Alternativas Mais Baratas)
          </CardTitle>
          <p className="text-sm text-gray-600">
            Produtos com preço menor oferecidos como alternativa
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {downsells.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Downsells Configurados:</h4>
              {downsells.map((downsell) => (
                <div key={downsell.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{downsell.title}</h5>
                    <Badge variant="secondary" className="mt-1">
                      {downsell.price.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'MZN' 
                      })}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveDownsell(downsell.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {availableDownsells.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Adicionar Downsell:</h4>
              {availableDownsells.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{product.title}</h5>
                    <p className="text-xs text-gray-600 line-clamp-1">{product.description}</p>
                    <Badge variant="outline" className="mt-1">
                      {product.price.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'MZN' 
                      })}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddDownsell(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              {downsells.length > 0 
                ? "Todos os produtos elegíveis já foram adicionados" 
                : "Nenhum produto disponível para downsell (produtos devem ter preço menor que o principal)"
              }
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpsellDownsellManager;

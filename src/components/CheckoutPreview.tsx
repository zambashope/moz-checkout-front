
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Phone, Mail, CreditCard } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage?: string;
}

interface CheckoutPreviewProps {
  product: Product | null;
  title: string;
  description: string;
  customMessage: string;
  collectPhone: boolean;
  collectEmail: boolean;
  upsells: Product[];
  downsells: Product[];
  onClose: () => void;
}

const CheckoutPreview: React.FC<CheckoutPreviewProps> = ({
  product,
  title,
  description,
  customMessage,
  collectPhone,
  collectEmail,
  upsells,
  downsells,
  onClose
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preview do Checkout</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Produto Principal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{title || product.title}</CardTitle>
              {description && (
                <p className="text-center text-gray-600">{description}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Imagem do Produto</span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  {product.price.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'MZN' 
                  })}
                </div>
              </div>

              {/* Formulário de Checkout */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Dados para Compra</h3>
                
                {collectPhone && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de Telefone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="phone" 
                        placeholder="+258 XX XXX XXXX" 
                        className="pl-10"
                        disabled 
                      />
                    </div>
                  </div>
                )}

                {collectEmail && (
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        className="pl-10"
                        disabled 
                      />
                    </div>
                  </div>
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Finalizar Compra
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upsells */}
          {upsells.length > 0 && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-600">
                  🚀 Oferta Especial - Aproveite Agora!
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Produtos complementares com desconto especial
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {upsells.map((upsell) => (
                  <div key={upsell.id} className="border rounded-lg p-4 bg-orange-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{upsell.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{upsell.description}</p>
                        <Badge variant="secondary" className="mt-2">
                          {upsell.price.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'MZN' 
                          })}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" disabled>
                        Adicionar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Downsells */}
          {downsells.length > 0 && (
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">
                  💡 Alternativas Mais Acessíveis
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Produtos com preço mais acessível
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {downsells.map((downsell) => (
                  <div key={downsell.id} className="border rounded-lg p-4 bg-blue-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{downsell.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{downsell.description}</p>
                        <Badge variant="secondary" className="mt-2">
                          {downsell.price.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'MZN' 
                          })}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" disabled>
                        Escolher
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {customMessage && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <p className="text-green-800 text-center">{customMessage}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPreview;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Phone, Mail, CreditCard, MapPin } from 'lucide-react';

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
  primaryColor: string;
  buttonColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
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
  primaryColor,
  buttonColor,
  backgroundColor,
  textColor,
  borderRadius,
  fontFamily,
  onClose
}) => {
  if (!product) return null;

  const customStyles = {
    fontFamily: fontFamily,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto" style={customStyles}>
        {/* Header com cor personalizada */}
        <div 
          className="rounded-t-lg px-6 py-4 flex items-center justify-between text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <h2 className="text-lg font-semibold">🔥 OFERTA EXPIRA EM 06:09</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6" style={{ fontFamily }}>
          {/* Formulário Principal */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nome</Label>
              <Input 
                id="name" 
                placeholder="João Silva" 
                style={{ borderRadius: `${borderRadius}px` }}
                disabled 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="joão@email.com" 
                style={{ borderRadius: `${borderRadius}px` }}
                disabled 
              />
            </div>

            {collectPhone && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                <div className="flex gap-2">
                  <select 
                    className="border rounded px-3 py-2 bg-gray-50 text-sm w-20"
                    style={{ borderRadius: `${borderRadius}px` }}
                    disabled
                  >
                    <option>🇲🇿 +258</option>
                  </select>
                  <Input 
                    placeholder="84 123 4567"
                    className="flex-1"
                    style={{ borderRadius: `${borderRadius}px` }}
                    disabled 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Informações de Pagamento */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Informações de pagamento</h3>
            <p className="text-sm text-gray-600">Todos os métodos de cartão e transferências</p>

            <div className="space-y-3">
              {/* Cartão de Crédito */}
              <div className="border rounded-lg p-4 bg-gray-50" style={{ borderRadius: `${borderRadius}px` }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-sm">Cartão de crédito*</span>
                </div>
              </div>

              {/* M-Pesa */}
              <div className="border rounded-lg p-4" style={{ borderRadius: `${borderRadius}px` }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">M-Pesa</p>
                    <p className="text-xs text-gray-500">
                      Os seus dados pessoais serão utilizados para processar o seu pedido, apoiar a 
                      sua experiência neste site, e para outros fins descritos na nossa política 
                      da privacidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Produto e Preço */}
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold" style={{ color: primaryColor }}>
              {product.price.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'MZN' 
              })}
            </div>

            <Button 
              className="w-full text-white font-semibold py-3"
              style={{ 
                backgroundColor: buttonColor,
                borderRadius: `${borderRadius}px`
              }}
              disabled
            >
              💳 PAGAR {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'MZN' })}
            </Button>
          </div>

          {/* Upsells */}
          {upsells.length > 0 && (
            <div className="space-y-3 border-t pt-4">
              <h4 className="font-semibold text-orange-600">🚀 Oferta Especial</h4>
              {upsells.map((upsell) => (
                <div key={upsell.id} className="border rounded-lg p-3 bg-orange-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-sm">{upsell.title}</h5>
                      <p className="text-xs text-gray-600">{upsell.description}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
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
            </div>
          )}

          {/* Downsells */}
          {downsells.length > 0 && (
            <div className="space-y-3 border-t pt-4">
              <h4 className="font-semibold text-blue-600">💡 Alternativa Mais Acessível</h4>
              {downsells.map((downsell) => (
                <div key={downsell.id} className="border rounded-lg p-3 bg-blue-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-sm">{downsell.title}</h5>
                      <p className="text-xs text-gray-600">{downsell.description}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
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
            </div>
          )}

          {customMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-sm text-center">{customMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPreview;

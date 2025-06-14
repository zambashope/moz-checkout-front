
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, CreditCard, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PublicCheckout = () => {
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  // Mock product data - in real app this would come from URL params or API
  const product = {
    id: '1',
    title: 'E-book: Marketing Digital Completo',
    description: 'Aprenda todas as estratégias de marketing digital para fazer seu negócio decolar',
    price: 99.99,
    coverImage: null
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu número de telefone",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store purchase data linked to phone number
    const purchaseData = {
      id: Date.now().toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      purchaseDate: new Date().toISOString(),
      phone: phone
    };

    // Get existing purchases for this phone number
    const existingPurchases = localStorage.getItem(`checkout-products-${phone}`);
    const purchases = existingPurchases ? JSON.parse(existingPurchases) : [];
    
    // Add new purchase
    purchases.push(purchaseData);
    localStorage.setItem(`checkout-products-${phone}`, JSON.stringify(purchases));
    
    setIsProcessing(false);
    setPurchaseComplete(true);
    
    toast({
      title: "Compra realizada!",
      description: "Produto adquirido com sucesso. Crie uma conta para acessar seus produtos."
    });
  };

  if (purchaseComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="text-green-600 mb-4">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Compra Realizada!
            </h2>
            <p className="text-gray-600 mb-6">
              Seu produto foi adquirido com sucesso. Crie uma conta para acessar todos os seus produtos.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => window.location.href = '/register'}>
                Criar Conta
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/login'}>
                Já tenho conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <CreditCard className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="text-3xl font-bold text-green-600">
              {product.price.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'MZN' 
              })}
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card>
          <CardHeader>
            <CardTitle>Finalizar Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePurchase} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+258 84 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Usaremos seu número para vincular a compra. Assim você pode acessar o produto quando criar sua conta.
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {product.price.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'MZN' 
                    })}
                  </span>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing}
                  size="lg"
                >
                  {isProcessing ? 'Processando...' : 'Comprar Agora'}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Fazer login
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicCheckout;

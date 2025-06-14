import React, { useState } from 'react';
import Layout from '../components/Layout';
import ProductSelector from '../components/ProductSelector';
import UpsellDownsellManager from '../components/UpsellDownsellManager';
import CheckoutPreview from '../components/CheckoutPreview';
import CheckoutCustomizer from '../components/CheckoutCustomizer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, Settings, Package, TrendingUp, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock products data - in real app this would come from API/database
const mockProducts = [
  {
    id: '1',
    title: 'E-book: Marketing Digital Completo',
    description: 'Um guia completo sobre estratégias de marketing digital para fazer seu negócio crescer',
    price: 149.99,
  },
  {
    id: '2',
    title: 'Curso Online: Vendas no Digital',
    description: 'Aprenda técnicas avançadas de vendas online e aumente sua conversão',
    price: 299.99,
  },
  {
    id: '3',
    title: 'Template: Landing Pages',
    description: 'Pack com 10 templates profissionais de landing pages para alta conversão',
    price: 89.99,
  }
];

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage?: string;
}

const CheckoutBuilder = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [checkoutTitle, setCheckoutTitle] = useState('');
  const [checkoutDescription, setCheckoutDescription] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [collectPhone, setCollectPhone] = useState(true);
  const [collectEmail, setCollectEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [upsells, setUpsells] = useState<Product[]>([]);
  const [downsells, setDownsells] = useState<Product[]>([]);
  
  // Novos estados para personalização
  const [primaryColor, setPrimaryColor] = useState('#dc2626');
  const [buttonColor, setButtonColor] = useState('#ef4444');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [borderRadius, setBorderRadius] = useState('8');
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif');

  const selectedProduct = mockProducts.find(p => p.id === selectedProductId);

  const handleAddUpsell = (product: Product) => {
    setUpsells(prev => [...prev, product]);
    toast({
      title: "Upsell adicionado!",
      description: `${product.title} foi adicionado como upsell`
    });
  };

  const handleRemoveUpsell = (productId: string) => {
    setUpsells(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddDownsell = (product: Product) => {
    setDownsells(prev => [...prev, product]);
    toast({
      title: "Downsell adicionado!",
      description: `${product.title} foi adicionado como downsell`
    });
  };

  const handleRemoveDownsell = (productId: string) => {
    setDownsells(prev => prev.filter(p => p.id !== productId));
  };

  const handleSaveCheckout = async () => {
    if (!selectedProductId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um produto para o checkout",
        variant: "destructive"
      });
      return;
    }

    if (!checkoutTitle.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, adicione um título para o checkout",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock save checkout
    console.log('Saving checkout:', {
      productId: selectedProductId,
      title: checkoutTitle,
      description: checkoutDescription,
      customMessage,
      collectPhone,
      collectEmail,
      upsells: upsells.map(u => u.id),
      downsells: downsells.map(d => d.id)
    });
    
    setIsLoading(false);
    
    toast({
      title: "Checkout salvo!",
      description: "Seu checkout foi configurado com sucesso"
    });
  };

  const handlePreview = () => {
    if (!selectedProductId) {
      toast({
        title: "Aviso",
        description: "Selecione um produto para visualizar o checkout",
        variant: "destructive"
      });
      return;
    }
    
    setShowPreview(true);
  };

  const handleColorChange = (type: string, color: string) => {
    switch (type) {
      case 'primary':
        setPrimaryColor(color);
        break;
      case 'button':
        setButtonColor(color);
        break;
      case 'background':
        setBackgroundColor(color);
        break;
      case 'text':
        setTextColor(color);
        break;
    }
  };

  const handleStyleChange = (type: string, value: string) => {
    switch (type) {
      case 'borderRadius':
        setBorderRadius(value);
        break;
      case 'font':
        setFontFamily(value);
        break;
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Construtor de Checkout</h1>
          <p className="text-gray-600">Configure seu checkout personalizado para vender seus produtos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Configuration */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="config" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="config" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configuração
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="upsells" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Upsells
                </TabsTrigger>
              </TabsList>

              <TabsContent value="config" className="space-y-6">
                {/* Product Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Seleção de Produto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductSelector
                      products={mockProducts}
                      selectedProductId={selectedProductId}
                      onSelectProduct={setSelectedProductId}
                    />
                  </CardContent>
                </Card>

                {/* Checkout Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Configuração do Checkout
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do Checkout</Label>
                      <Input
                        id="title"
                        placeholder="Ex: Adquira seu E-book agora!"
                        value={checkoutTitle}
                        onChange={(e) => setCheckoutTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição (opcional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Adicione uma descrição personalizada para seu checkout..."
                        value={checkoutDescription}
                        onChange={(e) => setCheckoutDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem Personalizada (opcional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Ex: Obrigado pela sua compra! Você receberá o produto em instantes..."
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        rows={2}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Campos de Coleta</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-normal">Coletar Número de Telefone</Label>
                          <p className="text-xs text-gray-500">Obrigatório para identificar compras futuras</p>
                        </div>
                        <Switch
                          checked={collectPhone}
                          onCheckedChange={setCollectPhone}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-normal">Coletar E-mail</Label>
                          <p className="text-xs text-gray-500">Para envio de confirmações e updates</p>
                        </div>
                        <Switch
                          checked={collectEmail}
                          onCheckedChange={setCollectEmail}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Personalização Visual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CheckoutCustomizer
                      primaryColor={primaryColor}
                      buttonColor={buttonColor}
                      backgroundColor={backgroundColor}
                      textColor={textColor}
                      borderRadius={borderRadius}
                      fontFamily={fontFamily}
                      onColorChange={handleColorChange}
                      onStyleChange={handleStyleChange}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upsells">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Upsells e Downsells
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Configure produtos complementares e alternativas mais baratas
                    </p>
                  </CardHeader>
                  <CardContent>
                    <UpsellDownsellManager
                      products={mockProducts}
                      selectedProductId={selectedProductId}
                      upsells={upsells}
                      downsells={downsells}
                      onAddUpsell={handleAddUpsell}
                      onRemoveUpsell={handleRemoveUpsell}
                      onAddDownsell={handleAddDownsell}
                      onRemoveDownsell={handleRemoveDownsell}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview/Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Checkout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProduct ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        {selectedProduct.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {selectedProduct.description}
                      </p>
                      <p className="text-lg font-bold text-green-600 mt-2">
                        {selectedProduct.price.toLocaleString('pt-BR', { 
                          style: 'currency', 
                          currency: 'MZN' 
                        })}
                      </p>
                    </div>
                    
                    {checkoutTitle && (
                      <div>
                        <Label className="text-xs text-gray-500">Título:</Label>
                        <p className="text-sm font-medium">{checkoutTitle}</p>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      <p>Campos coletados:</p>
                      <ul className="mt-1 space-y-1">
                        {collectPhone && <li>• Número de telefone</li>}
                        {collectEmail && <li>• E-mail</li>}
                      </ul>
                    </div>
                    
                    {(upsells.length > 0 || downsells.length > 0) && (
                      <div className="text-xs text-gray-500">
                        <p>Ofertas adicionais:</p>
                        <ul className="mt-1 space-y-1">
                          {upsells.length > 0 && <li>• {upsells.length} upsell(s)</li>}
                          {downsells.length > 0 && <li>• {downsells.length} downsell(s)</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Selecione um produto para ver o resumo</p>
                  </div>
                )}

                <div className="space-y-2 pt-4 border-t">
                  <Button 
                    onClick={handlePreview}
                    variant="outline" 
                    className="w-full"
                    disabled={!selectedProductId}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar Preview
                  </Button>
                  
                  <Button 
                    onClick={handleSaveCheckout}
                    className="w-full"
                    disabled={isLoading || !selectedProductId}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Salvando...' : 'Salvar Checkout'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && selectedProduct && (
          <CheckoutPreview
            product={selectedProduct}
            title={checkoutTitle}
            description={checkoutDescription}
            customMessage={customMessage}
            collectPhone={collectPhone}
            collectEmail={collectEmail}
            upsells={upsells}
            downsells={downsells}
            primaryColor={primaryColor}
            buttonColor={buttonColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
            borderRadius={borderRadius}
            fontFamily={fontFamily}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default CheckoutBuilder;


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, Save, Palette, Type, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutBuilder = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const [checkoutData, setCheckoutData] = useState({
    title: 'E-book: Marketing Digital Completo',
    description: 'Aprenda as melhores estratégias de marketing digital para fazer seu negócio crescer online.',
    price: 99.99,
    buttonText: 'Comprar Agora',
    backgroundColor: '#ffffff',
    buttonColor: '#3b82f6',
    textColor: '#1f2937',
    logo: null as File | null,
    features: [
      '120 páginas de conteúdo exclusivo',
      'Estratégias práticas e testadas',
      'Templates prontos para usar',
      'Suporte por 30 dias'
    ]
  });

  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  const handleInputChange = (field: string, value: string | number) => {
    setCheckoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...checkoutData.features];
    newFeatures[index] = value;
    setCheckoutData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setCheckoutData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setCheckoutData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Sucesso!",
        description: "Página de checkout salva com sucesso"
      });
      
      navigate('/checkouts');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar checkout. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Editor Panel */}
        <div className="w-1/2 p-6 overflow-y-auto border-r">
          <div className="mb-6">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Editor de Checkout</h1>
            <p className="text-gray-600 mt-1">Personalize sua página de vendas</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'content'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Type className="h-4 w-4 mr-2" />
              Conteúdo
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'design'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Palette className="h-4 w-4 mr-2" />
              Design
            </button>
          </div>

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={checkoutData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={checkoutData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Preço (MZN)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={checkoutData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="buttonText">Texto do Botão</Label>
                    <Input
                      id="buttonText"
                      value={checkoutData.buttonText}
                      onChange={(e) => handleInputChange('buttonText', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Benefícios do Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {checkoutData.features.map((feature, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Digite um benefício..."
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addFeature}>
                    + Adicionar Benefício
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Design Tab */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={checkoutData.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={checkoutData.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="buttonColor">Cor do Botão</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="buttonColor"
                        type="color"
                        value={checkoutData.buttonColor}
                        onChange={(e) => handleInputChange('buttonColor', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={checkoutData.buttonColor}
                        onChange={(e) => handleInputChange('buttonColor', e.target.value)}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="textColor">Cor do Texto</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={checkoutData.textColor}
                        onChange={(e) => handleInputChange('textColor', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={checkoutData.textColor}
                        onChange={(e) => handleInputChange('textColor', e.target.value)}
                        placeholder="#1f2937"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, logo: e.target.files?.[0] || null }))}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Escolher Logo
                      </label>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {checkoutData.logo ? checkoutData.logo.name : 'PNG, JPG até 2MB'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <Button onClick={handleSave} disabled={isLoading} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar Checkout'}
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 bg-gray-100 p-6 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Eye className="h-4 w-4 mr-1" />
              Visualização ao vivo
            </div>
          </div>

          {/* Checkout Preview */}
          <div 
            className="max-w-md mx-auto rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundColor: checkoutData.backgroundColor }}
          >
            <div className="p-8" style={{ color: checkoutData.textColor }}>
              {checkoutData.logo && (
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
                </div>
              )}
              
              <h1 className="text-2xl font-bold mb-4 text-center">
                {checkoutData.title}
              </h1>
              
              <p className="text-center mb-6 opacity-90">
                {checkoutData.description}
              </p>

              <div className="text-center mb-6">
                <span className="text-3xl font-bold">
                  {checkoutData.price.toLocaleString('pt-BR', { style: 'currency', currency: 'MZN' })}
                </span>
              </div>

              <ul className="space-y-2 mb-8">
                {checkoutData.features.filter(f => f).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-4 px-6 rounded-lg font-semibold text-white text-lg shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: checkoutData.buttonColor }}
              >
                {checkoutData.buttonText}
              </button>

              <p className="text-center text-sm mt-4 opacity-75">
                Compra 100% segura • Garantia de 7 dias
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutBuilder;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Palette, Type, Layout, Sparkles } from 'lucide-react';

interface CheckoutCustomizerProps {
  primaryColor: string;
  buttonColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
  onColorChange: (type: string, color: string) => void;
  onStyleChange: (type: string, value: string) => void;
}

const CheckoutCustomizer: React.FC<CheckoutCustomizerProps> = ({
  primaryColor,
  buttonColor,
  backgroundColor,
  textColor,
  borderRadius,
  fontFamily,
  onColorChange,
  onStyleChange
}) => {
  const colorPresets = [
    { name: 'Vermelho', primary: '#dc2626', button: '#ef4444' },
    { name: 'Verde', primary: '#16a34a', button: '#22c55e' },
    { name: 'Azul', primary: '#2563eb', button: '#3b82f6' },
    { name: 'Roxo', primary: '#7c3aed', button: '#8b5cf6' },
    { name: 'Laranja', primary: '#ea580c', button: '#f97316' },
  ];

  const fontOptions = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  ];

  return (
    <div className="space-y-6">
      {/* Cores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palette className="h-5 w-5" />
            Cores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cor Principal</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => onColorChange('primary', e.target.value)}
                  className="w-12 h-10 p-1 rounded"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => onColorChange('primary', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cor do Botão</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={buttonColor}
                  onChange={(e) => onColorChange('button', e.target.value)}
                  className="w-12 h-10 p-1 rounded"
                />
                <Input
                  type="text"
                  value={buttonColor}
                  onChange={(e) => onColorChange('button', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium mb-3 block">Presets de Cores</Label>
            <div className="grid grid-cols-5 gap-2">
              {colorPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  style={{ backgroundColor: preset.primary, color: 'white', borderColor: preset.primary }}
                  onClick={() => {
                    onColorChange('primary', preset.primary);
                    onColorChange('button', preset.button);
                  }}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipografia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Type className="h-5 w-5" />
            Tipografia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Fonte</Label>
            <select
              value={fontFamily}
              onChange={(e) => onStyleChange('font', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Layout className="h-5 w-5" />
            Layout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Borda dos Campos ({borderRadius}px)</Label>
            <input
              type="range"
              min="0"
              max="20"
              value={parseInt(borderRadius)}
              onChange={(e) => onStyleChange('borderRadius', e.target.value)}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutCustomizer;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Palette, Type, Image, Eye } from 'lucide-react';
import { BookingPageData } from './BookingPageBuilder';

interface DesignSettingsProps {
  pageData: BookingPageData;
  onDataChange: (data: Partial<BookingPageData>) => void;
}

const DesignSettings: React.FC<DesignSettingsProps> = ({ pageData, onDataChange }) => {
  const handleBrandingChange = (key: keyof BookingPageData['branding'], value: string) => {
    onDataChange({
      branding: {
        ...pageData.branding,
        [key]: value
      }
    });
  };

  const colorPresets = [
    { name: 'Bleu Médical', primary: '#3b82f6', secondary: '#f1f5f9' },
    { name: 'Vert Santé', primary: '#10b981', secondary: '#f0fdf4' },
    { name: 'Rouge Urgence', primary: '#ef4444', secondary: '#fef2f2' },
    { name: 'Violet Moderne', primary: '#8b5cf6', secondary: '#faf5ff' },
    { name: 'Teal Professionnel', primary: '#14b8a6', secondary: '#f0fdfa' },
  ];

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Source Sans Pro'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Colors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Couleurs et Thème
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Couleur Principale</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={pageData.branding.primaryColor}
                  onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={pageData.branding.primaryColor}
                  onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Couleur Secondaire</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={pageData.branding.secondaryColor}
                  onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={pageData.branding.secondaryColor}
                  onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                  placeholder="#f1f5f9"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Thèmes Prédéfinis</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {colorPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  className="h-16 p-3 flex items-center gap-3 justify-start"
                  onClick={() => {
                    handleBrandingChange('primaryColor', preset.primary);
                    handleBrandingChange('secondaryColor', preset.secondary);
                  }}
                >
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.secondary }}
                    />
                  </div>
                  <span className="text-sm">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typographie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="font">Police de Caractères</Label>
            <Select
              value={pageData.branding.font}
              onValueChange={(value) => handleBrandingChange('font', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une police" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font} value={font}>
                    <span style={{ fontFamily: font }}>{font}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-2">Aperçu de la Police</h4>
            <div style={{ fontFamily: pageData.branding.font }}>
              <h3 className="text-lg font-semibold mb-1">Titre Principal</h3>
              <p className="text-sm text-gray-600">
                Ceci est un exemple de texte avec la police sélectionnée. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Logo et Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logo">URL du Logo</Label>
            <Input
              id="logo"
              value={pageData.branding.logo}
              onChange={(e) => handleBrandingChange('logo', e.target.value)}
              placeholder="https://exemple.com/logo.png"
            />
          </div>

          <div className="space-y-2">
            <Label>Aperçu du Logo</Label>
            <div className="p-4 border rounded-lg bg-gray-50 min-h-24 flex items-center justify-center">
              {pageData.branding.logo ? (
                <img
                  src={pageData.branding.logo}
                  alt="Logo"
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-gray-400 text-sm">Aucun logo téléchargé</div>
              )}
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Image className="w-4 h-4 mr-2" />
            Télécharger un Logo
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Aperçu en Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: pageData.branding.secondaryColor,
              fontFamily: pageData.branding.font 
            }}
          >
            <div 
              className="inline-block px-4 py-2 rounded-lg text-white font-medium mb-4"
              style={{ backgroundColor: pageData.branding.primaryColor }}
            >
              Réserver un Rendez-vous
            </div>
            <h3 className="text-xl font-semibold mb-2">{pageData.doctorInfo.name}</h3>
            <p className="text-gray-600 mb-4">{pageData.doctorInfo.specialty}</p>
            <div className="flex gap-2">
              <div 
                className="px-3 py-1 rounded text-sm"
                style={{ 
                  backgroundColor: pageData.branding.primaryColor + '20',
                  color: pageData.branding.primaryColor 
                }}
              >
                Consultation
              </div>
              <div 
                className="px-3 py-1 rounded text-sm"
                style={{ 
                  backgroundColor: pageData.branding.primaryColor + '20',
                  color: pageData.branding.primaryColor 
                }}
              >
                25€
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignSettings;

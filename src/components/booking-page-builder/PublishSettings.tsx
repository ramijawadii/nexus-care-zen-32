
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Copy, 
  ExternalLink, 
  Share2, 
  QrCode,
  Settings,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { BookingPageData } from './BookingPageBuilder';

interface PublishSettingsProps {
  pageData: BookingPageData;
  onDataChange: (data: Partial<BookingPageData>) => void;
  onPublish: () => void;
}

const PublishSettings: React.FC<PublishSettingsProps> = ({
  pageData,
  onDataChange,
  onPublish
}) => {
  const [customUrl, setCustomUrl] = useState(pageData.url);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const handleUrlChange = (newUrl: string) => {
    // Format URL: remove spaces, special chars, etc.
    const formattedUrl = newUrl.toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    setCustomUrl(formattedUrl + '.monrdv.fr');
    onDataChange({ url: formattedUrl + '.monrdv.fr' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const generateQRCode = () => {
    setIsGeneratingQR(true);
    // Simulate QR code generation
    setTimeout(() => {
      setIsGeneratingQR(false);
    }, 2000);
  };

  const shareOptions = [
    { name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    { name: 'WhatsApp', icon: '💬', color: 'bg-green-500' },
    { name: 'Email', icon: '📧', color: 'bg-gray-600' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Publication Status */}
      <Card className={`border-2 ${pageData.isPublished ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {pageData.isPublished ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-amber-600" />
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {pageData.isPublished ? 'Page Publiée' : 'Page en Brouillon'}
                </h3>
                <p className="text-sm text-gray-600">
                  {pageData.isPublished 
                    ? 'Votre page est en ligne et accessible aux patients'
                    : 'Votre page n\'est pas encore visible publiquement'
                  }
                </p>
              </div>
            </div>
            <Button 
              onClick={onPublish}
              className={pageData.isPublished ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
            >
              {pageData.isPublished ? 'Mettre à jour' : 'Publier maintenant'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* URL Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Configuration de l'URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customUrl">URL personnalisée</Label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">https://</span>
              <Input
                id="customUrl"
                value={customUrl.replace('.monrdv.fr', '')}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="dr-marie-dubois"
                className="flex-1"
              />
              <span className="text-sm text-gray-500">.monrdv.fr</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Cette URL sera utilisée par vos patients pour accéder à votre page de réservation
            </p>
          </div>

          {pageData.isPublished && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    https://{pageData.url}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`https://${pageData.url}`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://${pageData.url}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://${pageData.url}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sharing Options */}
      {pageData.isPublished && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Partage et Promotion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Code QR</Label>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  {isGeneratingQR ? (
                    <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  ) : (
                    <QrCode className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <Button
                    variant="outline"
                    onClick={generateQRCode}
                    disabled={isGeneratingQR}
                  >
                    {isGeneratingQR ? 'Génération...' : 'Générer Code QR'}
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">
                    À afficher dans votre cabinet pour faciliter les réservations
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label>Partage sur les réseaux sociaux</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {shareOptions.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                      // Implement social sharing logic
                      console.log(`Sharing on ${option.name}`);
                    }}
                  >
                    <span>{option.icon}</span>
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Code d'intégration</h4>
              <p className="text-sm text-gray-600 mb-3">
                Copiez ce code pour intégrer le bouton de réservation sur votre site existant
              </p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                {`<iframe src="https://${pageData.url}/widget" width="300" height="400"></iframe>`}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => copyToClipboard(`<iframe src="https://${pageData.url}/widget" width="300" height="400"></iframe>`)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copier le code
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO and Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Paramètres Avancés
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Fonctionnalités
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Réservations en ligne</Label>
                    <p className="text-sm text-gray-500">Permettre aux patients de réserver directement</p>
                  </div>
                  <Switch
                    checked={pageData.settings.allowOnlineBooking}
                    onCheckedChange={(checked) => 
                      onDataChange({
                        settings: { ...pageData.settings, allowOnlineBooking: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Pré-paiement requis</Label>
                    <p className="text-sm text-gray-500">Exiger un paiement lors de la réservation</p>
                  </div>
                  <Switch
                    checked={pageData.settings.requirePrePayment}
                    onCheckedChange={(checked) => 
                      onDataChange({
                        settings: { ...pageData.settings, requirePrePayment: checked }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Sécurité et Conformité
              </h4>
              
              <div className="space-y-2">
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                  <CheckCircle className="w-3 h-3" />
                  Conforme RGPD
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                  <CheckCircle className="w-3 h-3" />
                  SSL Sécurisé
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                  <CheckCircle className="w-3 h-3" />
                  Sauvegarde automatique
                </Badge>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bufferTime">Temps de battement (minutes)</Label>
                <Input
                  id="bufferTime"
                  type="number"
                  value={pageData.settings.bufferTime}
                  onChange={(e) => 
                    onDataChange({
                      settings: { ...pageData.settings, bufferTime: parseInt(e.target.value) || 0 }
                    })
                  }
                  min="0"
                  max="60"
                />
              </div>

              <div>
                <Label htmlFor="advanceBooking">Réservation à l'avance (jours)</Label>
                <Input
                  id="advanceBooking"
                  type="number"
                  value={pageData.settings.advanceBookingDays}
                  onChange={(e) => 
                    onDataChange({
                      settings: { ...pageData.settings, advanceBookingDays: parseInt(e.target.value) || 0 }
                    })
                  }
                  min="1"
                  max="365"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Preview */}
      {pageData.isPublished && (
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Vues cette semaine</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600">Réservations</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">7.2%</div>
                <div className="text-sm text-gray-600">Taux de conversion</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">4.8</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PublishSettings;

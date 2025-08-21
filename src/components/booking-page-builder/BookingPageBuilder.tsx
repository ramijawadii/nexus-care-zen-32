import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Edit3, 
  Settings, 
  Globe, 
  Smartphone, 
  Monitor,
  Palette,
  Layout,
  Calendar,
  User,
  Share2,
  Save,
  Sparkles
} from 'lucide-react';
import TemplateSelector from './TemplateSelector';
import PageEditor from './PageEditor';
import PreviewMode from './PreviewMode';
import PublishSettings from './PublishSettings';
import DesignSettings from './DesignSettings';
import BookingSettings from './BookingSettings';

export interface BookingPageData {
  id: string;
  template: string;
  doctorInfo: {
    name: string;
    specialty: string;
    photo: string;
    description: string;
    qualifications: string[];
    languages: string[];
  };
  clinicInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    hours: { [key: string]: { open: string; close: string; closed: boolean } };
  };
  services: Array<{
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
  }>;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
    logo: string;
  };
  settings: {
    allowOnlineBooking: boolean;
    requirePrePayment: boolean;
    bufferTime: number;
    advanceBookingDays: number;
    cancellationPolicy: string;
  };
  isPublished: boolean;
  url: string;
}

const BookingPageBuilder = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [pageData, setPageData] = useState<BookingPageData>({
    id: 'booking-page-1',
    template: 'modern',
    doctorInfo: {
      name: 'Dr. Marie Dubois',
      specialty: 'Médecin Généraliste',
      photo: '',
      description: 'Médecin expérimenté avec plus de 15 ans d\'expérience en médecine générale. Spécialisée dans les soins préventifs et le suivi des maladies chroniques.',
      qualifications: ['Doctorat en Médecine', 'DES Médecine Générale', 'Formation en Télémédecine'],
      languages: ['Français', 'Anglais', 'Espagnol']
    },
    clinicInfo: {
      name: 'Cabinet Médical du Centre',
      address: '123 Rue de la Santé, 75014 Paris',
      phone: '+33 1 23 45 67 89',
      email: 'contact@cabinet-centre.fr',
      website: 'www.cabinet-centre.fr',
      hours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '17:00', closed: false },
        saturday: { open: '09:00', close: '12:00', closed: false },
        sunday: { open: '09:00', close: '12:00', closed: true }
      }
    },
    services: [
      {
        id: '1',
        name: 'Consultation générale',
        description: 'Consultation médicale complète avec examen clinique',
        duration: 30,
        price: 25,
        category: 'Consultation'
      },
      {
        id: '2',
        name: 'Suivi chronique',
        description: 'Suivi médical pour pathologies chroniques',
        duration: 20,
        price: 25,
        category: 'Suivi'
      },
      {
        id: '3',
        name: 'Certificat médical',
        description: 'Établissement de certificats médicaux',
        duration: 15,
        price: 20,
        category: 'Administrative'
      }
    ],
    branding: {
      primaryColor: '#3b82f6',
      secondaryColor: '#f1f5f9',
      font: 'Inter',
      logo: ''
    },
    settings: {
      allowOnlineBooking: true,
      requirePrePayment: false,
      bufferTime: 10,
      advanceBookingDays: 30,
      cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant le rendez-vous'
    },
    isPublished: false,
    url: 'dr-marie-dubois.monrdv.fr'
  });

  const handleSave = () => {
    console.log('Saving booking page data:', pageData);
    setHasUnsavedChanges(false);
  };

  const handlePublish = () => {
    const updatedData = { ...pageData, isPublished: true };
    setPageData(updatedData);
    console.log('Publishing booking page:', updatedData);
  };

  const handleDataChange = (newData: Partial<BookingPageData>) => {
    setPageData(prev => ({ ...prev, ...newData }));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="h-full flex flex-col bg-blue-50">
      {/* Header */}
      <div className="border-b bg-blue-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Constructeur de Page de Réservation
              </h1>
              <p className="text-sm text-gray-600">
                Créez votre page de réservation en ligne personnalisée
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Preview Toggle */}
            <div className="flex items-center border rounded-lg p-1 bg-white">
              <Button
                variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('tablet')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Mode Toggle */}
            <Button
              variant={isPreviewMode ? 'default' : 'outline'}
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Mode Édition' : 'Aperçu'}
            </Button>

            {/* Save Button */}
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>

            {/* Publish Button */}
            <Button 
              onClick={handlePublish}
              className="bg-green-600 hover:bg-green-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {pageData.isPublished ? 'Mis à jour' : 'Publier'}
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mt-4 p-3 bg-blue-200/50 rounded-lg">
          <div className="flex items-center gap-4">
            <Badge variant={pageData.isPublished ? 'default' : 'secondary'}>
              {pageData.isPublished ? 'Publié' : 'Brouillon'}
            </Badge>
            <span className="text-sm text-gray-600">
              URL: <span className="font-mono">{pageData.url}</span>
            </span>
          </div>
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm">Modifications non sauvegardées</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-blue-50">
        {isPreviewMode ? (
          <PreviewMode 
            pageData={pageData} 
            device={previewDevice}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="border-b bg-blue-100 px-6 py-2">
              <TabsList className="grid w-full max-w-2xl grid-cols-5 bg-white">
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Contenu
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="booking" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Réservation
                </TabsTrigger>
                <TabsTrigger value="publish" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Publication
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto bg-blue-50">
              <TabsContent value="templates" className="h-full m-0">
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={(template) => {
                    setSelectedTemplate(template);
                    handleDataChange({ template });
                  }}
                />
              </TabsContent>

              <TabsContent value="content" className="h-full m-0">
                <PageEditor
                  pageData={pageData}
                  onDataChange={handleDataChange}
                />
              </TabsContent>

              <TabsContent value="design" className="h-full m-0">
                <DesignSettings
                  pageData={pageData}
                  onDataChange={handleDataChange}
                />
              </TabsContent>

              <TabsContent value="booking" className="h-full m-0">
                <BookingSettings
                  pageData={pageData}
                  onDataChange={handleDataChange}
                />
              </TabsContent>

              <TabsContent value="publish" className="h-full m-0">
                <PublishSettings
                  pageData={pageData}
                  onDataChange={handleDataChange}
                  onPublish={handlePublish}
                />
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default BookingPageBuilder;

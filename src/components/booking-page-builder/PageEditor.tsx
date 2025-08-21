
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building2, 
  Stethoscope, 
  Plus, 
  Trash2, 
  Upload,
  Clock,
  Euro,
  Tag
} from 'lucide-react';
import { BookingPageData } from './BookingPageBuilder';

interface PageEditorProps {
  pageData: BookingPageData;
  onDataChange: (data: Partial<BookingPageData>) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ pageData, onDataChange }) => {
  const handleDoctorInfoChange = (field: string, value: any) => {
    onDataChange({
      doctorInfo: {
        ...pageData.doctorInfo,
        [field]: value
      }
    });
  };

  const handleClinicInfoChange = (field: string, value: any) => {
    onDataChange({
      clinicInfo: {
        ...pageData.clinicInfo,
        [field]: value
      }
    });
  };

  const handleServiceChange = (serviceId: string, field: string, value: any) => {
    const updatedServices = pageData.services.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    );
    onDataChange({ services: updatedServices });
  };

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      name: 'Nouvelle consultation',
      description: 'Description du service',
      duration: 30,
      price: 25,
      category: 'Consultation'
    };
    onDataChange({
      services: [...pageData.services, newService]
    });
  };

  const removeService = (serviceId: string) => {
    onDataChange({
      services: pageData.services.filter(service => service.id !== serviceId)
    });
  };

  const addQualification = () => {
    handleDoctorInfoChange('qualifications', [...pageData.doctorInfo.qualifications, '']);
  };

  const removeQualification = (index: number) => {
    const newQualifications = pageData.doctorInfo.qualifications.filter((_, i) => i !== index);
    handleDoctorInfoChange('qualifications', newQualifications);
  };

  const updateQualification = (index: number, value: string) => {
    const newQualifications = [...pageData.doctorInfo.qualifications];
    newQualifications[index] = value;
    handleDoctorInfoChange('qualifications', newQualifications);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Doctor Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations du Médecin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctorName">Nom complet</Label>
              <Input
                id="doctorName"
                value={pageData.doctorInfo.name}
                onChange={(e) => handleDoctorInfoChange('name', e.target.value)}
                placeholder="Dr. Marie Dubois"
              />
            </div>
            <div>
              <Label htmlFor="specialty">Spécialité</Label>
              <Input
                id="specialty"
                value={pageData.doctorInfo.specialty}
                onChange={(e) => handleDoctorInfoChange('specialty', e.target.value)}
                placeholder="Médecin Généraliste"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Présentation</Label>
            <Textarea
              id="description"
              value={pageData.doctorInfo.description}
              onChange={(e) => handleDoctorInfoChange('description', e.target.value)}
              placeholder="Décrivez votre expérience et votre approche médicale..."
              rows={4}
            />
          </div>

          <div>
            <Label>Photo de profil</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {pageData.doctorInfo.photo ? (
                  <img 
                    src={pageData.doctorInfo.photo} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Télécharger photo
              </Button>
            </div>
          </div>

          <div>
            <Label>Qualifications et Diplômes</Label>
            <div className="space-y-2">
              {pageData.doctorInfo.qualifications.map((qualification, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={qualification}
                    onChange={(e) => updateQualification(index, e.target.value)}
                    placeholder="Ex: Doctorat en Médecine"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQualification(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addQualification}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter qualification
              </Button>
            </div>
          </div>

          <div>
            <Label>Langues parlées</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {pageData.doctorInfo.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {language}
                  <button
                    onClick={() => {
                      const newLanguages = pageData.doctorInfo.languages.filter((_, i) => i !== index);
                      handleDoctorInfoChange('languages', newLanguages);
                    }}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newLanguage = prompt('Ajouter une langue:');
                  if (newLanguage) {
                    handleDoctorInfoChange('languages', [...pageData.doctorInfo.languages, newLanguage]);
                  }
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter langue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Informations du Cabinet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clinicName">Nom du cabinet</Label>
              <Input
                id="clinicName"
                value={pageData.clinicInfo.name}
                onChange={(e) => handleClinicInfoChange('name', e.target.value)}
                placeholder="Cabinet Médical du Centre"
              />
            </div>
            <div>
              <Label htmlFor="clinicPhone">Téléphone</Label>
              <Input
                id="clinicPhone"
                value={pageData.clinicInfo.phone}
                onChange={(e) => handleClinicInfoChange('phone', e.target.value)}
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="clinicAddress">Adresse complète</Label>
            <Textarea
              id="clinicAddress"
              value={pageData.clinicInfo.address}
              onChange={(e) => handleClinicInfoChange('address', e.target.value)}
              placeholder="123 Rue de la Santé, 75014 Paris"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clinicEmail">Email</Label>
              <Input
                id="clinicEmail"
                type="email"
                value={pageData.clinicInfo.email}
                onChange={(e) => handleClinicInfoChange('email', e.target.value)}
                placeholder="contact@cabinet-centre.fr"
              />
            </div>
            <div>
              <Label htmlFor="clinicWebsite">Site web</Label>
              <Input
                id="clinicWebsite"
                value={pageData.clinicInfo.website}
                onChange={(e) => handleClinicInfoChange('website', e.target.value)}
                placeholder="www.cabinet-centre.fr"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Services Proposés
            </div>
            <Button onClick={addService}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter service
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pageData.services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  <Tag className="w-3 h-3 mr-1" />
                  {service.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeService(service.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Nom du service</Label>
                  <Input
                    value={service.name}
                    onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                    placeholder="Consultation générale"
                  />
                </div>
                <div>
                  <Label>Catégorie</Label>
                  <Input
                    value={service.category}
                    onChange={(e) => handleServiceChange(service.id, 'category', e.target.value)}
                    placeholder="Consultation"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                  placeholder="Description du service..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Durée (minutes)
                  </Label>
                  <Input
                    type="number"
                    value={service.duration}
                    onChange={(e) => handleServiceChange(service.id, 'duration', parseInt(e.target.value) || 0)}
                    min="5"
                    max="120"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-1">
                    <Euro className="w-3 h-3" />
                    Prix (€)
                  </Label>
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) => handleServiceChange(service.id, 'price', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.50"
                  />
                </div>
              </div>
            </div>
          ))}

          {pageData.services.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucun service ajouté</p>
              <p className="text-sm">Cliquez sur "Ajouter service" pour commencer</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageEditor;

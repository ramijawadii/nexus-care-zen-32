import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Calendar,
  Globe,
  MessageCircle,
  Award,
  Languages,
  User,
  Building
} from 'lucide-react';
import { BookingPageData } from './BookingPageBuilder';
import BookingModal from './BookingModal';

interface PreviewModeProps {
  pageData: BookingPageData;
  device: 'desktop' | 'tablet' | 'mobile';
}

const PreviewMode: React.FC<PreviewModeProps> = ({ pageData, device }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const getDeviceClasses = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-6xl mx-auto';
    }
  };

  const isMobile = device === 'mobile';

  return (
    <>
      <div className="h-full overflow-auto bg-blue-100 p-4">
        <div className={`${getDeviceClasses()} bg-background rounded-lg shadow-lg overflow-hidden`}>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="p-6 md:p-8">
              <div className={`flex ${isMobile ? 'flex-col items-center text-center' : 'items-center gap-6'}`}>
                {/* Doctor Photo */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-background/20 flex items-center justify-center mb-4 md:mb-0">
                  {pageData.doctorInfo.photo ? (
                    <img 
                      src={pageData.doctorInfo.photo} 
                      alt={pageData.doctorInfo.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-4xl font-bold">
                      {pageData.doctorInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {pageData.doctorInfo.name}
                  </h1>
                  <p className="text-xl text-primary-foreground/80 mb-3">
                    {pageData.doctorInfo.specialty}
                  </p>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>
                    <span className="text-primary-foreground/80">4.9 (127 avis)</span>
                  </div>
                  <Button 
                    className="bg-background text-primary hover:bg-background/90"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Prendre Rendez-vous
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-blue-50 border-b sticky top-0 z-10">
            <div className="px-6 py-3">
              <div className={`flex ${isMobile ? 'flex-wrap gap-2' : 'space-x-6'}`}>
                {['À propos', 'Services', 'Horaires', 'Contact', 'Avis'].map((item) => (
                  <button 
                    key={item}
                    className="text-muted-foreground hover:text-primary py-2 px-3 rounded-md hover:bg-accent transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-8 bg-blue-50">
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">À propos</h2>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-6`}>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {pageData.doctorInfo.description}
                  </p>
                  
                  {/* Qualifications */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Diplômes et Qualifications
                    </h3>
                    <ul className="space-y-1">
                      {pageData.doctorInfo.qualifications.map((qualification, index) => (
                        <li key={index} className="text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {qualification}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Languages className="w-4 h-4" />
                      Langues parlées
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pageData.doctorInfo.languages.map((language, index) => (
                        <Badge key={index} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Info Card */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold">Informations pratiques</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{pageData.clinicInfo.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{pageData.clinicInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{pageData.clinicInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <span>{pageData.clinicInfo.website}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Direct
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Services Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Mes Services</h2>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
                {pageData.services.map((service) => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline">{service.category}</Badge>
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">{service.price}€</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.duration} min
                          </p>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {service.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsBookingModalOpen(true)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Réserver
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-blue-100 -mx-6 px-6 py-8">
              <h2 className="text-2xl font-bold text-center mb-6">
                Prendre Rendez-vous
              </h2>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-8`}>
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      Coordonnées du Cabinet
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Building className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{pageData.clinicInfo.name}</p>
                          <p className="text-muted-foreground">{pageData.clinicInfo.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <p className="text-muted-foreground">{pageData.clinicInfo.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <p className="text-muted-foreground">{pageData.clinicInfo.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Horaires d'ouverture
                    </h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(pageData.clinicInfo.hours).map(([day, hours]) => {
                        const dayNames = {
                          monday: 'Lundi',
                          tuesday: 'Mardi',
                          wednesday: 'Mercredi',
                          thursday: 'Jeudi',
                          friday: 'Vendredi',
                          saturday: 'Samedi',
                          sunday: 'Dimanche'
                        };
                        
                        return (
                          <div key={day} className="flex justify-between">
                            <span className="font-medium">{dayNames[day as keyof typeof dayNames]}</span>
                            <span className="text-muted-foreground">
                              {hours.closed ? 'Fermé' : `${hours.open} - ${hours.close}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Button 
                  size="lg"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver en ligne maintenant
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Confirmation immédiate • Annulation gratuite 24h avant
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="bg-blue-200 text-gray-700 p-6 text-center">
            <p className="text-sm">
              © 2024 {pageData.doctorInfo.name} - Tous droits réservés
            </p>
            <p className="text-xs mt-1">
              Propulsé par HealthCRM
            </p>
          </footer>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        pageData={pageData}
      />
    </>
  );
};

export default PreviewMode;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Zap, 
  Heart, 
  Sparkles,
  Crown,
  Brush
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'minimal' | 'medical';
  features: string[];
  preview: string;
  isPremium: boolean;
  rating: number;
  usageCount: number;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Moderne & Élégant',
    description: 'Design contemporain avec animations subtiles et interface intuitive',
    category: 'modern',
    features: ['Responsive', 'Animations CSS', 'Calendrier intégré', 'Chat en direct'],
    preview: '/api/placeholder/400/300',
    isPremium: false,
    rating: 4.8,
    usageCount: 1240
  },
  {
    id: 'medical-pro',
    name: 'Médical Professionnel',
    description: 'Spécialement conçu pour les professionnels de santé',
    category: 'medical',
    features: ['Conformité RGPD', 'Formulaires médicaux', 'Téléconsultation', 'Rappels SMS'],
    preview: '/api/placeholder/400/300',
    isPremium: true,
    rating: 4.9,
    usageCount: 890
  },
  {
    id: 'minimal-clean',
    name: 'Minimaliste',
    description: 'Design épuré et focus sur l\'essentiel',
    category: 'minimal',
    features: ['Chargement rapide', 'Navigation simple', 'SEO optimisé', 'Multi-langues'],
    preview: '/api/placeholder/400/300',
    isPremium: false,
    rating: 4.6,
    usageCount: 567
  },
  {
    id: 'classic-elegant',
    name: 'Classique Élégant',
    description: 'Style traditionnel avec une touche moderne',
    category: 'classic',
    features: ['Palette neutres', 'Typographie classique', 'Sections structurées', 'Galerie photos'],
    preview: '/api/placeholder/400/300',
    isPremium: false,
    rating: 4.7,
    usageCount: 445
  },
  {
    id: 'premium-luxury',
    name: 'Premium Luxe',
    description: 'Design haut de gamme pour une clientèle exigeante',
    category: 'modern',
    features: ['Animations premium', 'Vidéo background', 'Réalité virtuelle', 'Concierge IA'],
    preview: '/api/placeholder/400/300',
    isPremium: true,
    rating: 5.0,
    usageCount: 123
  },
  {
    id: 'clinic-friendly',
    name: 'Convivial Clinique',
    description: 'Atmosphère chaleureuse et rassurante',
    category: 'medical',
    features: ['Couleurs apaisantes', 'Témoignages patients', 'Plan d\'accès', 'FAQ intégrée'],
    preview: '/api/placeholder/400/300',
    isPremium: false,
    rating: 4.5,
    usageCount: 789
  }
];

const categoryColors = {
  modern: 'bg-blue-100 text-blue-700',
  classic: 'bg-amber-100 text-amber-700',
  minimal: 'bg-gray-100 text-gray-700',
  medical: 'bg-green-100 text-green-700'
};

const categoryIcons = {
  modern: Zap,
  classic: Crown,
  minimal: Brush,
  medical: Heart
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choisissez votre Template
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sélectionnez un design qui correspond à votre pratique médicale. 
          Chaque template peut être entièrement personnalisé selon vos besoins.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const CategoryIcon = categoryIcons[template.category];
          const isSelected = selectedTemplate === template.id;
          
          return (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <CategoryIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Aperçu {template.name}</p>
                    </div>
                  </div>
                  
                  {/* Premium Badge */}
                  {template.isPremium && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 left-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={categoryColors[template.category]}>
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {template.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      {template.rating}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Fonctionnalités incluses:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                    <span>{template.usageCount} utilisations</span>
                    {template.isPremium ? (
                      <span className="text-yellow-600 font-medium">Premium</span>
                    ) : (
                      <span className="text-green-600 font-medium">Gratuit</span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full mt-3 ${
                      isSelected 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplateSelect(template.id);
                    }}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Sélectionné
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Choisir ce template
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Conseil:</strong> Vous pourrez personnaliser entièrement votre template 
          après sélection (couleurs, contenus, mise en page, etc.)
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;


import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface TemplateSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTemplate: string;
  onTemplateSelect: (template: string) => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  open,
  onOpenChange,
  currentTemplate,
  onTemplateSelect
}) => {
  const templates = [
    {
      id: 'professional',
      name: 'Professionnel',
      description: 'Template moderne avec dégradé bleu et design professionnel',
      preview: '/api/placeholder/300/200',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'modern',
      name: 'Moderne',
      description: 'Design épuré avec couleurs violettes et roses',
      preview: '/api/placeholder/300/200',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Template simple et clean, idéal pour un style épuré',
      preview: '/api/placeholder/300/200',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 'classic',
      name: 'Classique',
      description: 'Style traditionnel avec bordures et design formel',
      preview: '/api/placeholder/300/200',
      color: 'from-gray-700 to-gray-900'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Choisir un Template</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                currentTemplate === template.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className={`h-32 bg-gradient-to-r ${template.color} rounded-t-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-3 left-3 text-white">
                    <div className="text-lg font-bold">FACTURE</div>
                    <div className="text-xs opacity-80">INV-2024-XXXX</div>
                  </div>
                  {currentTemplate === template.id && (
                    <div className="absolute top-3 right-3 bg-white/20 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    {currentTemplate === template.id && (
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        Sélectionné
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  
                  <Button 
                    className="w-full mt-3" 
                    variant={currentTemplate === template.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplateSelect(template.id);
                    }}
                  >
                    {currentTemplate === template.id ? 'Template Actuel' : 'Sélectionner'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;

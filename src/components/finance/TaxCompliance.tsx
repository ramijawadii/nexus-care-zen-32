
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Download,
  Upload,
  Clock
} from 'lucide-react';

const TaxCompliance = () => {
  const taxObligations = [
    {
      type: 'TVA',
      description: 'Déclaration TVA mensuelle',
      dueDate: '2024-03-20',
      status: 'pending',
      amount: 2850,
      progress: 75
    },
    {
      type: 'IS',
      description: 'Impôt sur les Sociétés',
      dueDate: '2024-05-15',
      status: 'draft',
      amount: 12500,
      progress: 30
    },
    {
      type: 'CFE',
      description: 'Cotisation Foncière des Entreprises',
      dueDate: '2024-12-15',
      status: 'completed',
      amount: 1200,
      progress: 100
    },
    {
      type: 'CVAE',
      description: 'Cotisation sur la Valeur Ajoutée',
      dueDate: '2024-05-15',
      status: 'pending',
      amount: 850,
      progress: 60
    }
  ];

  const complianceChecklist = [
    { item: 'Tenue de comptabilité régulière', completed: true },
    { item: 'Archivage des pièces justificatives', completed: true },
    { item: 'Déclarations sociales à jour', completed: false },
    { item: 'Registres obligatoires tenus', completed: true },
    { item: 'Audit interne réalisé', completed: false },
    { item: 'Sauvegarde des données comptables', completed: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'draft': return <FileText className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Fiscalité & Conformité</h2>
          <p className="text-text-secondary">Gestion des obligations fiscales et réglementaires</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importer Documents
          </Button>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            Calculateur Fiscal
          </Button>
        </div>
      </div>

      {/* Obligations Fiscales */}
      <Card>
        <CardHeader>
          <CardTitle>Obligations Fiscales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxObligations.map((obligation, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(obligation.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{obligation.type}</h4>
                        <Badge className={getStatusColor(obligation.status)}>
                          {obligation.status === 'completed' ? 'Terminé' : 
                           obligation.status === 'pending' ? 'En cours' : 
                           obligation.status === 'draft' ? 'Brouillon' : 'En retard'}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-secondary">{obligation.description}</p>
                      <p className="text-xs text-text-muted">
                        Échéance: {new Date(obligation.dueDate).toLocaleDateString('fr-FR')}
                        {getDaysUntilDue(obligation.dueDate) > 0 && (
                          <span className="ml-2 text-orange-600">
                            (dans {getDaysUntilDue(obligation.dueDate)} jours)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">{obligation.amount.toLocaleString()} €</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Progression:</span>
                    <span className="font-medium">{obligation.progress}%</span>
                  </div>
                  <Progress value={obligation.progress} className="h-2" />
                </div>

                <div className="flex justify-end space-x-2 mt-3">
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Voir Détails
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  {obligation.status !== 'completed' && (
                    <Button size="sm">
                      Finaliser
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist Conformité */}
        <Card>
          <CardHeader>
            <CardTitle>Checklist Conformité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                    )}
                    <span className={`${item.completed ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {item.item}
                    </span>
                  </div>
                  {!item.completed && (
                    <Button variant="outline" size="sm">
                      À faire
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendrier Fiscal */}
        <Card>
          <CardHeader>
            <CardTitle>Calendrier Fiscal 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-orange-800">Mars 2024</h4>
                    <p className="text-sm text-orange-600">Déclaration TVA mensuelle</p>
                  </div>
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-blue-800">Mai 2024</h4>
                    <p className="text-sm text-blue-600">Impôt sur les Sociétés</p>
                  </div>
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-purple-800">Décembre 2024</h4>
                    <p className="text-sm text-purple-600">CFE & taxes foncières</p>
                  </div>
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outils Fiscaux */}
      <Card>
        <CardHeader>
          <CardTitle>Outils d'Expertise Comptable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calculator className="w-8 h-8 text-blue-600" />
              <span className="font-medium">Simulateur IS</span>
              <span className="text-xs text-text-muted">Calcul impôt sociétés</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <FileText className="w-8 h-8 text-green-600" />
              <span className="font-medium">Liasse Fiscale</span>
              <span className="text-xs text-text-muted">Génération automatique</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <span className="font-medium">Alertes Fiscales</span>
              <span className="text-xs text-text-muted">Notifications échéances</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Download className="w-8 h-8 text-purple-600" />
              <span className="font-medium">Dossier Fiscal</span>
              <span className="text-xs text-text-muted">Export complet</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCompliance;

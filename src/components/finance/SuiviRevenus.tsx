
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users,
  Stethoscope,
  Monitor,
  Activity,
  TrendingUp,
  Calendar,
  BarChart3,
  Target,
  UserCheck,
  UserPlus
} from 'lucide-react';

const SuiviRevenus = () => {
  const revenusParType = [
    {
      type: 'Consultations Standards',
      montant: 68400,
      nombre: 1140,
      prixMoyen: 60,
      evolution: '+8.5%',
      pourcentage: 47.1,
      icon: Stethoscope,
      couleur: 'text-blue-600'
    },
    {
      type: 'Actes Spécialisés',
      montant: 42800,
      nombre: 214,
      prixMoyen: 200,
      evolution: '+15.2%',
      pourcentage: 29.5,
      icon: Activity,
      couleur: 'text-green-600'
    },
    {
      type: 'Téléconsultations',
      montant: 18700,
      nombre: 374,
      prixMoyen: 50,
      evolution: '+22.8%',
      pourcentage: 12.9,
      icon: Monitor,
      couleur: 'text-purple-600'
    },
    {
      type: 'Examens & Tests',
      montant: 15350,
      nombre: 128,
      prixMoyen: 120,
      evolution: '+5.1%',
      pourcentage: 10.5,
      icon: Target,
      couleur: 'text-orange-600'
    }
  ];

  const revenusParPraticien = [
    {
      praticien: 'Dr. Sarah Martin',
      specialite: 'Médecine générale',
      caTotal: 89400,
      nbConsultations: 1248,
      caMoyen: 71.6,
      croissance: '+12.3%',
      performance: 'excellente'
    },
    {
      praticien: 'Dr. Jean Dubois',
      specialite: 'Cardiologie',
      caTotal: 45200,
      nbConsultations: 226,
      caMoyen: 200,
      croissance: '+8.7%',
      performance: 'bonne'
    },
    {
      praticien: 'Dr. Marie Leroy',
      specialite: 'Dermatologie',
      caTotal: 10650,
      nbConsultations: 71,
      caMoyen: 150,
      croissance: '+18.4%',
      performance: 'excellente'
    }
  ];

  const analysePatientsRecurrentsMouveaux = [
    {
      categorie: 'Patients Récurrents',
      nombre: 892,
      caGenere: 102400,
      caMoyen: 114.8,
      pourcentageCA: 70.5,
      evolutionNombre: '+5.2%',
      evolutionCA: '+8.1%'
    },
    {
      categorie: 'Nouveaux Patients',
      nombre: 267,
      caGenere: 42850,
      caMoyen: 160.5,
      pourcentageCA: 29.5,
      evolutionNombre: '+15.8%',
      evolutionCA: '+22.3%'
    }
  ];

  const revenusParCanal = [
    {
      canal: 'Consultation physique',
      montant: 118600,
      sessions: 1482,
      pourcentage: 81.7,
      tendance: 'stable'
    },
    {
      canal: 'Téléconsultation',
      montant: 18700,
      sessions: 374,
      pourcentage: 12.9,
      tendance: 'croissance'
    },
    {
      canal: 'Visite à domicile',
      montant: 7950,
      sessions: 53,
      pourcentage: 5.4,
      tendance: 'stable'
    }
  ];

  const actesLesPlusRentables = [
    { acte: 'Consultation cardiologie', prix: 200, frequence: 226, ca: 45200, rentabilite: 'Très élevée' },
    { acte: 'Échographie abdominale', prix: 120, frequence: 89, ca: 10680, rentabilite: 'Élevée' },
    { acte: 'Consultation dermatologie', prix: 150, frequence: 71, ca: 10650, rentabilite: 'Élevée' },
    { acte: 'Consultation générale', prix: 60, frequence: 1140, ca: 68400, rentabilite: 'Moyenne' },
    { acte: 'Téléconsultation', prix: 50, frequence: 374, ca: 18700, rentabilite: 'Moyenne' }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellente': return 'bg-green-100 text-green-800';
      case 'bonne': return 'bg-blue-100 text-blue-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRentabiliteColor = (rentabilite: string) => {
    switch (rentabilite) {
      case 'Très élevée': return 'text-green-600';
      case 'Élevée': return 'text-blue-600';
      case 'Moyenne': return 'text-orange-600';
      case 'Faible': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Suivi par Sources de Revenus</h2>
          <p className="text-text-secondary">Analyse détaillée des revenus par prestations et praticiens</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyse Comparative
          </Button>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Rapport Revenus
          </Button>
        </div>
      </div>

      {/* CA par Type de Prestation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Chiffre d'Affaires par Type de Prestation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {revenusParType.map((revenue) => (
              <div key={revenue.type} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <revenue.icon className={`w-6 h-6 ${revenue.couleur}`} />
                  <Badge variant="outline" className="text-green-600">
                    {revenue.evolution}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-text-primary mb-2">{revenue.type}</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">CA Total:</span>
                    <span className={`font-bold ${revenue.couleur}`}>
                      {revenue.montant.toLocaleString()} €
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Nombre:</span>
                    <span className="font-semibold">{revenue.nombre}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Prix moyen:</span>
                    <span className="font-semibold">{revenue.prixMoyen} €</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Part du CA:</span>
                      <span>{revenue.pourcentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${revenue.pourcentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CA par Praticien */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            Performance par Praticien
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenusParPraticien.map((praticien, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-text-primary">{praticien.praticien}</h4>
                    <p className="text-sm text-text-secondary">{praticien.specialite}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPerformanceColor(praticien.performance)}>
                      {praticien.performance}
                    </Badge>
                    <Badge variant="outline" className="text-green-600">
                      {praticien.croissance}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary">CA Total</p>
                    <p className="text-xl font-bold text-green-600">
                      {praticien.caTotal.toLocaleString()} €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Consultations</p>
                    <p className="text-xl font-bold text-blue-600">
                      {praticien.nbConsultations}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">CA Moyen</p>
                    <p className="text-xl font-bold text-purple-600">
                      {praticien.caMoyen.toFixed(1)} €
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patients Récurrents vs Nouveaux */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-purple-600" />
              Analyse Patients Récurrents vs Nouveaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysePatientsRecurrentsMouveaux.map((segment, index) => (
                <div key={index} className="p-4 border border-border-primary rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-text-primary">{segment.categorie}</h4>
                    <div className="flex items-center space-x-1">
                      {segment.categorie === 'Patients Récurrents' ? 
                        <UserCheck className="w-4 h-4 text-blue-600" /> :
                        <UserPlus className="w-4 h-4 text-green-600" />
                      }
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-text-secondary">Nombre</p>
                      <p className="text-lg font-bold text-text-primary">{segment.nombre}</p>
                      <p className="text-xs text-green-600">{segment.evolutionNombre}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">CA Généré</p>
                      <p className="text-lg font-bold text-blue-600">
                        {segment.caGenere.toLocaleString()} €
                      </p>
                      <p className="text-xs text-green-600">{segment.evolutionCA}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>CA Moyen: {segment.caMoyen.toFixed(1)} €</span>
                    <span>Part du CA: {segment.pourcentageCA}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CA par Canal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="w-5 h-5 mr-2 text-indigo-600" />
              Revenus par Canal de Consultation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenusParCanal.map((canal, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      {canal.canal === 'Téléconsultation' ? 
                        <Monitor className="w-4 h-4 text-blue-600" /> :
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                      }
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{canal.canal}</h4>
                      <p className="text-sm text-text-secondary">
                        {canal.sessions} sessions
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">
                      {canal.montant.toLocaleString()} €
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">{canal.pourcentage}%</span>
                      <Badge variant="outline" className={
                        canal.tendance === 'croissance' ? 'text-green-600' : 'text-blue-600'
                      }>
                        {canal.tendance}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actes les Plus Rentables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-600" />
            Analyse des Actes les Plus Rentables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-primary">
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Acte Médical</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">Prix Unitaire</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">Fréquence</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">CA Total</th>
                  <th className="text-center py-3 px-4 font-medium text-text-primary">Rentabilité</th>
                </tr>
              </thead>
              <tbody>
                {actesLesPlusRentables.map((acte, index) => (
                  <tr key={index} className="border-b border-border-primary/50">
                    <td className="py-3 px-4 font-medium text-text-primary">{acte.acte}</td>
                    <td className="py-3 px-4 text-right font-semibold">{acte.prix} €</td>
                    <td className="py-3 px-4 text-right">{acte.frequence}</td>
                    <td className="py-3 px-4 text-right font-semibold text-blue-600">
                      {acte.ca.toLocaleString()} €
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${getRentabiliteColor(acte.rentabilite)}`}>
                        {acte.rentabilite}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuiviRevenus;

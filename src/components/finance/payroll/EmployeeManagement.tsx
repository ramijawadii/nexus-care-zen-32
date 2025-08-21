
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  UserPlus,
  Search,
  Edit,
  Trash2,
  FileText,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 'EMP-001',
      nom: 'Dr. Sarah Johnson',
      prenom: 'Sarah',
      fonction: 'Médecin',
      typeContrat: 'CDI',
      dateDebut: '2020-01-15',
      salaireBase: 4200,
      statut: 'actif',
      telephone: '+33 6 12 34 56 78',
      email: 'sarah.johnson@cabinet.fr',
      cin: 'AB123456',
      cnss: '123456789',
      rib: 'FR76 1234 5678 9012 3456 789'
    },
    {
      id: 'EMP-002',
      nom: 'Maria Rodriguez',
      prenom: 'Maria',
      fonction: 'Infirmière',
      typeContrat: 'CDI',
      dateDebut: '2021-03-10',
      salaireBase: 2100,
      statut: 'actif',
      telephone: '+33 6 98 76 54 32',
      email: 'maria.rodriguez@cabinet.fr',
      cin: 'CD789012',
      cnss: '987654321',
      rib: 'FR76 9876 5432 1098 7654 321'
    },
    {
      id: 'EMP-003',
      nom: 'Jean Dupont',
      prenom: 'Jean',
      fonction: 'Secrétaire',
      typeContrat: 'CDD',
      dateDebut: '2023-06-01',
      salaireBase: 1400,
      statut: 'actif',
      telephone: '+33 6 55 44 33 22',
      email: 'jean.dupont@cabinet.fr',
      cin: 'EF345678',
      cnss: '456789123',
      rib: 'FR76 4567 8912 3456 7891 234'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'inactif': return 'bg-red-100 text-red-800';
      case 'congé': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractColor = (type: string) => {
    switch (type) {
      case 'CDI': return 'bg-blue-100 text-blue-800';
      case 'CDD': return 'bg-purple-100 text-purple-800';
      case 'Freelance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.fonction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter Employé
        </Button>
      </div>

      {/* Employee List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <UserPlus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {employee.nom}
                      </h3>
                      <Badge className={getStatusColor(employee.statut)}>
                        {employee.statut}
                      </Badge>
                      <Badge className={getContractColor(employee.typeContrat)}>
                        {employee.typeContrat}
                      </Badge>
                    </div>
                    <p className="text-text-secondary">{employee.fonction} • {employee.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-text-primary">Informations Personnelles</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-text-muted" />
                      <span>{employee.telephone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-text-muted" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-text-muted" />
                      <span>CIN: {employee.cin}</span>
                    </div>
                  </div>
                </div>

                {/* Contract Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-text-primary">Informations Contrat</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-text-muted" />
                      <span>Début: {new Date(employee.dateDebut).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-text-muted" />
                      <span>Salaire: {employee.salaireBase.toLocaleString()} €</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-text-muted" />
                      <span>CNSS: {employee.cnss}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-text-primary">Informations Paiement</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-text-muted" />
                      <span className="truncate">RIB: {employee.rib}</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Historique Paie
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <UserPlus className="w-6 h-6 mb-2" />
              Nouvel Employé
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Import CSV
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              Gestion Congés
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="w-6 h-6 mb-2" />
              Avances Salaire
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeManagement;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users,
  UserPlus,
  Shield,
  Key,
  Settings,
  Eye,
  Edit,
  Trash2,
  Mail
} from 'lucide-react';
import { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@cabinet.fr',
      role: 'Médecin',
      status: 'active',
      lastLogin: '2024-02-15 14:30',
      permissions: ['patients', 'appointments', 'reports']
    },
    {
      id: 2,
      name: 'Marie Dubois',
      email: 'marie.dubois@cabinet.fr',
      role: 'Secrétaire',
      status: 'active',
      lastLogin: '2024-02-15 16:45',
      permissions: ['appointments', 'patients-read']
    },
    {
      id: 3,
      name: 'Jean Martin',
      email: 'jean.martin@cabinet.fr',
      role: 'Administrateur',
      status: 'active',
      lastLogin: '2024-02-15 09:15',
      permissions: ['all']
    }
  ]);

  const roles = [
    {
      name: 'Administrateur',
      permissions: ['Accès total', 'Gestion utilisateurs', 'Configuration système'],
      color: 'bg-red-100 text-red-800'
    },
    {
      name: 'Médecin',
      permissions: ['Patients', 'Rendez-vous', 'Dossiers médicaux', 'Prescriptions'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Secrétaire',
      permissions: ['Rendez-vous', 'Patients (lecture)', 'Communication'],
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Comptable',
      permissions: ['Finance', 'Facturation', 'Rapports', 'Paie'],
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* User List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Gestion des Utilisateurs
            </CardTitle>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel Utilisateur
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière Connexion</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-text-muted">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.lastLogin}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Roles Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Gestion des Rôles & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={role.color}>{role.name}</Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {role.permissions.map((permission) => (
                    <div key={permission} className="text-sm text-text-secondary">
                      • {permission}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2 text-purple-600" />
            Paramètres de Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Authentification à deux facteurs</h4>
                <p className="text-sm text-text-muted">Obligatoire pour tous les utilisateurs</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Expiration des mots de passe</h4>
                <p className="text-sm text-text-muted">Changement obligatoire tous les 90 jours</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-3 border border-border-primary rounded-lg">
              <label className="block text-sm font-medium mb-2">Tentatives de connexion max</label>
              <Input type="number" defaultValue="5" className="w-32" />
            </div>

            <div className="p-3 border border-border-primary rounded-lg">
              <label className="block text-sm font-medium mb-2">Durée de verrouillage (minutes)</label>
              <Input type="number" defaultValue="30" className="w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-orange-600" />
            Configuration Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Serveur SMTP</label>
              <Input placeholder="smtp.gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Port</label>
              <Input placeholder="587" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email expéditeur</label>
              <Input placeholder="noreply@cabinet.fr" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nom expéditeur</label>
              <Input placeholder="Cabinet Médical" />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <span className="text-sm">SSL/TLS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <span className="text-sm">Authentification requise</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Key,
  Archive
} from 'lucide-react';

const PayrollSecurity = () => {
  const securitySettings = [
    {
      id: 'data-encryption',
      title: 'Chiffrement des Données',
      description: 'Chiffrement AES-256 des données personnelles',
      enabled: true,
      level: 'Critique'
    },
    {
      id: 'access-control',
      title: 'Contrôle d\'Accès',
      description: 'Limitation d\'accès basée sur les rôles',
      enabled: true,
      level: 'Élevé'
    },
    {
      id: 'audit-trail',
      title: 'Journal d\'Audit',
      description: 'Traçabilité complète des actions',
      enabled: true,
      level: 'Élevé'
    },
    {
      id: 'auto-backup',
      title: 'Sauvegarde Automatique',
      description: 'Sauvegarde quotidienne chiffrée',
      enabled: true,
      level: 'Critique'
    }
  ];

  const userPermissions = [
    {
      role: 'Administrateur',
      users: ['admin@cabinet.fr'],
      permissions: ['Lecture', 'Écriture', 'Suppression', 'Configuration'],
      color: 'bg-red-100 text-red-800'
    },
    {
      role: 'Responsable RH',
      users: ['rh@cabinet.fr'],
      permissions: ['Lecture', 'Écriture', 'Rapports'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      role: 'Comptable',
      users: ['comptable@cabinet.fr'],
      permissions: ['Lecture', 'Rapports', 'Export'],
      color: 'bg-green-100 text-green-800'
    },
    {
      role: 'Secrétaire',
      users: ['secretaire@cabinet.fr'],
      permissions: ['Lecture limitée'],
      color: 'bg-gray-100 text-gray-800'
    }
  ];

  const complianceItems = [
    {
      item: 'Archivage Bulletins de Paie',
      requirement: '5 ans minimum (Code du travail)',
      status: 'conforme',
      lastCheck: '2024-02-01'
    },
    {
      item: 'Protection Données Personnelles',
      requirement: 'RGPD - Consentement explicite',
      status: 'conforme',
      lastCheck: '2024-02-01'
    },
    {
      item: 'Déclarations Sociales',
      requirement: 'CNSS - Délais légaux respectés',
      status: 'conforme',
      lastCheck: '2024-02-15'
    },
    {
      item: 'Sauvegarde Sécurisée',
      requirement: 'Chiffrement + Localisation UE',
      status: 'conforme',
      lastCheck: '2024-02-15'
    }
  ];

  const auditLog = [
    {
      date: '2024-02-15 14:30',
      user: 'rh@cabinet.fr',
      action: 'Consultation bulletin - EMP-001',
      result: 'Succès'
    },
    {
      date: '2024-02-15 10:15',
      user: 'admin@cabinet.fr',
      action: 'Modification salaire - EMP-003',
      result: 'Succès'
    },
    {
      date: '2024-02-14 16:45',
      user: 'comptable@cabinet.fr',
      action: 'Export rapport paie - Janvier',
      result: 'Succès'
    },
    {
      date: '2024-02-14 09:30',
      user: 'secretaire@cabinet.fr',
      action: 'Tentative accès non autorisé',
      result: 'Bloqué'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Critique': return 'bg-red-100 text-red-800';
      case 'Élevé': return 'bg-orange-100 text-orange-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conforme': return 'bg-green-100 text-green-800';
      case 'attention': return 'bg-orange-100 text-orange-800';
      case 'non-conforme': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Succès': return 'text-green-600';
      case 'Bloqué': return 'text-red-600';
      case 'Échec': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Paramètres de Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securitySettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">{setting.title}</h4>
                    <Badge className={getLevelColor(setting.level)}>
                      {setting.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{setting.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch checked={setting.enabled} />
                  {setting.enabled && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            Contrôle d'Accès & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userPermissions.map((permission) => (
              <div key={permission.role} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={permission.color}>
                      {permission.role}
                    </Badge>
                    <span className="text-sm text-text-secondary">
                      {permission.users.length} utilisateur(s)
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {permission.permissions.map((perm) => (
                      <Badge key={perm} variant="outline" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-text-muted">
                    Utilisateurs: {permission.users.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-600" />
            Conformité & Obligations Légales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">{item.item}</h4>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'conforme' ? 'Conforme' : 'Attention'}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary mb-1">{item.requirement}</p>
                  <p className="text-xs text-text-muted">Dernière vérification: {item.lastCheck}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {item.status === 'conforme' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  )}
                  <Button variant="ghost" size="sm">
                    Vérifier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-orange-600" />
              Journal d'Audit
            </CardTitle>
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Export Complet
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLog.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{log.action}</p>
                    <p className="text-xs text-text-muted">{log.user} • {log.date}</p>
                  </div>
                </div>
                <Badge className={`${getResultColor(log.result)} bg-transparent border-0`}>
                  {log.result}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions de Sécurité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Lock className="w-6 h-6 mb-2" />
              Verrouillage Urgence
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Archive className="w-6 h-6 mb-2" />
              Sauvegarde Manuelle
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Eye className="w-6 h-6 mb-2" />
              Audit Complet
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Rapport Conformité
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollSecurity;

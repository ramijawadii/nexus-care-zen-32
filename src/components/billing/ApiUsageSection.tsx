
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, Key, Copy, Plus, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ApiUsageSection = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showRequestHistory, setShowRequestHistory] = useState(false);

  // Mock data
  const monthlyUsage = {
    tokensUsed: 75000,
    tokenQuota: 100000,
    overageTokens: 0,
    overageCost: 0,
    overageRate: 0.05 // DT per 1K tokens
  };

  const apiKeys = [
    {
      id: '1',
      name: 'Production Key',
      key: 'sk-abc123...xyz789',
      lastUsed: '2025-01-14 14:30',
      limit: '10K/hour'
    }
  ];

  const requestHistory = [
    {
      timestamp: '2025-01-14 14:30:25',
      endpoint: '/api/chat/completions',
      tokensUsed: 245,
      cost: '0.012 DT'
    },
    {
      timestamp: '2025-01-14 14:28:10',
      endpoint: '/api/embeddings',
      tokensUsed: 156,
      cost: '0.008 DT'
    },
    {
      timestamp: '2025-01-14 14:25:45',
      endpoint: '/api/chat/completions',
      tokensUsed: 389,
      cost: '0.019 DT'
    }
  ];

  const usagePercentage = (monthlyUsage.tokensUsed / monthlyUsage.tokenQuota) * 100;

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Clé API copiée",
      description: "La clé API a été copiée dans le presse-papiers",
    });
  };

  const handleRegenerateKey = () => {
    toast({
      title: "Clé API régénérée",
      description: "Une nouvelle clé API a été générée",
    });
  };

  return (
    <div className="space-y-6">
      {/* Monthly Token Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Utilisation Mensuelle des Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-elevated p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Tokens Utilisés</p>
              <p className="text-2xl font-bold text-primary">{monthlyUsage.tokensUsed.toLocaleString()}</p>
            </div>
            <div className="bg-surface-elevated p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Quota Mensuel</p>
              <p className="text-2xl font-bold">{monthlyUsage.tokenQuota.toLocaleString()}</p>
            </div>
            <div className="bg-surface-elevated p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Tokens Restants</p>
              <p className="text-2xl font-bold text-green-600">
                {(monthlyUsage.tokenQuota - monthlyUsage.tokensUsed).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Utilisation ce mois</span>
              <span>{usagePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={usagePercentage} className="h-3" />
          </div>

          {monthlyUsage.overageTokens > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-800">Dépassement Détecté</h4>
              <p className="text-sm text-orange-700 mt-1">
                {monthlyUsage.overageTokens.toLocaleString()} tokens supplémentaires utilisés
              </p>
              <p className="text-sm text-orange-700">
                Coût du dépassement: <span className="font-medium">{monthlyUsage.overageCost} DT</span>
                <span className="text-xs ml-1">({monthlyUsage.overageRate} DT par 1K tokens)</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Gestion des Clés API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{apiKey.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>Dernière utilisation: {apiKey.lastUsed}</span>
                    <Badge variant="outline">Limite: {apiKey.limit}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleRegenerateKey()}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <code className="bg-muted px-3 py-2 rounded text-sm font-mono flex-1">
                  {showApiKey ? apiKey.key : '•'.repeat(20)}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyApiKey(apiKey.key)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Créer une Nouvelle Clé API
          </Button>
        </CardContent>
      </Card>

      {/* Request History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historique des Requêtes</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRequestHistory(!showRequestHistory)}
            >
              {showRequestHistory ? 'Masquer' : 'Afficher'} l'Historique
            </Button>
          </div>
        </CardHeader>
        {showRequestHistory && (
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horodatage</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Tokens Utilisés</TableHead>
                    <TableHead>Coût</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requestHistory.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{request.timestamp}</TableCell>
                      <TableCell className="font-mono text-sm">{request.endpoint}</TableCell>
                      <TableCell>{request.tokensUsed.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">{request.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ApiUsageSection;


import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '../components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Clock,
  UserPlus,
  Activity,
  Download,
  Filter,
  Eye,
  AlertCircle
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock data for charts
  const appointmentData = [
    { day: 'Lun', appointments: 12, revenue: 1200 },
    { day: 'Mar', appointments: 15, revenue: 1500 },
    { day: 'Mer', appointments: 8, revenue: 800 },
    { day: 'Jeu', appointments: 18, revenue: 1800 },
    { day: 'Ven', appointments: 14, revenue: 1400 },
    { day: 'Sam', appointments: 6, revenue: 600 },
    { day: 'Dim', appointments: 3, revenue: 300 }
  ];

  const appointmentTypes = [
    { name: 'Consultation', value: 45, color: '#3B82F6' },
    { name: 'Suivi', value: 30, color: '#10B981' },
    { name: 'En ligne', value: 15, color: '#F59E0B' },
    { name: 'Urgence', value: 10, color: '#EF4444' }
  ];

  const ageGroups = [
    { range: '0-18', patients: 25 },
    { range: '19-35', patients: 45 },
    { range: '36-50', patients: 38 },
    { range: '51-65', patients: 32 },
    { range: '65+', patients: 28 }
  ];

  const commonDiagnoses = [
    { diagnosis: 'Hypertension', count: 45, percentage: 25 },
    { diagnosis: 'Diabète Type 2', count: 32, percentage: 18 },
    { diagnosis: 'Rhume', count: 28, percentage: 16 },
    { diagnosis: 'Mal de Dos', count: 24, percentage: 13 },
    { diagnosis: 'Anxiété', count: 21, percentage: 12 }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <SidebarInset>
          <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-text-primary">Tableau de Bord Analytique du Médecin</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Exporter
              </Button>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-text-muted">Total Rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <div className="text-2xl font-bold text-text-primary">76</div>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+12% vs semaine dernière</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-text-muted">Taux d'Absence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <div className="text-2xl font-bold text-text-primary">8,5%</div>
                  </div>
                  <Progress value={8.5} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-text-muted">Consultation Moyenne</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <div className="text-2xl font-bold text-text-primary">28min</div>
                  </div>
                  <span className="text-xs text-text-muted">2min de moins que l'objectif</span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-text-muted">Revenus Hebdomadaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <div className="text-2xl font-bold text-text-primary">7 600€</div>
                  </div>
                  <span className="text-xs text-green-500">+800€ vs semaine dernière</span>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appointment Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Tendances Rendez-vous Hebdomadaires</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={appointmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="appointments" stroke="#3B82F6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Appointment Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Types de Rendez-vous</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appointmentTypes}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {appointmentTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {appointmentTypes.map((type) => (
                      <div key={type.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                        <span className="text-xs text-text-muted">{type.name} ({type.value}%)</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Groupes d'Âge des Patients</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageGroups}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="patients" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Patient Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Aperçu des Patients</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Nouveaux Patients</span>
                    <Badge variant="secondary">+12 ce mois</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Patients de Retour</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Ratio Femmes/Hommes</span>
                    <span className="text-sm font-medium">58% / 42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Âge Moyen</span>
                    <span className="text-sm font-medium">45 ans</span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Insights IA Copilote</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">📅 Considérez ouvrir plus de créneaux le lundi (forte demande)</p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">⚠️ 5 patients à haut risque d'absence - envoyer rappels</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">✅ Les revenus sont 15% au-dessus de l'objectif ce mois</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Common Diagnoses & Financial Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Diagnostics les Plus Fréquents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {commonDiagnoses.map((item, index) => (
                      <div key={item.diagnosis} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.diagnosis}</span>
                            <span className="text-sm text-text-muted">{item.count} cas</span>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aperçu Financier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">32 450€</div>
                      <div className="text-sm text-green-700">Revenus Mensuels</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">427€</div>
                      <div className="text-sm text-blue-700">Moy. par Rendez-vous</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">2 100€</div>
                      <div className="text-sm text-orange-700">En Attente</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">85%</div>
                      <div className="text-sm text-purple-700">Taux de Recouvrement</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carte de Crédit</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Assurance</span>
                      <span>35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Espèces</span>
                      <span>20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;

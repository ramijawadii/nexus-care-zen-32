
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppSidebar from '../components/AppSidebar';
import GeneralSettings from '../components/settings/GeneralSettings';
import UserManagement from '../components/settings/UserManagement';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import MedicalSettings from '../components/settings/MedicalSettings';
import BillingSettings from '../components/settings/BillingSettings';
import AppointmentSettings from '../components/settings/AppointmentSettings';
import ReportsSettings from '../components/settings/ReportsSettings';
import SystemSettings from '../components/settings/SystemSettings';
import EmployeeSettings from '../components/employee-management/EmployeeSettings';
import PayrollSettings from '../components/finance/payroll/PayrollSettings';
import PayrollAutomation from '../components/finance/payroll/PayrollAutomation';
import PayrollSecurity from '../components/finance/payroll/PayrollSecurity';
import { 
  Building2,
  Users,
  Stethoscope,
  Zap,
  DollarSign,
  Shield,
  Bot,
  Calendar,
  FileText,
  CreditCard,
  UserCheck,
  Database
} from 'lucide-react';

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-text-primary">Paramètres</h1>
            </div>
          </header>

          <ScrollArea className="h-[calc(100vh-4rem)]">
            <main className="p-6">
              <Tabs defaultValue="general" className="space-y-6">
                <div className="overflow-x-auto">
                  <TabsList className="grid w-full grid-cols-12 bg-gray-100 min-w-[800px]">
                    <TabsTrigger value="general" className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4" />
                      <span className="hidden md:inline">Général</span>
                    </TabsTrigger>
                    <TabsTrigger value="users" className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="hidden md:inline">Utilisateurs</span>
                    </TabsTrigger>
                    <TabsTrigger value="medical" className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4" />
                      <span className="hidden md:inline">Médical</span>
                    </TabsTrigger>
                    <TabsTrigger value="employees" className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4" />
                      <span className="hidden md:inline">Employés</span>
                    </TabsTrigger>
                    <TabsTrigger value="appointments" className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="hidden md:inline">RDV</span>
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="hidden md:inline">Facturation</span>
                    </TabsTrigger>
                    <TabsTrigger value="payroll" className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="hidden md:inline">Paie</span>
                    </TabsTrigger>
                    <TabsTrigger value="automation" className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <span className="hidden md:inline">Automation</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span className="hidden md:inline">Sécurité</span>
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span className="hidden md:inline">Rapports</span>
                    </TabsTrigger>
                    <TabsTrigger value="system" className="flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span className="hidden md:inline">Système</span>
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span className="hidden md:inline">Intégrations</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="general" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <GeneralSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="users" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <UserManagement />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="medical" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <MedicalSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="employees" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <EmployeeSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="appointments" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <AppointmentSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <BillingSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="payroll" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <PayrollSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="automation" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <PayrollAutomation />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <PayrollSecurity />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <ReportsSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="system" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <SystemSettings />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="integrations" className="space-y-6">
                  <ScrollArea className="h-[600px]">
                    <IntegrationSettings />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Settings;

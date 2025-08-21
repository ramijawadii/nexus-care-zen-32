
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppSidebar from '../components/AppSidebar';
import GeneralSettings from '../components/settings/GeneralSettings';
import UserManagement from '../components/settings/UserManagement';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import MedicalSettings from '../components/settings/MedicalSettings';
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
  Bot
} from 'lucide-react';

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <SidebarInset>
          <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-text-primary">Paramètres</h1>
            </div>
          </header>

          <main className="p-6">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 bg-gray-100">
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
                <TabsTrigger value="integrations" className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="hidden md:inline">Intégrations</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>

              <TabsContent value="users">
                <UserManagement />
              </TabsContent>

              <TabsContent value="medical">
                <MedicalSettings />
              </TabsContent>

              <TabsContent value="payroll">
                <PayrollSettings />
              </TabsContent>

              <TabsContent value="automation">
                <PayrollAutomation />
              </TabsContent>

              <TabsContent value="security">
                <PayrollSecurity />
              </TabsContent>

              <TabsContent value="integrations">
                <IntegrationSettings />
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Settings;

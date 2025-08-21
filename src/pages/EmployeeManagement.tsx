
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '../components/AppSidebar';
import EmployeeManagementMain from '../components/employee-management/EmployeeManagementMain';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const EmployeeManagement = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Gestion des Employés</h1>
              </div>
            </header>

            <main className="p-6">
              <EmployeeManagementMain />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default EmployeeManagement;


import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '../components/AppSidebar';
import GlobalChatbot from '../components/shared/GlobalChatbot';
import { FileText, Plus } from 'lucide-react';

const Records = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Records</h1>
              </div>
              
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Record</span>
              </button>
            </header>

            <main className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">Medical Records</h2>
                  <p className="text-text-muted">View and manage patient medical records</p>
                </div>
              </div>

              <div className="bg-surface-elevated rounded-lg border border-border-primary p-8 text-center">
                <FileText className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No records found</h3>
                <p className="text-text-muted">Start by adding a medical record</p>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default Records;

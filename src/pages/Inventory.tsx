
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import MedicalInventory from '@/components/copilot/MedicalInventory';
import GlobalChatbot from '@/components/shared/GlobalChatbot';

const Inventory = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <div className="p-6 h-screen">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-text-primary">Inventaire Médical</h1>
                <p className="text-text-muted">
                  Gestion complète des stocks, médicaments et équipements médicaux
                </p>
              </div>
              
              <div className="h-[calc(100vh-140px)]">
                <MedicalInventory />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default Inventory;

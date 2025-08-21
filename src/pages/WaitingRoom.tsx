
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '../components/AppSidebar';
import WaitingRoomDashboard from '../components/waiting-room/WaitingRoomDashboard';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const WaitingRoom = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Salle d'attente</h1>
              </div>
            </header>

            <main className="p-6">
              <WaitingRoomDashboard />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default WaitingRoom;

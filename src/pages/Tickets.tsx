
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppSidebar from '../components/AppSidebar';
import TicketSupport from '../components/settings/TicketSupport';

const Tickets = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-text-primary">Support & Tickets</h1>
            </div>
          </header>

          <ScrollArea className="h-[calc(100vh-4rem)]">
            <main className="p-6">
              <TicketSupport />
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Tickets;

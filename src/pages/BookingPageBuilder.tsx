
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '../components/AppSidebar';
import BookingPageBuilderComponent from '../components/booking-page-builder/BookingPageBuilder';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const BookingPageBuilder = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Page de Réservation</h1>
              </div>
            </header>

            <main className="flex-1 h-[calc(100vh-64px)]">
              <BookingPageBuilderComponent />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default BookingPageBuilder;

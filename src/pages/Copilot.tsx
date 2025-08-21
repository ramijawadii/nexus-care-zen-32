
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import CopilotAssistant from '@/components/copilot/CopilotAssistant';
import GlobalChatbot from '@/components/shared/GlobalChatbot';
import { Brain, Sparkles } from 'lucide-react';

const Copilot = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <div className="flex flex-col h-screen">
              {/* Enhanced Header */}
              <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      Assistant Copilote IA
                      <Sparkles className="w-5 h-5 text-purple-500" />
                    </h1>
                    <p className="text-gray-600 text-sm">
                      Votre assistant médical intelligent pour l'analyse des patients et des documents
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 overflow-hidden">
                <CopilotAssistant />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default Copilot;

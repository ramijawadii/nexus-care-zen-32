
import { useState } from 'react';
import { Search, Bell, Settings, Bot, TrendingUp, Users, Clock, Calendar, Plus } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AppSidebar from './AppSidebar';
import NotificationMegaMenu from './NotificationMegaMenu';
import TodayOverview from './dashboard/TodayOverview';
import WeeklyInsights from './dashboard/WeeklyInsights';
import ExpandedChatbot from './dashboard/ExpandedChatbot';
import QuickActions from './dashboard/QuickActions';
import GlobalChatbot from './shared/GlobalChatbot';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('assistant'); // Initialize with assistant tab
  const [isChatbotExpanding, setIsChatbotExpanding] = useState(true); // Start expanded

  const handleTabChange = (value: string) => {
    if (value === 'assistant' && activeTab !== 'assistant') {
      setIsChatbotExpanding(true);
      setTimeout(() => {
        setActiveTab(value);
      }, 50);
    } else {
      setActiveTab(value);
      setIsChatbotExpanding(value === 'assistant');
    }
  };

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50">
          <AppSidebar />
          
          <SidebarInset>
            {/* Clean Top Header */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Busca No Menu"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <span>👑</span>
                  <span>Go Pro</span>
                </div>
                <NotificationMegaMenu />
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AW</span>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="space-y-6 bg-gray-50 min-h-screen">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between p-6 pb-0">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>

              {/* Enhanced Dashboard Tabs */}
              <div className="px-6">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 p-1 rounded-lg">
                  <TabsTrigger 
                    value="assistant" 
                    className="flex items-center space-x-2 text-gray-600 data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-gray-100 rounded-md transition-all"
                  >
                    <Bot className={`w-4 h-4 transition-all duration-500 ${activeTab === 'assistant' ? 'scale-110 text-blue-400' : ''}`} />
                    <span>Assistant IA</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="today" 
                    className="flex items-center space-x-2 text-gray-600 data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-gray-100 rounded-md transition-all"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Aujourd'hui</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="week" 
                    className="flex items-center space-x-2 text-gray-600 data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-gray-100 rounded-md transition-all"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Cette Semaine</span>
                  </TabsTrigger>
                </TabsList>

                  <TabsContent value="assistant" className="space-y-6 mt-6">
                    <div className={`w-full h-[calc(100vh-200px)] transition-all duration-700 ease-out ${
                      isChatbotExpanding ? 'animate-scale-in' : 'animate-fade-in'
                    }`}>
                      <ExpandedChatbot />
                    </div>
                  </TabsContent>

                  <TabsContent value="today" className="space-y-6 mt-6">
                    <QuickActions />
                    <TodayOverview />
                  </TabsContent>

                  <TabsContent value="week" className="space-y-6 mt-6">
                    <WeeklyInsights />
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      {/* Global Chatbot - only show when not on assistant tab */}
      {activeTab !== 'assistant' && <GlobalChatbot />}
    </>
  );
};

export default Dashboard;

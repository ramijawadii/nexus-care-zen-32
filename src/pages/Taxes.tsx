
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Plus, Download, Calculator } from 'lucide-react';
import AppSidebar from '../components/AppSidebar';
import EnhancedTaxManagement from '../components/taxes/EnhancedTaxManagement';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const Taxes = () => {
  console.log('Taxes page loaded successfully');

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Gestion des Taxes</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Fiscal
                </Button>
                <Button variant="outline" size="sm">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculer TVA
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Transaction
                </Button>
              </div>
            </header>

            <main className="p-6">
              <EnhancedTaxManagement />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default Taxes;

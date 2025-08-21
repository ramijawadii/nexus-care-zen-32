
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator,
  Euro,
  TrendingDown,
  Users,
  Receipt,
  FileText,
  BarChart3,
  Shield
} from 'lucide-react';
import AppSidebar from '../components/AppSidebar';
import CashReceiptsView from '../components/finance/accounting/CashReceiptsView';
import ExpensesView from '../components/finance/accounting/ExpensesView';
import DebtPaymentsView from '../components/finance/accounting/DebtPaymentsView';
import TaxManagementView from '../components/finance/accounting/TaxManagementView';
import InvoiceGenerationView from '../components/finance/accounting/InvoiceGenerationView';
import DashboardOverview from '../components/finance/accounting/DashboardOverview';
import InsuranceRecoveryView from '../components/finance/accounting/InsuranceRecoveryView';
import CollectionsInsuranceView from '../components/comptabilite/CollectionsInsuranceView';
import InvoiceBillingView from '../components/comptabilite/InvoiceBillingView';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const ComptabiliteGenerale = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Comptabilité Générale</h1>
              </div>
            </header>

            <main className="p-6">
              <Tabs defaultValue="dashboard" className="space-y-6">
                {/* Main Navigation Tabs */}
                <div className="w-full overflow-x-auto">
                  <TabsList className="grid w-full grid-cols-9 bg-slate-100 p-1 min-w-fit">
                    <TabsTrigger 
                      value="dashboard" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <BarChart3 className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Tableau de Bord</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="cash-receipts" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <Calculator className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Encaissements</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="expenses" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <TrendingDown className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Dépenses</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="collections-insurance" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <Shield className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Recouvrement & Assurances</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="invoice-billing" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <FileText className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Facturation</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="debts" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <Users className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Créances</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="insurance" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <Shield className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Assurance</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="tax" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <Receipt className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Fiscalité</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="invoicing" 
                      className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
                    >
                      <FileText className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Génération Factures</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="w-full overflow-hidden">
                  <TabsContent value="dashboard" className="max-w-full overflow-hidden">
                    <DashboardOverview />
                  </TabsContent>

                  <TabsContent value="cash-receipts" className="max-w-full overflow-hidden">
                    <CashReceiptsView />
                  </TabsContent>

                  <TabsContent value="expenses" className="max-w-full overflow-hidden">
                    <ExpensesView />
                  </TabsContent>

                  <TabsContent value="collections-insurance" className="max-w-full overflow-hidden">
                    <CollectionsInsuranceView />
                  </TabsContent>

                  <TabsContent value="invoice-billing" className="max-w-full overflow-hidden">
                    <InvoiceBillingView />
                  </TabsContent>

                  <TabsContent value="debts" className="max-w-full overflow-hidden">
                    <DebtPaymentsView />
                  </TabsContent>

                  <TabsContent value="insurance" className="max-w-full overflow-hidden">
                    <InsuranceRecoveryView />
                  </TabsContent>

                  <TabsContent value="tax" className="max-w-full overflow-hidden">
                    <TaxManagementView />
                  </TabsContent>

                  <TabsContent value="invoicing" className="max-w-full overflow-hidden">
                    <InvoiceGenerationView />
                  </TabsContent>
                </div>
              </Tabs>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default ComptabiliteGenerale;

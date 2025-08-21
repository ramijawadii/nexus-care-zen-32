
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Euro, 
  TrendingDown, 
  Users, 
  Receipt,
  FileText,
  BarChart3,
  Shield,
  Calculator
} from 'lucide-react';

// Import existing views
import ClientPaymentsView from './accounting/ClientPaymentsView';
import ExpensesView from './accounting/ExpensesView';
import DebtPaymentsView from './accounting/DebtPaymentsView';
import TaxManagementView from './accounting/TaxManagementView';
import InvoiceGenerationView from './accounting/InvoiceGenerationView';
import DashboardOverview from './accounting/DashboardOverview';
import InsuranceRecoveryView from './accounting/InsuranceRecoveryView';
import CashReceiptsView from './accounting/CashReceiptsView';

const ComptabiliteGenerale = () => {
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary">Comptabilité Générale</h2>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4 w-full">
        {/* Sub Navigation Tabs */}
        <div className="w-full overflow-x-auto">
          <TabsList className="grid w-full grid-cols-8 bg-slate-100 p-1 min-w-fit">
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
              <span className="truncate">Comptabilité</span>
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="flex items-center text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 whitespace-nowrap"
            >
              <Euro className="w-3 h-3 mr-1 flex-shrink-0" />
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
              <span className="truncate">Assurance & Recouvrement</span>
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
              <span className="truncate">Facturation</span>
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

          <TabsContent value="payments" className="max-w-full overflow-hidden">
            <ClientPaymentsView />
          </TabsContent>

          <TabsContent value="expenses" className="max-w-full overflow-hidden">
            <ExpensesView />
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
    </div>
  );
};

export default ComptabiliteGenerale;

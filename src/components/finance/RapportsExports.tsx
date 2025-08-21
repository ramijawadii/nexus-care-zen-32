
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  TrendingUp, 
  Brain,
  PieChart,
  DollarSign
} from 'lucide-react';

// Import the updated report components
import IncomeStatement from './reports/IncomeStatement';
import BalanceSheet from './reports/BalanceSheet';
import CashFlowStatement from './reports/CashFlowStatement';
import ComparativeAnalysis from './reports/ComparativeAnalysis';
import PredictiveAnalysis from './reports/PredictiveAnalysis';

const RapportsExports = () => {
  console.log('RapportsExports component loaded');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Rapports Financiers - Cabinet Médical</h2>
          <p className="text-text-secondary">Analyse complète pour cabinet médical individuel avec employés</p>
        </div>
      </div>

      <Tabs defaultValue="income-statement" className="space-y-4">
        {/* Navigation Tabs */}
        <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1">
          <TabsTrigger 
            value="income-statement" 
            className="flex items-center text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900"
          >
            <FileText className="w-3 h-3 mr-1" />
            Compte de Résultat
          </TabsTrigger>
          <TabsTrigger 
            value="balance-sheet" 
            className="flex items-center text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900"
          >
            <PieChart className="w-3 h-3 mr-1" />
            Bilan Comptable
          </TabsTrigger>
          <TabsTrigger 
            value="cash-flow" 
            className="flex items-center text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900"
          >
            <DollarSign className="w-3 h-3 mr-1" />
            Flux de Trésorerie
          </TabsTrigger>
          <TabsTrigger 
            value="comparative" 
            className="flex items-center text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Analyse Comparative
          </TabsTrigger>
          <TabsTrigger 
            value="predictive" 
            className="flex items-center text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900"
          >
            <Brain className="w-3 h-3 mr-1" />
            Analyse Prédictive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="income-statement">
          <IncomeStatement />
        </TabsContent>

        <TabsContent value="balance-sheet">
          <BalanceSheet />
        </TabsContent>

        <TabsContent value="cash-flow">
          <CashFlowStatement />
        </TabsContent>

        <TabsContent value="comparative">
          <ComparativeAnalysis />
        </TabsContent>

        <TabsContent value="predictive">
          <PredictiveAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RapportsExports;

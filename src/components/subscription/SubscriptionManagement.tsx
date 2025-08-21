
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Users, Receipt } from 'lucide-react';
import SubscriptionPlansView from './SubscriptionPlansView';
import ReferralProgramView from './ReferralProgramView';
import TransactionHistoryView from './TransactionHistoryView';

const SubscriptionManagement = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-text-primary">
          Gestion des Abonnements
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Gérez votre abonnement, parrainez d'autres médecins et consultez votre historique
        </p>
      </div>
      
      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Plans & Abonnements</span>
          </TabsTrigger>
          <TabsTrigger value="referrals" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Programme de Parrainage</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <Receipt className="w-4 h-4" />
            <span>Historique & Factures</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="mt-6">
          <SubscriptionPlansView />
        </TabsContent>
        
        <TabsContent value="referrals" className="mt-6">
          <ReferralProgramView />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <TransactionHistoryView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagement;

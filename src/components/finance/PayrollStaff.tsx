
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users,
  DollarSign,
  Calculator,
  UserPlus,
  FileText,
  Settings,
  Shield,
  TrendingUp
} from 'lucide-react';
import PayrollOverview from './payroll/PayrollOverview';
import EmployeeManagement from './payroll/EmployeeManagement';
import PayrollCalculation from './payroll/PayrollCalculation';
import PayrollAutomation from './payroll/PayrollAutomation';
import PayrollReports from './payroll/PayrollReports';
import PayslipGenerator from './payroll/PayslipGenerator';
import PayrollSettings from './payroll/PayrollSettings';

const PayrollStaff = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Paie & Rémunérations</h2>
          <p className="text-text-secondary">Système de paie complet conforme à la production</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Paie
          </Button>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            Traiter Paie
          </Button>
        </div>
      </div>

      {/* Payroll Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview" className="flex items-center text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Vue d'Ensemble
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center text-xs">
            <Users className="w-3 h-3 mr-1" />
            Employés
          </TabsTrigger>
          <TabsTrigger value="calculation" className="flex items-center text-xs">
            <Calculator className="w-3 h-3 mr-1" />
            Calcul Paie
          </TabsTrigger>
          <TabsTrigger value="payslips" className="flex items-center text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Bulletins
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Automatisation
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Rapports
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PayrollOverview />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeManagement />
        </TabsContent>

        <TabsContent value="calculation">
          <PayrollCalculation />
        </TabsContent>

        <TabsContent value="payslips">
          <PayslipGenerator />
        </TabsContent>

        <TabsContent value="automation">
          <PayrollAutomation />
        </TabsContent>

        <TabsContent value="reports">
          <PayrollReports />
        </TabsContent>

        <TabsContent value="settings">
          <PayrollSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollStaff;

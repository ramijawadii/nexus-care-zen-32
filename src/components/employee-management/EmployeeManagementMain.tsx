
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users,
  Calendar,
  Clock,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';
import EmployeeOverview from './EmployeeOverview';
import WorkScheduleManagement from './WorkScheduleManagement';
import LeaveManagement from './LeaveManagement';
import AttendanceTracking from './AttendanceTracking';
import EmployeeReports from './EmployeeReports';
import EmployeeSettings from './EmployeeSettings';

const EmployeeManagementMain = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Gestion des Employés</h2>
          <p className="text-text-secondary">Système complet de gestion des employés et ressources humaines</p>
        </div>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center text-xs">
            <Users className="w-3 h-3 mr-1" />
            Vue d'Ensemble
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            Horaires de Travail
          </TabsTrigger>
          <TabsTrigger value="leave" className="flex items-center text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Gestion des Congés
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Suivi de Présence
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center text-xs">
            <BarChart3 className="w-3 h-3 mr-1" />
            Rapports
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <EmployeeOverview />
        </TabsContent>

        <TabsContent value="schedule">
          <WorkScheduleManagement />
        </TabsContent>

        <TabsContent value="leave">
          <LeaveManagement />
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceTracking />
        </TabsContent>

        <TabsContent value="reports">
          <EmployeeReports />
        </TabsContent>

        <TabsContent value="settings">
          <EmployeeSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeManagementMain;

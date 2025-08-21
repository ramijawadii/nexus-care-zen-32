
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, CreditCard, Bell } from 'lucide-react';
import PatientGeneralInfo from './PatientGeneralInfo';
import PatientAppointments from './PatientAppointments';
import PatientBilling from './PatientBilling';
import PatientReminders from './PatientReminders';
import { Patient } from '@/types/patient';

interface PatientViewTabsProps {
  patient: Patient;
}

const PatientViewTabs = ({ patient }: PatientViewTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-blue-50 border border-blue-200">
        <TabsTrigger 
          value="general" 
          className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-blue-600 hover:bg-blue-75"
        >
          <User className="w-4 h-4" />
          <span>Général</span>
        </TabsTrigger>
        <TabsTrigger 
          value="appointments" 
          className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-blue-600 hover:bg-blue-75"
        >
          <Calendar className="w-4 h-4" />
          <span>RDV</span>
        </TabsTrigger>
        <TabsTrigger 
          value="billing" 
          className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-blue-600 hover:bg-blue-75"
        >
          <CreditCard className="w-4 h-4" />
          <span>Facturation</span>
        </TabsTrigger>
        <TabsTrigger 
          value="reminders" 
          className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-blue-600 hover:bg-blue-75"
        >
          <Bell className="w-4 h-4" />
          <span>Rappels</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-6">
        <PatientGeneralInfo patient={patient} />
      </TabsContent>

      <TabsContent value="appointments" className="mt-6">
        <PatientAppointments patient={patient} />
      </TabsContent>

      <TabsContent value="billing" className="mt-6">
        <PatientBilling patient={patient} />
      </TabsContent>

      <TabsContent value="reminders" className="mt-6">
        <PatientReminders patient={patient} />
      </TabsContent>
    </Tabs>
  );
};

export default PatientViewTabs;

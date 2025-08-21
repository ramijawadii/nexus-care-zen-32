
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";

import Index from './pages/Index';
import Patients from './pages/Patients';
import PatientView from './pages/PatientView';
import Appointments from './pages/Appointments';
import BookingPageBuilder from './pages/BookingPageBuilder';
import WaitingRoom from './pages/WaitingRoom';
import Copilot from './pages/Copilot';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import MedicalSubscriptions from './pages/MedicalSubscriptions';
import EmployeeManagement from './pages/EmployeeManagement';
import Payroll from './pages/Payroll';
import Encaissement from './pages/Encaissement';
import Depenses from './pages/Depenses';
import RecouvrementAssurance from './pages/RecouvrementAssurance';
import Facturation from './pages/Facturation';
import Taxes from './pages/Taxes';
import RapportsComptables from './pages/RapportsComptables';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient/:id" element={<PatientView />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/booking-page-builder" element={<BookingPageBuilder />} />
            <Route path="/waiting-room" element={<WaitingRoom />} />
            <Route path="/copilot" element={<Copilot />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/medical-subscriptions" element={<MedicalSubscriptions />} />
            <Route path="/employee-management" element={<EmployeeManagement />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/encaissement" element={<Encaissement />} />
            <Route path="/depenses" element={<Depenses />} />
            <Route path="/recouvrement-assurance" element={<RecouvrementAssurance />} />
            <Route path="/facturation" element={<Facturation />} />
            <Route path="/taxes" element={<Taxes />} />
            <Route path="/rapports-comptables" element={<RapportsComptables />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;

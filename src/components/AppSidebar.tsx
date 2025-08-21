import { 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Heart,
  Home,
  DollarSign,
  Bot,
  Package,
  BookOpen,
  Clock,
  CreditCard,
  UsersIcon,
  UserCheck,
  TrendingDown,
  Calculator,
  CreditCard as EncaissementIcon,
  ShieldCheck,
  FileText,
  Receipt,
  Globe,
  Headphones
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

// Patient Management Section - Added Page de Réservation here
const patientManagementItems = [
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: Clock, label: 'Salle d\'attente', path: '/waiting-room' },
  { icon: Calendar, label: 'Rendez-vous', path: '/appointments' },
  { icon: Globe, label: 'Page de Réservation', path: '/booking-page-builder' },
];

// Accounting Section - Updated with Facturation
const accountingItems = [
  { icon: EncaissementIcon, label: 'Encaissement', path: '/encaissement' },
  { icon: TrendingDown, label: 'Dépenses', path: '/depenses' },
  { icon: ShieldCheck, label: 'Recouvrement & Assurance', path: '/recouvrement-assurance' },
  { icon: FileText, label: 'Facturation', path: '/facturation' },
  { icon: Receipt, label: 'Taxes', path: '/taxes' },
  { icon: FileText, label: 'Rapports Comptables', path: '/rapports-comptables' },
];

// Tools Section - Removed Page de Réservation from here
const toolsItems = [
  { icon: UserCheck, label: 'Gestion des Employés', path: '/employee-management' },
  { icon: Package, label: 'Inventaire', path: '/inventory' },
  { icon: Bot, label: 'Copilote IA', path: '/copilot' },
  { icon: BookOpen, label: 'Veille Médicale', path: '/medical-subscriptions' },
  { icon: UsersIcon, label: 'Paie & Staff', path: '/payroll' },
];

// Independent Items - Updated to include Tickets
const independentItems = [
  { icon: Home, label: 'Tableau de Bord', path: '/' },
  { icon: CreditCard, label: 'Abonnement', path: '/billing' },
  { icon: Headphones, label: 'Support', path: '/tickets' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const renderMenuItems = (items: typeof patientManagementItems) => {
    return items.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild isActive={isActive}>
            <NavLink to={item.path}>
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarHeader className="flex-shrink-0">
        <div className="flex items-center space-x-2 p-1">
          <div className="w-6 h-6 bg-text-primary rounded-lg flex items-center justify-center">
            <Heart className="w-3 h-3 text-background" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-semibold text-sm text-text-primary">HealthCRM</h1>
              <p className="text-xs text-text-muted">Gestion Patients</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        {/* Dashboard - Independent */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems([independentItems[0]])}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Patient Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Gestion des Patients</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(patientManagementItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Accounting Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Comptabilité</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(accountingItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Outils</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(toolsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Independent Items - Billing, Support, and Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems([independentItems[1], independentItems[2], independentItems[3]])}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex-shrink-0">
        <div className="flex items-center space-x-2 p-1">
          <div className="w-6 h-6 bg-text-muted rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-background">DR</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">Dr. Smith</p>
              <p className="text-xs text-text-muted truncate">Administrateur</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

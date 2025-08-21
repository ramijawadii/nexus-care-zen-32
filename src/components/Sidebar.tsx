import { 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  Heart,
  ChevronRight,
  Home
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const navigationItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Users, label: 'Patients', active: false },
  { icon: Calendar, label: 'Appointments', active: false },
  { icon: FileText, label: 'Records', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="p-6 border-b border-border-primary">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-text-primary rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-background" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-semibold text-text-primary">HealthCRM</h1>
              <p className="text-xs text-text-muted">Patient Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className={`nav-link w-full ${item.active ? 'active' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4" />}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-primary">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-text-muted rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-background">DR</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">Dr. Smith</p>
              <p className="text-xs text-text-muted truncate">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
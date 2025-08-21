
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { 
  Play, 
  UserCheck, 
  Users, 
  CheckCircle, 
  ExternalLink, 
  Edit, 
  X 
} from 'lucide-react';

interface AppointmentContextMenuProps {
  children: React.ReactNode;
  onStartVisit?: () => void;
  onPatientConfirmed?: () => void;
  onPatientArrived?: () => void;
  onCompleteVisit?: () => void;
  onViewProfile?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
}

const AppointmentContextMenu = ({
  children,
  onStartVisit,
  onPatientConfirmed,
  onPatientArrived,
  onCompleteVisit,
  onViewProfile,
  onEdit,
  onCancel
}: AppointmentContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={onStartVisit} className="flex items-center gap-2 text-blue-600">
          <Play className="w-4 h-4" />
          Start Visit
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={onPatientConfirmed} className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-500" />
          Patient Confirmed
        </ContextMenuItem>
        
        <ContextMenuItem onClick={onPatientArrived} className="flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-500" />
          Patient Arrived
        </ContextMenuItem>
        
        <ContextMenuItem onClick={onCompleteVisit} className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Complete Visit
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={onViewProfile} className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          View Patient Profile
        </ContextMenuItem>
        
        <ContextMenuItem onClick={onEdit} className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Edit
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={onCancel} className="flex items-center gap-2 text-red-600">
          <X className="w-4 h-4" />
          Cancel
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default AppointmentContextMenu;

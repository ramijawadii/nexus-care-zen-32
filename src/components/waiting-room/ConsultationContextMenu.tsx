
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { User, MessageSquare, FileText } from 'lucide-react';

interface ConsultationContextMenuProps {
  children: React.ReactNode;
  patientId: string;
  patientName: string;
  onViewProfile?: (patientId: string) => void;
  onTeamChat?: (patientId: string, patientName: string) => void;
  onRequestMedicalRecord?: (patientId: string, patientName: string) => void;
}

const ConsultationContextMenu = ({
  children,
  patientId,
  patientName,
  onViewProfile,
  onTeamChat,
  onRequestMedicalRecord
}: ConsultationContextMenuProps) => {
  const handleViewProfile = () => {
    console.log(`Viewing profile for patient ${patientName} (ID: ${patientId})`);
    onViewProfile?.(patientId);
  };

  const handleTeamChat = () => {
    console.log(`Opening team chat for patient ${patientName} (ID: ${patientId})`);
    onTeamChat?.(patientId, patientName);
  };

  const handleRequestMedicalRecord = () => {
    console.log(`Requesting medical record for patient ${patientName} (ID: ${patientId})`);
    onRequestMedicalRecord?.(patientId, patientName);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={handleViewProfile} className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Voir le profil
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={handleTeamChat} className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Chat avec l'équipe
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleRequestMedicalRecord} className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Demander fiche patient
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ConsultationContextMenu;

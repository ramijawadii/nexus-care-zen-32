import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Calendar, Clock, Ban, Coffee } from 'lucide-react';

interface EmptySlotContextMenuProps {
  children: React.ReactNode;
  onAddAppointment: () => void;
  onMarkBlocked: () => void;
  onMarkBreak: () => void;
  onMarkAvailable: () => void;
}

const EmptySlotContextMenu = ({ 
  children, 
  onAddAppointment, 
  onMarkBlocked, 
  onMarkBreak, 
  onMarkAvailable 
}: EmptySlotContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={onAddAppointment}>
          <Calendar className="mr-2 h-4 w-4" />
          Ajouter un RDV
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onMarkBlocked}>
          <Ban className="mr-2 h-4 w-4" />
          Marquer comme bloqué
        </ContextMenuItem>
        <ContextMenuItem onClick={onMarkBreak}>
          <Coffee className="mr-2 h-4 w-4" />
          Marquer comme pause
        </ContextMenuItem>
        <ContextMenuItem onClick={onMarkAvailable}>
          <Clock className="mr-2 h-4 w-4" />
          Marquer comme disponible
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EmptySlotContextMenu;
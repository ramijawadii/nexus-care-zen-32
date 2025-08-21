import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Edit, Eye, Trash2, Copy, Download, CheckCircle, XCircle, Clock } from 'lucide-react';

interface EncaissementContextMenuProps {
  children: React.ReactNode;
  encaissement: any;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMarkPaid: () => void;
  onMarkPending: () => void;
  onDownloadReceipt: () => void;
}

const EncaissementContextMenu: React.FC<EncaissementContextMenuProps> = ({
  children,
  encaissement,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onMarkPaid,
  onMarkPending,
  onDownloadReceipt
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          Voir les détails
        </ContextMenuItem>
        <ContextMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Dupliquer
        </ContextMenuItem>
        <ContextMenuSeparator />
        {encaissement.status !== 'Encaissé' && (
          <ContextMenuItem onClick={onMarkPaid}>
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            Marquer comme encaissé
          </ContextMenuItem>
        )}
        {encaissement.status !== 'En attente' && (
          <ContextMenuItem onClick={onMarkPending}>
            <Clock className="mr-2 h-4 w-4 text-yellow-600" />
            Marquer en attente
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDownloadReceipt}>
          <Download className="mr-2 h-4 w-4" />
          Télécharger reçu
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EncaissementContextMenu;
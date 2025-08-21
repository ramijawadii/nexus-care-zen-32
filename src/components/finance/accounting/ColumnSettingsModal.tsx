
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Column } from './types';

interface ColumnSettingsModalProps {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
  title: string;
}

const ColumnSettingsModal: React.FC<ColumnSettingsModalProps> = ({
  columns,
  onColumnsChange,
  title
}) => {
  const [localColumns, setLocalColumns] = useState<Column[]>(columns);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onColumnsChange(localColumns);
    setIsOpen(false);
  };

  const handleAddOption = (columnIndex: number) => {
    const updated = [...localColumns];
    const column = updated[columnIndex];
    if (column.type === 'select') {
      column.options = [...(column.options || []), 'Nouvelle option'];
      setLocalColumns(updated);
    }
  };

  const handleUpdateOption = (columnIndex: number, optionIndex: number, value: string) => {
    const updated = [...localColumns];
    const column = updated[columnIndex];
    if (column.options) {
      column.options[optionIndex] = value;
      setLocalColumns(updated);
    }
  };

  const handleDeleteOption = (columnIndex: number, optionIndex: number) => {
    const updated = [...localColumns];
    const column = updated[columnIndex];
    if (column.options) {
      column.options = column.options.filter((_, i) => i !== optionIndex);
      setLocalColumns(updated);
    }
  };

  // Filter only select type columns
  const selectColumns = localColumns.filter(column => column.type === 'select');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-1" />
          Paramètres
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuration des Listes Déroulantes - {title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Modifiez uniquement les options des listes déroulantes existantes.
          </p>

          {selectColumns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune liste déroulante disponible dans ce tableau.
            </div>
          ) : (
            <div className="space-y-4">
              {selectColumns.map((column, originalIndex) => {
                const columnIndex = localColumns.findIndex(col => col.key === column.key);
                return (
                  <Card key={column.key}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{column.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Options de la liste</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddOption(columnIndex)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Ajouter
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {(column.options || []).map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => handleUpdateOption(columnIndex, optionIndex, e.target.value)}
                                placeholder="Option"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteOption(columnIndex, optionIndex)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnSettingsModal;

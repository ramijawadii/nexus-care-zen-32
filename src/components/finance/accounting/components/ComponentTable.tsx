
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { ComponentData } from '../CustomViewBuilder';

interface ComponentTableProps {
  component: ComponentData;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

const ComponentTable: React.FC<ComponentTableProps> = ({ component, onUpdate }) => {
  const [data, setData] = useState(component.data?.rows || [
    { id: 1, name: 'Consultation', amount: 65, date: '2024-02-05' },
    { id: 2, name: 'Médicament', amount: 25, date: '2024-02-05' }
  ]);
  
  const [columns] = useState([
    { key: 'name', label: 'Description' },
    { key: 'amount', label: 'Montant (TND)' },
    { key: 'date', label: 'Date' }
  ]);

  const updateData = (newData: any[]) => {
    setData(newData);
    onUpdate({
      data: { ...component.data, rows: newData }
    });
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      name: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0]
    };
    updateData([...data, newRow]);
  };

  const deleteRow = (id: number) => {
    updateData(data.filter(row => row.id !== id));
  };

  const updateCell = (id: number, field: string, value: any) => {
    const newData = data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    );
    updateData(newData);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <Button size="sm" onClick={addRow}>
          <Plus className="w-4 h-4 mr-1" />
          Ligne
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHead key={col.key} className="text-xs">{col.label}</TableHead>
              ))}
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map(col => (
                  <TableCell key={col.key} className="p-1">
                    <Input
                      value={row[col.key]}
                      onChange={(e) => updateCell(row.id, col.key, 
                        col.key === 'amount' ? parseFloat(e.target.value) || 0 : e.target.value
                      )}
                      className="h-6 text-xs border-0"
                      type={col.key === 'amount' ? 'number' : col.key === 'date' ? 'date' : 'text'}
                    />
                  </TableCell>
                ))}
                <TableCell className="p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRow(row.id)}
                    className="h-6 w-6 p-0 text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComponentTable;

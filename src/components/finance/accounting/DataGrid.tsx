
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Download, 
  Upload, 
  Save, 
  Trash2,
  Filter,
  Calculator
} from 'lucide-react';
import ColumnSettingsModal from './ColumnSettingsModal';
import { Column } from './types';

interface DataGridProps {
  title: string;
  columns: Column[];
  data: any[];
  onDataChange: (data: any[]) => void;
  onColumnsChange?: (columns: Column[]) => void;
  onAddRow: () => void;
  onDeleteRow: (index: number) => void;
  onExport?: () => void;
  className?: string;
}

const DataGrid: React.FC<DataGridProps> = ({
  title,
  columns,
  data,
  onDataChange,
  onColumnsChange,
  onAddRow,
  onDeleteRow,
  onExport,
  className = ''
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleCellChange = useCallback((rowIndex: number, columnKey: string, value: any) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
    
    // Recalculate formulas
    columns.forEach(col => {
      if (col.type === 'calculated' && col.formula) {
        newData[rowIndex][col.key] = col.formula(newData[rowIndex], newData);
      }
    });
    
    onDataChange(newData);
  }, [data, columns, onDataChange]);

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const renderCell = (row: any, column: Column, rowIndex: number) => {
    const value = row[column.key];
    const isRequired = column.required && (!value || value === '');
    
    if (column.type === 'calculated' || !column.editable) {
      return (
        <span className={`${column.type === 'calculated' ? 'font-semibold text-blue-600' : ''} ${isRequired ? 'text-red-500' : ''}`}>
          {column.format ? column.format(value) : value || '-'}
          {isRequired && <span className="ml-1">*</span>}
        </span>
      );
    }

    const baseClassName = `h-8 border-0 bg-transparent ${isRequired ? 'border-red-300' : ''}`;

    switch (column.type) {
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleCellChange(rowIndex, column.key, val)}>
            <SelectTrigger className={baseClassName}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => handleCellChange(rowIndex, column.key, parseFloat(e.target.value) || 0)}
            className={`${baseClassName} text-right`}
            step="0.01"
            required={column.required}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
            className={baseClassName}
            required={column.required}
          />
        );
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
            className={baseClassName}
            required={column.required}
          />
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-green-600" />
            {title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Filter rows..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-48"
            />
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            {onColumnsChange && (
              <ColumnSettingsModal
                columns={columns}
                onColumnsChange={onColumnsChange}
                title={title}
              />
            )}
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button size="sm" onClick={onAddRow}>
              <Plus className="w-4 h-4 mr-1" />
              Add Row
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {columns.map((column) => (
                  <TableHead 
                    key={column.key}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      if (sortColumn === column.key) {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortColumn(column.key);
                        setSortDirection('asc');
                      }
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.required && (
                        <Badge variant="outline" className="text-xs text-red-600">Obligatoire</Badge>
                      )}
                      {column.type === 'calculated' && (
                        <Badge variant="outline" className="text-xs">Auto</Badge>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <TableCell key={column.key} className="p-1">
                      {renderCell(row, column, index)}
                    </TableCell>
                  ))}
                  <TableCell className="p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteRow(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sortedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-gray-500 py-8">
                    No data available. Click "Add Row" to start.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Summary Row */}
        {data.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Rows: </span>
                <span className="font-semibold">{data.length}</span>
              </div>
              {columns.filter(col => col.type === 'number' || col.type === 'calculated').map(col => {
                const total = data.reduce((sum, row) => {
                  const value = row[col.key];
                  return sum + (typeof value === 'number' ? value : 0);
                }, 0);
                return (
                  <div key={col.key}>
                    <span className="text-gray-600">{col.label} Total: </span>
                    <span className="font-semibold">{total.toFixed(2)} TND</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataGrid;

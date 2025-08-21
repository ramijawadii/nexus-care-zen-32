import React, { useState } from 'react';
import DataGrid from './DataGrid';
import TaxFilters from './TaxFilters';
import TaxDistributionChart from './TaxDistributionChart';
import { Column } from './types';

const TaxManagementView: React.FC = () => {
  console.log('TaxManagementView component is rendering');
  
  const [taxData, setTaxData] = useState([
    {
      date: '2024-02-01',
      taxType: 'TVA',
      period: '2024-01',
      baseAmount: 15000.00,
      taxRate: 19,
      taxAmount: 2850.00,
      status: 'Déclaré',
      dueDate: '2024-03-20',
      paidDate: '2024-03-15',
      reference: 'TVA-2024-01',
      notes: 'Déclaration mensuelle'
    },
    {
      date: '2024-01-01',
      taxType: 'Impôt sur les revenus',
      period: '2023',
      baseAmount: 120000.00,
      taxRate: 25,
      taxAmount: 30000.00,
      status: 'En attente',
      dueDate: '2024-03-31',
      paidDate: '',
      reference: 'IR-2023',
      notes: 'Déclaration annuelle'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    taxType: '',
    status: '',
    period: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  const [filteredData, setFilteredData] = useState(taxData);

  const [columns, setColumns] = useState<Column[]>([
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      editable: true,
      required: true
    },
    {
      key: 'taxType',
      label: 'Type d\'Impôt',
      type: 'select',
      options: ['TVA', 'Impôt sur les revenus', 'Taxe professionnelle', 'Cotisations sociales'],
      editable: true,
      required: true
    },
    {
      key: 'period',
      label: 'Période',
      type: 'text',
      editable: true,
      required: true
    },
    {
      key: 'baseAmount',
      label: 'Base Imposable (TND)',
      type: 'number',
      editable: true,
      required: true,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'taxRate',
      label: 'Taux (%)',
      type: 'number',
      editable: true,
      required: true,
      format: (value: number) => `${value}%`
    },
    {
      key: 'taxAmount',
      label: 'Montant Impôt (TND)',
      type: 'calculated',
      formula: (row: any) => (row.baseAmount || 0) * (row.taxRate || 0) / 100,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'status',
      label: 'Statut',
      type: 'select',
      options: ['En attente', 'Déclaré', 'Payé', 'En retard'],
      editable: true,
      required: true
    },
    {
      key: 'dueDate',
      label: 'Date d\'Échéance',
      type: 'date',
      editable: true,
      required: true
    },
    {
      key: 'paidDate',
      label: 'Date de Paiement',
      type: 'date',
      editable: true,
      required: false
    },
    {
      key: 'reference',
      label: 'Référence',
      type: 'text',
      editable: true,
      required: false
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'text',
      editable: true,
      required: false
    }
  ]);

  React.useEffect(() => {
    let filtered = taxData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.taxType.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesTaxType = filters.taxType === '' || item.taxType === filters.taxType;
      const matchesStatus = filters.status === '' || item.status === filters.status;
      const matchesPeriod = filters.period === '' || item.period === filters.period;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || item.taxAmount >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || item.taxAmount <= parseFloat(filters.amountMax);

      return matchesSearch && matchesTaxType && matchesStatus && matchesPeriod && 
             matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });
    setFilteredData(filtered);
  }, [filters, taxData]);

  const getTaxTypeColor = (taxType: string) => {
    const colors = {
      'TVA': '#3b82f6',
      'Impôt sur les revenus': '#10b981',
      'Taxe professionnelle': '#f59e0b',
      'Cotisations sociales': '#8b5cf6'
    };
    return colors[taxType] || '#6b7280';
  };

  // Calculate tax type distribution data
  const taxTypeDistributionData = React.useMemo(() => {
    const taxTypeMap = new Map();
    
    filteredData.forEach(item => {
      const taxType = item.taxType;
      const amount = item.taxAmount;
      
      if (taxTypeMap.has(taxType)) {
        const existing = taxTypeMap.get(taxType);
        taxTypeMap.set(taxType, {
          ...existing,
          value: existing.value + amount,
          count: existing.count + 1
        });
      } else {
        taxTypeMap.set(taxType, {
          name: taxType,
          value: amount,
          count: 1,
          color: getTaxTypeColor(taxType)
        });
      }
    });
    
    return Array.from(taxTypeMap.values());
  }, [filteredData]);

  const handleAddRow = () => {
    const newRow = {
      date: new Date().toISOString().split('T')[0],
      taxType: 'TVA',
      period: '',
      baseAmount: 0,
      taxRate: 19,
      taxAmount: 0,
      status: 'En attente',
      dueDate: '',
      paidDate: '',
      reference: '',
      notes: ''
    };
    setTaxData([...taxData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    setTaxData(taxData.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const csv = [
      columns.map(col => col.label).join(','),
      ...taxData.map(row => 
        columns.map(col => row[col.key]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fiscalite.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <TaxFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      <DataGrid
        title="Gestion Fiscale"
        columns={columns}
        data={filteredData}
        onDataChange={setTaxData}
        onColumnsChange={setColumns}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onExport={handleExport}
      />

      {/* Distribution Charts */}
      <TaxDistributionChart data={taxTypeDistributionData} />
    </div>
  );
};

export default TaxManagementView;

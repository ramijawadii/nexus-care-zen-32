import React, { useState } from 'react';
import DataGrid from './DataGrid';
import DebtFilters from './DebtFilters';
import DebtDistributionChart from './DebtDistributionChart';
import { Column } from './types';

const DebtPaymentsView: React.FC = () => {
  console.log('DebtPaymentsView component is rendering');
  
  const [debtsData, setDebtsData] = useState([
    {
      date: '2024-01-15',
      clientName: 'CNSS Tunis',
      clientType: 'Assurance',
      reference: 'CNSS-2024-001',
      originalAmount: 2450.00,
      paidAmount: 0,
      remainingAmount: 2450.00,
      dueDate: '2024-03-15',
      overdueDays: 0,
      status: 'En attente',
      priority: 'Normale',
      lastContact: '2024-02-01',
      notes: 'Dossier en cours de traitement'
    },
    {
      date: '2024-01-10',
      clientName: 'Assurance Maghreb',
      clientType: 'Assurance',
      reference: 'AM-2024-005',
      originalAmount: 1850.00,
      paidAmount: 925.00,
      remainingAmount: 925.00,
      dueDate: '2024-02-10',
      overdueDays: 25,
      status: 'En retard',
      priority: 'Élevée',
      lastContact: '2024-02-20',
      notes: 'Paiement partiel reçu'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    priority: '',
    clientType: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: '',
    overdueDays: ''
  });

  const [filteredData, setFilteredData] = useState(debtsData);

  const [columns, setColumns] = useState<Column[]>([
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      editable: true,
      required: true
    },
    {
      key: 'clientName',
      label: 'Nom du Client',
      type: 'text',
      editable: true,
      required: true
    },
    {
      key: 'clientType',
      label: 'Type de Client',
      type: 'select',
      options: ['Particulier', 'Assurance', 'Entreprise', 'Mutuelle'],
      editable: true,
      required: true
    },
    {
      key: 'reference',
      label: 'Référence',
      type: 'text',
      editable: true,
      required: true
    },
    {
      key: 'originalAmount',
      label: 'Montant Initial (TND)',
      type: 'number',
      editable: true,
      required: true,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'paidAmount',
      label: 'Montant Payé (TND)',
      type: 'number',
      editable: true,
      required: false,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'remainingAmount',
      label: 'Montant Restant (TND)',
      type: 'calculated',
      formula: (row: any) => (row.originalAmount || 0) - (row.paidAmount || 0),
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'dueDate',
      label: 'Date d\'Échéance',
      type: 'date',
      editable: true,
      required: true
    },
    {
      key: 'overdueDays',
      label: 'Jours de Retard',
      type: 'calculated',
      formula: (row: any) => {
        if (!row.dueDate) return 0;
        const today = new Date();
        const due = new Date(row.dueDate);
        const diff = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
        return Math.max(0, diff);
      }
    },
    {
      key: 'status',
      label: 'Statut',
      type: 'select',
      options: ['En attente', 'En retard', 'En cours', 'Résolu'],
      editable: true,
      required: true
    },
    {
      key: 'priority',
      label: 'Priorité',
      type: 'select',
      options: ['Urgente', 'Élevée', 'Normale', 'Faible'],
      editable: true,
      required: false
    },
    {
      key: 'lastContact',
      label: 'Dernier Contact',
      type: 'date',
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
    let filtered = debtsData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.clientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === '' || item.status === filters.status;
      const matchesPriority = filters.priority === '' || item.priority === filters.priority;
      const matchesClientType = filters.clientType === '' || item.clientType === filters.clientType;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || item.remainingAmount >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || item.remainingAmount <= parseFloat(filters.amountMax);
      
      const matchesOverdueDays = filters.overdueDays === '' || (() => {
        const range = filters.overdueDays;
        if (range === '0-30') return item.overdueDays >= 0 && item.overdueDays <= 30;
        if (range === '31-60') return item.overdueDays >= 31 && item.overdueDays <= 60;
        if (range === '61-90') return item.overdueDays >= 61 && item.overdueDays <= 90;
        if (range === '90+') return item.overdueDays > 90;
        return true;
      })();

      return matchesSearch && matchesStatus && matchesPriority && matchesClientType && 
             matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax && matchesOverdueDays;
    });
    setFilteredData(filtered);
  }, [filters, debtsData]);

  const getStatusColor = (status: string) => {
    const colors = {
      'En attente': '#f59e0b',
      'En retard': '#ef4444',
      'En cours': '#3b82f6',
      'Résolu': '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  // Calculate status distribution data
  const statusDistributionData = React.useMemo(() => {
    const statusMap = new Map();
    
    filteredData.forEach(item => {
      const status = item.status;
      const amount = item.remainingAmount;
      
      if (statusMap.has(status)) {
        const existing = statusMap.get(status);
        statusMap.set(status, {
          ...existing,
          value: existing.value + amount,
          count: existing.count + 1
        });
      } else {
        statusMap.set(status, {
          name: status,
          value: amount,
          count: 1,
          color: getStatusColor(status)
        });
      }
    });
    
    return Array.from(statusMap.values());
  }, [filteredData]);

  const handleAddRow = () => {
    const newRow = {
      date: new Date().toISOString().split('T')[0],
      clientName: '',
      clientType: 'Particulier',
      reference: '',
      originalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
      dueDate: '',
      overdueDays: 0,
      status: 'En attente',
      priority: 'Normale',
      lastContact: '',
      notes: ''
    };
    setDebtsData([...debtsData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    setDebtsData(debtsData.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const csv = [
      columns.map(col => col.label).join(','),
      ...debtsData.map(row => 
        columns.map(col => row[col.key]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'creances.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <DebtFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      <DataGrid
        title="Gestion des Créances"
        columns={columns}
        data={filteredData}
        onDataChange={setDebtsData}
        onColumnsChange={setColumns}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onExport={handleExport}
      />

      {/* Distribution Charts */}
      <DebtDistributionChart data={statusDistributionData} />
    </div>
  );
};

export default DebtPaymentsView;

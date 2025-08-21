import React, { useState } from 'react';
import DataGrid from './DataGrid';
import InvoiceFilters from './InvoiceFilters';
import InvoiceDistributionChart from './InvoiceDistributionChart';
import { Column } from './types';

const InvoiceGenerationView: React.FC = () => {
  console.log('InvoiceGenerationView component is rendering');
  
  const [invoicesData, setInvoicesData] = useState([
    {
      date: '2024-02-05',
      invoiceNumber: 'FAC-2024-001',
      clientName: 'Sarah Benali',
      clientType: 'Particulier',
      invoiceType: 'Consultation',
      amountHT: 65.00,
      vatRate: 7,
      vatAmount: 4.55,
      totalTTC: 69.55,
      status: 'Envoyée',
      dueDate: '2024-03-05',
      paidDate: '2024-02-05',
      notes: 'Consultation générale'
    },
    {
      date: '2024-02-04',
      invoiceNumber: 'FAC-2024-002',
      clientName: 'CNSS Tunis',
      clientType: 'Assurance',
      invoiceType: 'Remboursement',
      amountHT: 120.00,
      vatRate: 7,
      vatAmount: 8.40,
      totalTTC: 128.40,
      status: 'En attente',
      dueDate: '2024-03-04',
      paidDate: '',
      notes: 'Dossier de remboursement'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    clientType: '',
    invoiceType: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  const [filteredData, setFilteredData] = useState(invoicesData);

  const [columns, setColumns] = useState<Column[]>([
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      editable: true,
      required: true
    },
    {
      key: 'invoiceNumber',
      label: 'N° Facture',
      type: 'text',
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
      key: 'invoiceType',
      label: 'Type de Facture',
      type: 'select',
      options: ['Consultation', 'Remboursement', 'Équipement', 'Autres'],
      editable: true,
      required: true
    },
    {
      key: 'amountHT',
      label: 'Montant HT (TND)',
      type: 'number',
      editable: true,
      required: true,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'vatRate',
      label: 'Taux TVA (%)',
      type: 'number',
      editable: true,
      required: false,
      format: (value: number) => `${value}%`
    },
    {
      key: 'vatAmount',
      label: 'Montant TVA (TND)',
      type: 'calculated',
      formula: (row: any) => (row.amountHT || 0) * (row.vatRate || 0) / 100,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'totalTTC',
      label: 'Total TTC (TND)',
      type: 'calculated',
      formula: (row: any) => (row.amountHT || 0) + ((row.amountHT || 0) * (row.vatRate || 0) / 100),
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'status',
      label: 'Statut',
      type: 'select',
      options: ['Brouillon', 'Envoyée', 'Payée', 'En retard', 'Annulée'],
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
      key: 'notes',
      label: 'Notes',
      type: 'text',
      editable: true,
      required: false
    }
  ]);

  React.useEffect(() => {
    let filtered = invoicesData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.clientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.invoiceNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === '' || item.status === filters.status;
      const matchesClientType = filters.clientType === '' || item.clientType === filters.clientType;
      const matchesInvoiceType = filters.invoiceType === '' || item.invoiceType === filters.invoiceType;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || item.totalTTC >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || item.totalTTC <= parseFloat(filters.amountMax);

      return matchesSearch && matchesStatus && matchesClientType && matchesInvoiceType && 
             matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });
    setFilteredData(filtered);
  }, [filters, invoicesData]);

  const getStatusColor = (status: string) => {
    const colors = {
      'Brouillon': '#6b7280',
      'Envoyée': '#3b82f6',
      'Payée': '#10b981',
      'En retard': '#ef4444',
      'Annulée': '#64748b'
    };
    return colors[status] || '#6b7280';
  };

  const statusDistributionData = React.useMemo(() => {
    const statusMap = new Map();
    
    filteredData.forEach(item => {
      const status = item.status;
      const amount = item.totalTTC;
      
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
      invoiceNumber: '',
      clientName: '',
      clientType: 'Particulier',
      invoiceType: 'Consultation',
      amountHT: 0,
      vatRate: 7,
      vatAmount: 0,
      totalTTC: 0,
      status: 'Brouillon',
      dueDate: '',
      paidDate: '',
      notes: ''
    };
    setInvoicesData([...invoicesData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    setInvoicesData(invoicesData.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const csv = [
      columns.map(col => col.label).join(','),
      ...invoicesData.map(row => 
        columns.map(col => row[col.key]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'facturation.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <InvoiceFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      <DataGrid
        title="Génération de Factures"
        columns={columns}
        data={filteredData}
        onDataChange={setInvoicesData}
        onColumnsChange={setColumns}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onExport={handleExport}
      />

      {/* Distribution Charts */}
      <InvoiceDistributionChart data={statusDistributionData} />
    </div>
  );
};

export default InvoiceGenerationView;

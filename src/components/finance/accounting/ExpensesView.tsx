import React, { useState } from 'react';
import DataGrid from './DataGrid';
import ExpensesFilters from './ExpensesFilters';
import ExpensesDistributionChart from './ExpensesDistributionChart';
import { Column } from './types';

const ExpensesView: React.FC = () => {
  console.log('ExpensesView component is rendering');
  
  const [expensesData, setExpensesData] = useState([
    {
      date: '2024-02-05',
      supplier: 'MedSupply Tunisie',
      category: 'Équipement médical',
      description: 'Stéthoscope électronique',
      amountHT: 450.00,
      vatRate: 19,
      vatAmount: 85.50,
      totalTTC: 535.50,
      paymentMethod: 'Virement',
      invoiceNumber: 'MS-2024-001',
      status: 'Payé'
    },
    {
      date: '2024-02-04',
      supplier: 'PharmaTech',
      category: 'Médicaments',
      description: 'Stock médicaments essentiels',
      amountHT: 1200.00,
      vatRate: 7,
      vatAmount: 84.00,
      totalTTC: 1284.00,
      paymentMethod: 'Chèque',
      invoiceNumber: 'PT-2024-015',
      status: 'En attente'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    paymentMethod: '',
    supplier: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: '',
    vatRate: ''
  });

  const [filteredData, setFilteredData] = useState(expensesData);

  const [columns, setColumns] = useState<Column[]>([
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      editable: true,
      required: true
    },
    {
      key: 'supplier',
      label: 'Fournisseur',
      type: 'select',
      options: ['MedSupply Tunisie', 'PharmaTech', 'EquipMed', 'Formation Médicale'],
      editable: true,
      required: true
    },
    {
      key: 'category',
      label: 'Catégorie',
      type: 'select',
      options: ['Équipement médical', 'Fournitures', 'Médicaments', 'Formation', 'Services', 'Maintenance'],
      editable: true,
      required: true
    },
    {
      key: 'description',
      label: 'Description',
      type: 'text',
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
      key: 'paymentMethod',
      label: 'Méthode de Paiement',
      type: 'select',
      options: ['Espèces', 'Carte', 'Virement', 'Chèque'],
      editable: true,
      required: true
    },
    {
      key: 'invoiceNumber',
      label: 'N° Facture',
      type: 'text',
      editable: true,
      required: false
    },
    {
      key: 'status',
      label: 'Statut',
      type: 'select',
      options: ['Payé', 'En attente', 'En retard'],
      editable: true,
      required: true
    }
  ]);

  React.useEffect(() => {
    let filtered = expensesData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.supplier.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesCategory = filters.category === '' || item.category === filters.category;
      const matchesPaymentMethod = filters.paymentMethod === '' || item.paymentMethod === filters.paymentMethod;
      const matchesSupplier = filters.supplier === '' || item.supplier === filters.supplier;
      const matchesVatRate = filters.vatRate === '' || item.vatRate.toString() === filters.vatRate;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || item.amountHT >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || item.amountHT <= parseFloat(filters.amountMax);

      return matchesSearch && matchesCategory && matchesPaymentMethod && matchesSupplier && 
             matchesVatRate && matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });
    setFilteredData(filtered);
  }, [filters, expensesData]);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Équipement médical': '#3b82f6',
      'Fournitures': '#10b981',
      'Médicaments': '#f59e0b',
      'Formation': '#8b5cf6',
      'Services': '#ef4444',
      'Maintenance': '#06b6d4'
    };
    return colors[category] || '#6b7280';
  };

  // Calculate category distribution data
  const categoryDistributionData = React.useMemo(() => {
    const categoryMap = new Map();
    
    filteredData.forEach(item => {
      const category = item.category;
      const totalTTC = item.amountHT + (item.amountHT * item.vatRate / 100);
      
      if (categoryMap.has(category)) {
        const existing = categoryMap.get(category);
        categoryMap.set(category, {
          ...existing,
          value: existing.value + totalTTC,
          count: existing.count + 1
        });
      } else {
        categoryMap.set(category, {
          name: category,
          value: totalTTC,
          count: 1,
          color: getCategoryColor(category)
        });
      }
    });
    
    return Array.from(categoryMap.values());
  }, [filteredData]);

  const handleAddRow = () => {
    const newRow = {
      date: new Date().toISOString().split('T')[0],
      supplier: '',
      category: 'Équipement médical',
      description: '',
      amountHT: 0,
      vatRate: 19,
      vatAmount: 0,
      totalTTC: 0,
      paymentMethod: 'Espèces',
      invoiceNumber: '',
      status: 'En attente'
    };
    setExpensesData([...expensesData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    setExpensesData(expensesData.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const csv = [
      columns.map(col => col.label).join(','),
      ...expensesData.map(row => 
        columns.map(col => row[col.key]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'depenses.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <ExpensesFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      <DataGrid
        title="Gestion des Dépenses"
        columns={columns}
        data={filteredData}
        onDataChange={setExpensesData}
        onColumnsChange={setColumns}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onExport={handleExport}
      />

      {/* Distribution Charts */}
      <ExpensesDistributionChart data={categoryDistributionData} />
    </div>
  );
};

export default ExpensesView;

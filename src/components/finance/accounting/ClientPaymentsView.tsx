import React, { useState } from 'react';
import DataGrid from './DataGrid';
import ServiceDistributionChart from './ServiceDistributionChart';
import EncaissementFilters from './EncaissementFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Column } from './types';

const ClientPaymentsView: React.FC = () => {
  console.log('ClientPaymentsView component is rendering');
  
  const [paymentsData, setPaymentsData] = useState([
    {
      date: '2024-02-05',
      patientName: 'Sarah Benali',
      serviceDescription: 'Consultation générale',
      amountBilled: 65.00,
      vatRate: 7,
      vatAmount: 4.55,
      totalDue: 69.55,
      amountPaid: 69.55,
      paymentMethod: 'Card',
      balanceOwing: 0,
      status: 'Paid',
      notes: ''
    },
    {
      date: '2024-02-04',
      patientName: 'Ahmed Trabelsi',
      serviceDescription: 'Consultation spécialisée',
      amountBilled: 120.00,
      vatRate: 7,
      vatAmount: 8.40,
      totalDue: 128.40,
      amountPaid: 0,
      paymentMethod: 'Insurance',
      balanceOwing: 128.40,
      status: 'Pending',
      notes: 'Attente remboursement CNSS'
    },
    {
      date: '2024-02-03',
      patientName: 'Fatma Mansouri',
      serviceDescription: 'Échographie',
      amountBilled: 80.00,
      vatRate: 7,
      vatAmount: 5.60,
      totalDue: 85.60,
      amountPaid: 85.60,
      paymentMethod: 'Cash',
      balanceOwing: 0,
      status: 'Paid',
      notes: ''
    },
    {
      date: '2024-02-02',
      patientName: 'Mohamed Khelifi',
      serviceDescription: 'Vaccination',
      amountBilled: 45.00,
      vatRate: 7,
      vatAmount: 3.15,
      totalDue: 48.15,
      amountPaid: 20.00,
      paymentMethod: 'Card',
      balanceOwing: 28.15,
      status: 'Partial',
      notes: 'Paiement partiel'
    }
  ]);

  // Enhanced filter states
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    paymentMethod: '',
    serviceDescription: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: '',
    vatRate: ''
  });

  const [filteredData, setFilteredData] = useState(paymentsData);

  const [columns, setColumns] = useState<Column[]>([
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      editable: true,
      required: true
    },
    {
      key: 'patientName',
      label: 'Nom du Patient',
      type: 'text',
      editable: true,
      required: true
    },
    {
      key: 'serviceDescription',
      label: 'Description du Service',
      type: 'select',
      options: ['Consultation générale', 'Consultation spécialisée', 'Échographie', 'Vaccination', 'Suivi médical', 'Téléconsultation'],
      editable: true,
      required: true
    },
    {
      key: 'amountBilled',
      label: 'Montant Facturé (TND)',
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
      formula: (row: any) => (row.amountBilled || 0) * (row.vatRate || 7) / 100,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'totalDue',
      label: 'Total Dû (TND)',
      type: 'calculated',
      formula: (row: any) => (row.amountBilled || 0) + ((row.amountBilled || 0) * (row.vatRate || 7) / 100),
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'amountPaid',
      label: 'Montant Payé (TND)',
      type: 'number',
      editable: true,
      required: false,
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'paymentMethod',
      label: 'Méthode de Paiement',
      type: 'select',
      options: ['Cash', 'Card', 'Bank Transfer', 'Insurance', 'Check'],
      editable: true,
      required: true
    },
    {
      key: 'balanceOwing',
      label: 'Solde Dû (TND)',
      type: 'calculated',
      formula: (row: any) => {
        const totalDue = (row.amountBilled || 0) + ((row.amountBilled || 0) * (row.vatRate || 7) / 100);
        return Math.max(0, totalDue - (row.amountPaid || 0));
      },
      format: (value: number) => `${value?.toFixed(2)} TND`
    },
    {
      key: 'status',
      label: 'Statut',
      type: 'calculated',
      formula: (row: any) => {
        const totalDue = (row.amountBilled || 0) + ((row.amountBilled || 0) * (row.vatRate || 7) / 100);
        const balance = totalDue - (row.amountPaid || 0);
        if (balance <= 0) return 'Paid';
        if (row.amountPaid > 0) return 'Partial';
        return 'Pending';
      }
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'text',
      editable: true,
      required: false
    }
  ]);

  const getServiceColor = (service: string) => {
    const colors = {
      'Consultation générale': '#3b82f6',
      'Consultation spécialisée': '#10b981',
      'Échographie': '#f59e0b',
      'Vaccination': '#8b5cf6',
      'Suivi médical': '#ef4444',
      'Téléconsultation': '#06b6d4'
    };
    return colors[service] || '#6b7280';
  };

  // Enhanced filtering logic
  React.useEffect(() => {
    let filtered = paymentsData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.serviceDescription.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === '' || item.status === filters.status;
      const matchesPaymentMethod = filters.paymentMethod === '' || item.paymentMethod === filters.paymentMethod;
      const matchesService = filters.serviceDescription === '' || item.serviceDescription === filters.serviceDescription;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || item.amountBilled >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || item.amountBilled <= parseFloat(filters.amountMax);
      
      const matchesVatRate = filters.vatRate === '' || item.vatRate.toString() === filters.vatRate;

      return matchesSearch && matchesStatus && matchesPaymentMethod && matchesService && 
             matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax && matchesVatRate;
    });
    setFilteredData(filtered);
  }, [filters, paymentsData]);

  // Calculate service distribution data
  const serviceDistributionData = React.useMemo(() => {
    const serviceMap = new Map();
    
    filteredData.forEach(item => {
      const service = item.serviceDescription;
      const totalDue = item.amountBilled + (item.amountBilled * item.vatRate / 100);
      
      if (serviceMap.has(service)) {
        const existing = serviceMap.get(service);
        serviceMap.set(service, {
          ...existing,
          value: existing.value + totalDue,
          count: existing.count + 1
        });
      } else {
        serviceMap.set(service, {
          name: service,
          value: totalDue,
          count: 1,
          color: getServiceColor(service)
        });
      }
    });
    
    return Array.from(serviceMap.values());
  }, [filteredData]);

  const handleAddRow = () => {
    const newRow = {
      date: new Date().toISOString().split('T')[0],
      patientName: '',
      serviceDescription: 'Consultation générale',
      amountBilled: 0,
      vatRate: 7,
      vatAmount: 0,
      totalDue: 0,
      amountPaid: 0,
      paymentMethod: 'Cash',
      balanceOwing: 0,
      status: 'Pending',
      notes: ''
    };
    setPaymentsData([...paymentsData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    setPaymentsData(paymentsData.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const csv = [
      columns.map(col => col.label).join(','),
      ...paymentsData.map(row => 
        columns.map(col => row[col.key]).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encaissements-clients.csv';
    a.click();
  };

  const paymentMethodData = [
    { name: 'Card', value: 69.55, color: '#3b82f6' },
    { name: 'Insurance', value: 128.40, color: '#10b981' },
    { name: 'Cash', value: 85.20, color: '#f59e0b' },
    { name: 'Bank Transfer', value: 45.30, color: '#8b5cf6' }
  ];

  const statusData = [
    { status: 'Paid', count: 2 },
    { status: 'Pending', count: 1 },
    { status: 'Partial', count: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Filters */}
      <EncaissementFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Data Grid */}
      <DataGrid
        title="Encaissements et Recouvrement"
        columns={columns}
        data={filteredData}
        onDataChange={setPaymentsData}
        onColumnsChange={setColumns}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onExport={handleExport}
      />
      
      {/* Enhanced Charts Section */}
      <div className="space-y-6">
        {/* Service Distribution Chart */}
        <ServiceDistributionChart data={serviceDistributionData} />
        
        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution par Méthode de Paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} TND`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut des Paiements</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statusData}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientPaymentsView;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Calendar } from 'lucide-react';

interface InvoiceFiltersProps {
  filters: {
    searchTerm: string;
    status: string;
    clientType: string;
    invoiceType: string;
    dateFrom: string;
    dateTo: string;
    amountMin: string;
    amountMax: string;
  };
  onFiltersChange: (filters: any) => void;
}

const InvoiceFilters: React.FC<InvoiceFiltersProps> = ({ filters, onFiltersChange }) => {
  const clearFilter = (filterKey: string) => {
    onFiltersChange({ ...filters, [filterKey]: '' });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: '',
      status: '',
      clientType: '',
      invoiceType: '',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtres Avancés
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Clear */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher numéro facture, client ou description..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            disabled={activeFiltersCount === 0}
          >
            Effacer tout
          </Button>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Statut</label>
            <Select value={filters.status || undefined} onValueChange={(value) => onFiltersChange({ ...filters, status: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="Envoyée">Envoyée</SelectItem>
                <SelectItem value="Payée">Payée</SelectItem>
                <SelectItem value="En retard">En retard</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Client Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de client</label>
            <Select value={filters.clientType || undefined} onValueChange={(value) => onFiltersChange({ ...filters, clientType: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Particulier">Particulier</SelectItem>
                <SelectItem value="Assurance">Assurance</SelectItem>
                <SelectItem value="Entreprise">Entreprise</SelectItem>
                <SelectItem value="Mutuelle">Mutuelle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoice Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de facture</label>
            <Select value={filters.invoiceType || undefined} onValueChange={(value) => onFiltersChange({ ...filters, invoiceType: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Traitement">Traitement</SelectItem>
                <SelectItem value="Examens">Examens</SelectItem>
                <SelectItem value="Suivi">Suivi</SelectItem>
                <SelectItem value="Urgence">Urgence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional space for future filter */}
          <div></div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date de début</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date de fin</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Amount Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Montant minimum (TND)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={filters.amountMin}
              onChange={(e) => onFiltersChange({ ...filters, amountMin: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Montant maximum (TND)</label>
            <Input
              type="number"
              placeholder="9999.99"
              value={filters.amountMax}
              onChange={(e) => onFiltersChange({ ...filters, amountMax: e.target.value })}
            />
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm font-medium">Filtres actifs:</span>
            {filters.searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Recherche: {filters.searchTerm}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('searchTerm')} />
              </Badge>
            )}
            {filters.status && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Statut: {filters.status}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('status')} />
              </Badge>
            )}
            {filters.clientType && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Type client: {filters.clientType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('clientType')} />
              </Badge>
            )}
            {filters.invoiceType && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Type facture: {filters.invoiceType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('invoiceType')} />
              </Badge>
            )}
            {filters.dateFrom && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Depuis: {filters.dateFrom}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('dateFrom')} />
              </Badge>
            )}
            {filters.dateTo && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Jusqu'à: {filters.dateTo}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('dateTo')} />
              </Badge>
            )}
            {filters.amountMin && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Min: {filters.amountMin} TND
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('amountMin')} />
              </Badge>
            )}
            {filters.amountMax && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Max: {filters.amountMax} TND
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('amountMax')} />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoiceFilters;

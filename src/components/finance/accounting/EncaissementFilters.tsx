
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Calendar } from 'lucide-react';

interface EncaissementFiltersProps {
  filters: {
    searchTerm: string;
    status: string;
    paymentMethod: string;
    serviceDescription: string;
    dateFrom: string;
    dateTo: string;
    amountMin: string;
    amountMax: string;
    vatRate: string;
  };
  onFiltersChange: (filters: any) => void;
}

const EncaissementFilters: React.FC<EncaissementFiltersProps> = ({ filters, onFiltersChange }) => {
  const clearFilter = (filterKey: string) => {
    onFiltersChange({ ...filters, [filterKey]: '' });
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
              placeholder="Rechercher patient, service ou notes..."
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
                <SelectItem value="Paid">Payé</SelectItem>
                <SelectItem value="Pending">En attente</SelectItem>
                <SelectItem value="Partial">Partiel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Méthode de paiement</label>
            <Select value={filters.paymentMethod || undefined} onValueChange={(value) => onFiltersChange({ ...filters, paymentMethod: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les méthodes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Espèces</SelectItem>
                <SelectItem value="Card">Carte</SelectItem>
                <SelectItem value="Bank Transfer">Virement</SelectItem>
                <SelectItem value="Insurance">Assurance</SelectItem>
                <SelectItem value="Check">Chèque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Service Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de service</label>
            <Select value={filters.serviceDescription || undefined} onValueChange={(value) => onFiltersChange({ ...filters, serviceDescription: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consultation générale">Consultation générale</SelectItem>
                <SelectItem value="Consultation spécialisée">Consultation spécialisée</SelectItem>
                <SelectItem value="Échographie">Échographie</SelectItem>
                <SelectItem value="Vaccination">Vaccination</SelectItem>
                <SelectItem value="Suivi médical">Suivi médical</SelectItem>
                <SelectItem value="Téléconsultation">Téléconsultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* VAT Rate Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Taux TVA</label>
            <Select value={filters.vatRate || undefined} onValueChange={(value) => onFiltersChange({ ...filters, vatRate: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les taux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="7">7%</SelectItem>
                <SelectItem value="13">13%</SelectItem>
                <SelectItem value="19">19%</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            {filters.paymentMethod && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Méthode: {filters.paymentMethod}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('paymentMethod')} />
              </Badge>
            )}
            {filters.serviceDescription && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Service: {filters.serviceDescription}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('serviceDescription')} />
              </Badge>
            )}
            {filters.vatRate && (
              <Badge variant="secondary" className="flex items-center gap-1">
                TVA: {filters.vatRate}%
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('vatRate')} />
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

export default EncaissementFilters;

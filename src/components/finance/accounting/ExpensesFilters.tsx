
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Calendar } from 'lucide-react';

interface ExpensesFiltersProps {
  filters: {
    searchTerm: string;
    category: string;
    paymentMethod: string;
    supplier: string;
    dateFrom: string;
    dateTo: string;
    amountMin: string;
    amountMax: string;
    vatRate: string;
  };
  onFiltersChange: (filters: any) => void;
}

const ExpensesFilters: React.FC<ExpensesFiltersProps> = ({ filters, onFiltersChange }) => {
  const clearFilter = (filterKey: string) => {
    onFiltersChange({ ...filters, [filterKey]: '' });
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
              placeholder="Rechercher fournisseur, catégorie ou description..."
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
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Catégorie</label>
            <Select value={filters.category || undefined} onValueChange={(value) => onFiltersChange({ ...filters, category: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Équipement médical">Équipement médical</SelectItem>
                <SelectItem value="Fournitures">Fournitures</SelectItem>
                <SelectItem value="Médicaments">Médicaments</SelectItem>
                <SelectItem value="Formation">Formation</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
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
                <SelectItem value="Espèces">Espèces</SelectItem>
                <SelectItem value="Carte">Carte</SelectItem>
                <SelectItem value="Virement">Virement</SelectItem>
                <SelectItem value="Chèque">Chèque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Supplier Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Fournisseur</label>
            <Select value={filters.supplier || undefined} onValueChange={(value) => onFiltersChange({ ...filters, supplier: value || '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les fournisseurs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MedSupply Tunisie">MedSupply Tunisie</SelectItem>
                <SelectItem value="PharmaTech">PharmaTech</SelectItem>
                <SelectItem value="EquipMed">EquipMed</SelectItem>
                <SelectItem value="Formation Médicale">Formation Médicale</SelectItem>
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
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Catégorie: {filters.category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('category')} />
              </Badge>
            )}
            {filters.paymentMethod && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Méthode: {filters.paymentMethod}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('paymentMethod')} />
              </Badge>
            )}
            {filters.supplier && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Fournisseur: {filters.supplier}
                <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('supplier')} />
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

export default ExpensesFilters;

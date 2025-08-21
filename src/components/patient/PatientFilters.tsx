
import { Search, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface PatientFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMaladie: string;
  onMaladieChange: (value: string) => void;
  selectedDateFilter: string;
  onDateFilterChange: (value: string) => void;
  customDate: Date | undefined;
  onCustomDateChange: (date: Date | undefined) => void;
  showInCabinetOnly: boolean;
  onShowInCabinetOnlyChange: (checked: boolean) => void;
}

const PatientFilters = ({
  searchTerm,
  onSearchChange,
  selectedMaladie,
  onMaladieChange,
  selectedDateFilter,
  onDateFilterChange,
  customDate,
  onCustomDateChange,
  showInCabinetOnly,
  onShowInCabinetOnlyChange
}: PatientFiltersProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const maladies = [
    "Hypertension",
    "Diabète",
    "Asthme",
    "Arthrite",
    "Migraine",
    "Allergie"
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Search by name/phone */}
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher par nom ou téléphone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter by maladie */}
        <div className="min-w-[200px]">
          <Select value={selectedMaladie} onValueChange={onMaladieChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par maladie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les maladies</SelectItem>
              {maladies.map((maladie) => (
                <SelectItem key={maladie} value={maladie}>
                  {maladie}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date filter */}
        <div className="min-w-[200px]">
          <Select value={selectedDateFilter} onValueChange={onDateFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="thisWeek">Cette semaine</SelectItem>
              <SelectItem value="custom">Date personnalisée</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Custom date picker */}
        {selectedDateFilter === 'custom' && (
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[200px] justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                {customDate ? formatDate(customDate) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={customDate}
                onSelect={(date) => {
                  onCustomDateChange(date);
                  setIsCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* In cabinet filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inCabinet"
          checked={showInCabinetOnly}
          onCheckedChange={onShowInCabinetOnlyChange}
        />
        <label htmlFor="inCabinet" className="text-sm font-medium text-gray-700 flex items-center">
          <Users className="w-4 h-4 mr-1" />
          Afficher seulement les patients au cabinet
        </label>
      </div>
    </div>
  );
};

export default PatientFilters;

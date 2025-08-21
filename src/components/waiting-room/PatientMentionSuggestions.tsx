
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { User, Clock } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  nextAppointment?: string;
}

interface PatientMentionSuggestionsProps {
  query: string;
  onSelect: (mention: string) => void;
  position: { x: number; y: number };
  visible: boolean;
}

const PatientMentionSuggestions = ({ 
  query, 
  onSelect, 
  position, 
  visible 
}: PatientMentionSuggestionsProps) => {
  const [patients] = useState<Patient[]>([
    { id: '1', name: 'Marie Dubois', nextAppointment: '14:30' },
    { id: '2', name: 'Jean Martin', nextAppointment: '15:00' },
    { id: '3', name: 'Sophie Bernard', nextAppointment: '15:30' },
    { id: '4', name: 'Pierre Moreau', nextAppointment: '16:00' }
  ]);

  const [suggestions, setSuggestions] = useState<Array<{ type: 'patient' | 'next', label: string, value: string }>>([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = [];

    // Add "suivant" suggestion
    if ('suivant'.includes(query.toLowerCase())) {
      const nextPatient = patients.find(p => p.nextAppointment);
      if (nextPatient) {
        newSuggestions.push({
          type: 'next' as const,
          label: `@suivant (${nextPatient.name})`,
          value: `@suivant`
        });
      }
    }

    // Add patient name suggestions
    const matchingPatients = patients.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    matchingPatients.forEach(patient => {
      newSuggestions.push({
        type: 'patient' as const,
        label: `@${patient.name}`,
        value: `@${patient.name}`
      });
    });

    setSuggestions(newSuggestions);
  }, [query, patients]);

  if (!visible || suggestions.length === 0) {
    return null;
  }

  return (
    <Card 
      className="absolute z-50 max-w-xs shadow-lg border border-border-primary bg-surface-elevated"
      style={{
        left: position.x,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="p-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 hover:bg-hover-surface cursor-pointer rounded"
            onClick={() => onSelect(suggestion.value)}
          >
            {suggestion.type === 'next' ? (
              <Clock className="w-4 h-4 text-blue-500" />
            ) : (
              <User className="w-4 h-4 text-text-secondary" />
            )}
            <span className="text-sm text-text-primary">{suggestion.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PatientMentionSuggestions;

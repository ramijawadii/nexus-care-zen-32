
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Settings, Save, RotateCcw } from 'lucide-react';

interface WorkingHours {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
  breakStart?: string;
  breakEnd?: string;
}

const WorkingHoursSettings = ({ onClose, onSave }: { onClose: () => void; onSave: (hours: WorkingHours[]) => void }) => {
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: 'Lundi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Mardi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Mercredi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Jeudi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Vendredi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Samedi', enabled: false, start: '09:00', end: '12:00' },
    { day: 'Dimanche', enabled: false, start: '09:00', end: '12:00' },
  ]);

  const updateWorkingHours = (index: number, field: keyof WorkingHours, value: string | boolean) => {
    const updated = [...workingHours];
    updated[index] = { ...updated[index], [field]: value };
    setWorkingHours(updated);
  };

  const resetToDefault = () => {
    setWorkingHours([
      { day: 'Lundi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { day: 'Mardi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { day: 'Mercredi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { day: 'Jeudi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { day: 'Vendredi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { day: 'Samedi', enabled: false, start: '09:00', end: '12:00' },
      { day: 'Dimanche', enabled: false, start: '09:00', end: '12:00' },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Horaires de Travail</CardTitle>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={resetToDefault}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {workingHours.map((hours, index) => (
              <div key={hours.day} className="flex items-center space-x-4 p-4 border border-border-primary rounded-lg">
                <div className="w-20">
                  <span className="font-medium text-text-primary">{hours.day}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hours.enabled}
                    onChange={(e) => updateWorkingHours(index, 'enabled', e.target.checked)}
                    className="rounded"
                  />
                  {hours.enabled ? (
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      Ouvert
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-red-700 bg-red-100">
                      Fermé
                    </Badge>
                  )}
                </div>
                
                {hours.enabled && (
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-text-muted" />
                      <label className="text-sm text-text-muted">Début:</label>
                      <input
                        type="time"
                        value={hours.start}
                        onChange={(e) => updateWorkingHours(index, 'start', e.target.value)}
                        className="border border-border-primary rounded px-2 py-1 text-sm"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-text-muted">Fin:</label>
                      <input
                        type="time"
                        value={hours.end}
                        onChange={(e) => updateWorkingHours(index, 'end', e.target.value)}
                        className="border border-border-primary rounded px-2 py-1 text-sm"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-text-muted">Pause:</label>
                      <input
                        type="time"
                        value={hours.breakStart || ''}
                        onChange={(e) => updateWorkingHours(index, 'breakStart', e.target.value)}
                        className="border border-border-primary rounded px-2 py-1 text-sm"
                        placeholder="Début"
                      />
                      <span className="text-text-muted">-</span>
                      <input
                        type="time"
                        value={hours.breakEnd || ''}
                        onChange={(e) => updateWorkingHours(index, 'breakEnd', e.target.value)}
                        className="border border-border-primary rounded px-2 py-1 text-sm"
                        placeholder="Fin"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4 border-t border-border-primary">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={() => onSave(workingHours)} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Sauvegarder</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkingHoursSettings;

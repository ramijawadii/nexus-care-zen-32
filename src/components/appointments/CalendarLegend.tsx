
import React from 'react';

const CalendarLegend = () => {
  const statusItems = [
    { label: 'Confirmed', color: 'bg-green-500', textColor: 'text-green-700' },
    { label: 'Pending', color: 'bg-orange-500', textColor: 'text-orange-700' },
    { label: 'Completed', color: 'bg-blue-500', textColor: 'text-blue-700' },
    { label: 'Cancelled', color: 'bg-red-500', textColor: 'text-red-700' },
    { label: 'No Show', color: 'bg-gray-500', textColor: 'text-gray-700' },
    { label: 'Break/Lunch', color: 'bg-purple-500', textColor: 'text-purple-700' },
    { label: 'Personal', color: 'bg-indigo-500', textColor: 'text-indigo-700' },
  ];

  return (
    <div className="flex items-center justify-between bg-surface-elevated p-4 rounded-lg border border-border-primary">
      <div className="flex items-center space-x-6 flex-wrap gap-y-2">
        {statusItems.map((item) => (
          <div key={item.label} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-sm text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="text-sm text-text-muted">
        💡 Drag to reschedule • Double-click to edit • Right-click for options
      </div>
    </div>
  );
};

export default CalendarLegend;

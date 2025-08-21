
import React from 'react';
import { ComponentData } from '../CustomViewBuilder';
import DraggableComponent from './DraggableComponent';

interface ViewCanvasProps {
  components: ComponentData[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentData>) => void;
  onDeleteComponent: (id: string) => void;
}

const ViewCanvas: React.FC<ViewCanvasProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent
}) => {
  return (
    <div 
      className="h-full relative bg-gray-50 overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectComponent(null);
        }
      }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          component={component}
          isSelected={selectedComponent === component.id}
          onSelect={() => onSelectComponent(component.id)}
          onUpdate={(updates) => onUpdateComponent(component.id, updates)}
          onDelete={() => onDeleteComponent(component.id)}
        />
      ))}

      {components.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium mb-2">Canvas Vide</div>
            <div className="text-sm">
              Glissez des composants depuis la barre latérale pour commencer
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCanvas;

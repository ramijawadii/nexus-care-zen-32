
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Move, Settings } from 'lucide-react';
import { ComponentData } from '../CustomViewBuilder';
import ExcelSheet from './ExcelSheet';
import ComponentChart from './ComponentChart';
import ComponentTable from './ComponentTable';

interface DraggableComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<ComponentData>) => void;
  onDelete: () => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onUpdate,
  onDelete
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - component.position.x,
      y: e.clientY - component.position.y
    });
    onSelect();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    onUpdate({
      position: {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const renderComponentContent = () => {
    switch (component.type) {
      case 'table':
        return <ComponentTable component={component} onUpdate={onUpdate} />;
      case 'chart':
        return <ComponentChart component={component} onUpdate={onUpdate} />;
      case 'sheet':
        return <ExcelSheet component={component} onUpdate={onUpdate} />;
      default:
        return <div>Unknown component type</div>;
    }
  };

  return (
    <div
      className={`absolute cursor-move ${isSelected ? 'z-20' : 'z-10'}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: component.size.width,
        height: component.size.height
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <Card className={`h-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        <CardHeader className="p-2 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm capitalize">
              {component.type === 'sheet' ? 'Feuille de Calcul' : 
               component.type === 'table' ? 'Tableau' : 'Graphique'}
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="w-3 h-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 h-full overflow-hidden">
          {renderComponentContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default DraggableComponent;

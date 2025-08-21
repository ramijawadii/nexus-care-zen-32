
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { ComponentData } from '../CustomViewBuilder';

interface ExcelSheetProps {
  component: ComponentData;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

interface CellData {
  value: string;
  formula?: string;
  computed?: number;
  style?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    align?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    textColor?: string;
  };
}

const ExcelSheet: React.FC<ExcelSheetProps> = ({ component, onUpdate }) => {
  const [cells, setCells] = useState<{ [key: string]: CellData }>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [formulaBar, setFormulaBar] = useState('');

  const rows = 30;
  const cols = 15;
  const colLetters = 'ABCDEFGHIJKLMNO'.split('');

  useEffect(() => {
    if (component.data?.cells) {
      setCells(component.data.cells);
    }
  }, [component.data]);

  const getCellKey = (row: number, col: number) => `${colLetters[col]}${row + 1}`;

  const evaluateFormula = (formula: string, cellsData: { [key: string]: CellData }): number => {
    try {
      let expression = formula.slice(1); // Remove '=' prefix
      
      // Replace cell references with values
      const cellPattern = /[A-O][0-9]+/g;
      expression = expression.replace(cellPattern, (match) => {
        const cell = cellsData[match];
        const value = (cell?.computed ?? parseFloat(cell?.value || '0')) || 0;
        return value.toString();
      });

      // Enhanced functions
      expression = expression.replace(/SUM\(([A-O][0-9]+):([A-O][0-9]+)\)/g, (match, start, end) => {
        const startCol = start.charCodeAt(0) - 65;
        const startRow = parseInt(start.slice(1)) - 1;
        const endCol = end.charCodeAt(0) - 65;
        const endRow = parseInt(end.slice(1)) - 1;
        
        let sum = 0;
        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const cellKey = getCellKey(r, c);
            const cell = cellsData[cellKey];
            sum += (cell?.computed ?? parseFloat(cell?.value || '0')) || 0;
          }
        }
        return sum.toString();
      });

      // AVERAGE function
      expression = expression.replace(/AVERAGE\(([A-O][0-9]+):([A-O][0-9]+)\)/g, (match, start, end) => {
        const startCol = start.charCodeAt(0) - 65;
        const startRow = parseInt(start.slice(1)) - 1;
        const endCol = end.charCodeAt(0) - 65;
        const endRow = parseInt(end.slice(1)) - 1;
        
        let sum = 0;
        let count = 0;
        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const cellKey = getCellKey(r, c);
            const cell = cellsData[cellKey];
            const value = (cell?.computed ?? parseFloat(cell?.value || '0')) || 0;
            sum += value;
            count++;
          }
        }
        return count > 0 ? (sum / count).toString() : '0';
      });

      // COUNT function
      expression = expression.replace(/COUNT\(([A-O][0-9]+):([A-O][0-9]+)\)/g, (match, start, end) => {
        const startCol = start.charCodeAt(0) - 65;
        const startRow = parseInt(start.slice(1)) - 1;
        const endCol = end.charCodeAt(0) - 65;
        const endRow = parseInt(end.slice(1)) - 1;
        
        let count = 0;
        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const cellKey = getCellKey(r, c);
            const cell = cellsData[cellKey];
            if (cell?.value && cell.value.trim() !== '') {
              count++;
            }
          }
        }
        return count.toString();
      });

      return Function(`"use strict"; return (${expression})`)();
    } catch (error) {
      return 0;
    }
  };

  const updateCell = (cellKey: string, value: string) => {
    const newCells = { ...cells };
    
    if (value.startsWith('=')) {
      newCells[cellKey] = {
        ...newCells[cellKey],
        value,
        formula: value,
        computed: evaluateFormula(value, newCells)
      };
    } else {
      newCells[cellKey] = {
        ...newCells[cellKey],
        value,
        computed: parseFloat(value) || 0
      };
    }

    // Recalculate all formulas
    Object.keys(newCells).forEach(key => {
      const cell = newCells[key];
      if (cell.formula) {
        cell.computed = evaluateFormula(cell.formula, newCells);
      }
    });

    setCells(newCells);
    onUpdate({
      data: { ...component.data, cells: newCells }
    });
  };

  const handleCellClick = (cellKey: string) => {
    setSelectedCell(cellKey);
    const cell = cells[cellKey];
    setFormulaBar(cell?.formula || cell?.value || '');
  };

  const handleFormulaSubmit = () => {
    if (selectedCell) {
      updateCell(selectedCell, formulaBar);
    }
  };

  const applyStyle = (styleProperty: keyof CellData['style'], value: any) => {
    if (!selectedCell) return;
    
    const newCells = { ...cells };
    if (!newCells[selectedCell]) {
      newCells[selectedCell] = { value: '' };
    }
    if (!newCells[selectedCell].style) {
      newCells[selectedCell].style = {};
    }
    
    // Type-safe style assignment
    const currentStyle = newCells[selectedCell].style!;
    switch (styleProperty) {
      case 'bold':
        currentStyle.bold = value as boolean;
        break;
      case 'italic':
        currentStyle.italic = value as boolean;
        break;
      case 'underline':
        currentStyle.underline = value as boolean;
        break;
      case 'align':
        currentStyle.align = value as 'left' | 'center' | 'right';
        break;
      case 'backgroundColor':
        currentStyle.backgroundColor = value as string;
        break;
      case 'textColor':
        currentStyle.textColor = value as string;
        break;
    }
    
    setCells(newCells);
    onUpdate({
      data: { ...component.data, cells: newCells }
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b p-2 bg-gray-50 flex items-center space-x-2">
        <Button
          size="sm"
          variant={cells[selectedCell || '']?.style?.bold ? 'default' : 'outline'}
          onClick={() => applyStyle('bold', !cells[selectedCell || '']?.style?.bold)}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={cells[selectedCell || '']?.style?.italic ? 'default' : 'outline'}
          onClick={() => applyStyle('italic', !cells[selectedCell || '']?.style?.italic)}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={cells[selectedCell || '']?.style?.underline ? 'default' : 'outline'}
          onClick={() => applyStyle('underline', !cells[selectedCell || '']?.style?.underline)}
        >
          <Underline className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <Button size="sm" variant="outline" onClick={() => applyStyle('align', 'left')}>
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => applyStyle('align', 'center')}>
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => applyStyle('align', 'right')}>
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Formula Bar */}
      <div className="border-b p-2 flex items-center space-x-2">
        <span className="text-sm font-medium min-w-16 px-2 py-1 bg-gray-100 rounded">
          {selectedCell || ''}
        </span>
        <Input
          value={formulaBar}
          onChange={(e) => setFormulaBar(e.target.value)}
          placeholder="Entrez une valeur ou formule (=SUM(A1:B5), =AVERAGE(A1:A10), =COUNT(A1:A10))"
          className="flex-1 h-8"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleFormulaSubmit();
            }
          }}
        />
        <Button size="sm" onClick={handleFormulaSubmit}>
          <Calculator className="w-4 h-4" />
        </Button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid border border-gray-300" style={{ gridTemplateColumns: `40px repeat(${cols}, 100px)` }}>
          {/* Header row */}
          <div className="bg-gray-100 border-r border-gray-300 text-center text-xs py-2 font-medium sticky top-0 z-10"></div>
          {colLetters.map((letter) => (
            <div key={letter} className="bg-gray-100 border-r border-gray-300 text-center text-xs py-2 font-medium sticky top-0 z-10">
              {letter}
            </div>
          ))}

          {/* Data rows */}
          {Array.from({ length: rows }, (_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Row number */}
              <div className="bg-gray-100 border-r border-b border-gray-300 text-center text-xs py-2 font-medium sticky left-0 z-10">
                {rowIndex + 1}
              </div>
              
              {/* Cells */}
              {colLetters.map((_, colIndex) => {
                const cellKey = getCellKey(rowIndex, colIndex);
                const cell = cells[cellKey];
                const displayValue = cell?.computed !== undefined ? cell.computed : (cell?.value || '');
                const style = cell?.style || {};
                
                return (
                  <div
                    key={cellKey}
                    className={`border-r border-b border-gray-300 h-8 ${
                      selectedCell === cellKey ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleCellClick(cellKey)}
                  >
                    <Input
                      value={displayValue}
                      onChange={(e) => updateCell(cellKey, e.target.value)}
                      className={`border-0 h-full rounded-none text-xs ${
                        style.bold ? 'font-bold' : ''
                      } ${
                        style.italic ? 'italic' : ''
                      } ${
                        style.underline ? 'underline' : ''
                      }`}
                      style={{
                        textAlign: style.align || 'left',
                        backgroundColor: style.backgroundColor || 'transparent',
                        color: style.textColor || 'inherit'
                      }}
                      onFocus={() => handleCellClick(cellKey)}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExcelSheet;

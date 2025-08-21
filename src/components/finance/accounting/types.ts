
export interface Column {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'calculated';
  options?: string[];
  formula?: (row: any, allRows?: any[]) => number | string;
  editable?: boolean;
  required?: boolean;
  format?: (value: any) => string;
}

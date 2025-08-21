export interface ComponentData {
  id: string;
  type: 'table' | 'chart' | 'sheet';
  position: { x: number; y: number };
  size: { width: number; height: number };
  data?: any;
  config?: any;
}

export interface ViewData {
  id: string;
  name: string;
  components: ComponentData[];
  layout: 'grid' | 'freeform';
}
export type ElementGroup =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

export interface Element {
  number: number;
  symbol: string;
  name: string;
  group: ElementGroup;
  period: number;
  atomicWeight: string;
  column: number;
  row: number;
  special?: boolean;
  specialRow?: number;
  specialColumn?: number;
}

export interface ElementGroupInfo {
  color: string;
  name: string;
  description: string;
}

// Update ElementCardProps to include both hover and select handlers
export interface ElementCardProps {
  element: Element;
  onHover?: (element: Element | null) => void;
  onSelect?: (element: Element) => void;
  isHovered?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  showFunMode?: boolean;
}

export interface ElementDetailProps {
  element: Element | null;
  onClose: () => void;
  elementGroups: Record<ElementGroup, ElementGroupInfo>;
  elementFacts: Record<string, string>;
}

export interface SidePanelProps {
  element: Element | null;
  elementGroups: Record<ElementGroup, ElementGroupInfo>;
  elementFacts: Record<string, string>;
  onClose?: () => void;
}

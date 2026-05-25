'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';

type OrderControlsProps = {
  order: number;
  onOrderChange: (order: number) => void;
  label?: string;
};

export default function OrderControls({ order, onOrderChange, label = 'Ирет' }: OrderControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-500">{label}</span>
      <input
        type="number"
        min={0}
        value={order}
        onChange={(e) => onOrderChange(Number(e.target.value) || 0)}
        className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm"
      />
      <button
        type="button"
        onClick={() => onOrderChange(order - 1)}
        className="rounded-lg border border-gray-200 p-1 hover:bg-gray-50"
        aria-label="Жогору"
      >
        <ChevronUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onOrderChange(order + 1)}
        className="rounded-lg border border-gray-200 p-1 hover:bg-gray-50"
        aria-label="Төмөн"
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

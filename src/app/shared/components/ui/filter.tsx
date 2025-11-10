"use client"

import { Checkbox } from "@/app/shared/components/ui/checkbox"
import { cn } from "@/app/shared/utils/utils"

export interface FilterItem {
  code: string;
  name: string;
}

export interface FilterProps {
  title: string;
  filters: FilterItem[];
  selectedFilters?: string[];
  className?: string;
  onFilterChange?: (filter: string, checked: boolean) => void;
}

export function Filter({ title, filters, selectedFilters = [], className, onFilterChange }: FilterProps) {
  return (
    <div className={cn(
      "p-6 min-w-[300px] bg-white-fg shadow-double rounded-medium mb-4",
      className
    )}>
      <h4 className="text-primary mb-3">{title}</h4>
      <div className="grid gap-2">
        {filters.map((filter, index) => (
          <Checkbox
            key={`filter-${index}`}
            id={`filter-${index}`}
            title={filter.name}
            defaultChecked={selectedFilters.includes(filter.code)}
            onChange={(checked) => onFilterChange?.(filter.code, checked)}
          />
        ))}
      </div>
    </div>
  )
} 
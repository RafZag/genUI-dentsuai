import React from 'react';
import { DentsuPlusIcon } from '@/components/icons/DentsuPlusIcon';

export interface SectionHeaderProps {
  children: React.ReactNode;
  colorClass?: string;
  plusIconColor?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeader({
  children,
  colorClass = 'text-white',
  plusIconColor = 'text-lightGray',
  className = '',
  as: Component = 'h2',
}: SectionHeaderProps) {
  return (
    <Component
      className={`text-3xl lg:text-4xl font-semibold ${colorClass} inline-flex items-start gap-5 leading-tight ${className}`}
    >
      <DentsuPlusIcon
        size={25}
        className={`shrink-0 ${plusIconColor}`}
        offsetY={6}
      />
      <span>{children}</span>
    </Component>
  );
}

export default SectionHeader;

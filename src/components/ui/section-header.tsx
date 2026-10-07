import React from 'react';
import { DentsuPlusIcon } from '@/components/icons/DentsuPlusIcon';
import { cn } from '@/lib/utils';

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
  className,
  as: Component = 'h2',
}: SectionHeaderProps) {
  return (
    <Component
      className={cn(
        'text-3xl lg:text-4xl font-semibold inline-flex items-start gap-4 sm:gap-5 leading-tight',
        colorClass,
        className
      )}
    >
      <DentsuPlusIcon
        size={24}
        className={cn('shrink-0 mt-1', plusIconColor)}
      />
      <span>{children}</span>
    </Component>
  );
}

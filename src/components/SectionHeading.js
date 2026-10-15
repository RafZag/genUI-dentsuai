'use client';

import PlusIcon from '@/components/PlusIcon';

export default function SectionHeading({ children, colorClass, plusIconColor }) {
  return (
    <h2 className={`text-3xl lg:text-4xl font-semibold ${colorClass} inline-flex items-start gap-5`}>
      <PlusIcon size={25} className={`shrink-0 ${plusIconColor}`} offsetY={6} />
      {children}
    </h2>
  );
}


import React from 'react';
import { Medication } from '@/types/medication';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface MedicationListItemProps {
  medication: Medication;
}

const MedicationListItem: React.FC<MedicationListItemProps> = ({ medication }) => {
  return (
    <div className="px-5 py-4 flex items-center justify-between group">
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {medication.name}
        </h3>
        {medication.form && (
          <p className="text-sm text-muted-foreground mt-1">{medication.form}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-xs">
          {medication.application}
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
      </div>
    </div>
  );
};

export default MedicationListItem;

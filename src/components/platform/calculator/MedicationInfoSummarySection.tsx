import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medication, CategoryInfo } from '@/types/medication';
import { AlertTriangle, Info, Pill } from 'lucide-react';

interface MedicationInfoSummarySectionProps {
  medication: Medication;
  categoryDisplayInfo: Omit<CategoryInfo, 'medicationsCount' | 'lastUpdated'>;
}

const MedicationInfoSummarySection: React.FC<MedicationInfoSummarySectionProps> = ({ medication, categoryDisplayInfo }) => {
  const CategoryIcon = categoryDisplayInfo.icon || Pill;

  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Informações resumidas</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-primary hover-lift">
          <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-primary/10">
              <CategoryIcon className={`h-5 w-5 ${categoryDisplayInfo.iconColorClass || 'text-primary'}`} />
            </div>
            <CardTitle className="text-base font-semibold">{medication.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {medication.description && medication.description.trim() !== "" ? (
              <p className="text-sm text-muted-foreground leading-relaxed">{medication.description}</p>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-red-500 hover-lift">
          <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-base text-red-600 dark:text-red-400 font-semibold">Alerta</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {medication.alerts && medication.alerts.length > 0 ? (
              <ul className="space-y-2">
                {medication.alerts.map((alert, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum alerta específico para este medicamento.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-blue-500 hover-lift">
           <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-800">
             <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
               <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
             </div>
            <CardTitle className="text-base text-blue-600 dark:text-blue-400 font-semibold">Apresentações</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {medication.form && medication.form.trim() !== "" ? (
              <p className="text-sm text-muted-foreground mb-2">{medication.form}</p>
            ) : null}
            {medication.commonBrandNames && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-sm">
                <span>🏷️</span>
                <span className="font-medium">{medication.commonBrandNames}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MedicationInfoSummarySection;

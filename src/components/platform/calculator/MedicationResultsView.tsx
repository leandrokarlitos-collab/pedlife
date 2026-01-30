
import React from 'react';
import { Medication, MedicationCategoryData } from '@/types/medication';
import CalculatorBreadcrumb from './CalculatorBreadcrumb';
import CalculatedDoseCard from './CalculatedDoseCard';
import PatientDataCard from './PatientDataCard';
import MedicationInfoResultsSection from './MedicationInfoResultsSection';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark } from 'lucide-react';

interface CalculationData {
  weight: number;
  age: number;
  calculatedDoseText: string;
  calculationTime: string;
  calculationDate: string;
  detailedCalculation?: string;
}

interface MedicationResultsViewProps {
  categorySlug: string;
  categoryData: MedicationCategoryData;
  medication: Medication;
  calculationData: CalculationData;
  handleReturnToForm: () => void;
}

const MedicationResultsView: React.FC<MedicationResultsViewProps> = ({
  categorySlug,
  categoryData,
  medication,
  calculationData,
  handleReturnToForm,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 min-h-full relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-2" style={{ top: '5%', left: '10%' }} />
        <div className="particle particle-3" style={{ top: '25%', right: '15%' }} />
        <div className="particle particle-1" style={{ bottom: '30%', left: '20%' }} />
      </div>

      <div className="relative z-10">
        <CalculatorBreadcrumb
          categorySlug={categorySlug}
          categoryTitle={categoryData.title}
          medicationSlug={medication.slug}
          medicationName={medication.name}
          isResultPage={true}
        />

        <div className="mb-8 flex justify-between items-center animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text-premium text-glow-strong mb-2">
              ✨ Resultado do Cálculo
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-violet-500 via-blue-500 to-transparent rounded-full relative overflow-hidden">
              <div className="absolute inset-0 shimmer-effect" />
            </div>
          </div>
          <Button variant="glass-premium" onClick={handleReturnToForm} className="ripple-effect">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retornar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-scale-in">
          <CalculatedDoseCard
            medication={medication}
            calculatedDoseText={calculationData.calculatedDoseText}
            detailedCalculation={calculationData.detailedCalculation}
          />
          <PatientDataCard calculationData={calculationData} />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <MedicationInfoResultsSection medication={medication} />
        </div>
        
        <div className="mt-10 flex justify-between items-center animate-fade-in flex-wrap gap-4" style={{ animationDelay: '400ms' }}>
          <div className="glass-card px-6 py-3 rounded-xl inline-flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span className="gradient-text-premium font-bold">Cálculo concluído com sucesso!</span>
          </div>
          
          <Button variant="glass-premium" className="ripple-effect badge-glow group hover-lift">
            <Bookmark className="mr-2 h-5 w-5 group-hover:fill-current transition-all duration-300" /> 
            <span className="gradient-text-premium font-bold text-base">Favoritar Medicamento</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicationResultsView;

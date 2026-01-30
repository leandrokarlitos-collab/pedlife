import React from 'react';
import { Medication } from '@/types/medication';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Copy, Calendar, Repeat, Route } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface CalculatedDoseCardProps {
  medication: Medication;
  calculatedDoseText: string;
  detailedCalculation?: string;
  parsedDose?: {
    amount: string;
    route?: string;
    period?: string;
    frequency?: string;
  };
}

// Função para copiar texto para a área de transferência
const copyToClipboard = (text: string, successMessage: string = "Texto copiado para a área de transferência!") => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(successMessage);
  }).catch(err => {
    console.error("Falha ao copiar texto: ", err);
    toast.error("Falha ao copiar texto.");
  });
};

const CalculatedDoseCard: React.FC<CalculatedDoseCardProps> = ({ 
  medication, 
  calculatedDoseText, 
  detailedCalculation, 
  parsedDose 
}) => {
  
  // Extrair informações do parsedDose ou usar valores padrão
  const doseAmount = parsedDose?.amount || calculatedDoseText;
  const doseRoute = parsedDose?.route || medication.application || "";
  const dosePeriod = parsedDose?.period || medication.dosageInformation?.treatmentDuration || "";
  const doseFrequency = parsedDose?.frequency || medication.dosageInformation?.doseInterval || "";

  // Texto para copiar com todas as informações relevantes
  const textToCopyAll = `
Medicamento: ${medication.name} ${medication.form ? `(${medication.form})` : ''}
Dosagem: ${doseAmount}
${doseRoute ? `Via de administração: ${doseRoute}\n` : ''}${dosePeriod ? `Período: ${dosePeriod}\n` : ''}${doseFrequency ? `Frequência: ${doseFrequency}\n` : ''}
  `.trim();

  return (
    <Card className="lg:col-span-2 border border-gray-200 dark:border-gray-800">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-3 right-3 z-10"
        onClick={() => copyToClipboard(textToCopyAll, "Dose calculada copiada!")}
        title="Copiar dose calculada completa"
      >
        <Copy className="h-4 w-4" />
      </Button>
      
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Pill className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">
            Dose Calculada
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          {medication.name} {medication.form && medication.form.trim() !== "" ? `(${medication.form})` : ''}
        </h2>
        
        {/* Dose em destaque */}
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg mb-4 relative">
          <div className="text-2xl font-bold text-primary text-center pr-8">
            {doseAmount}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3"
            onClick={() => copyToClipboard(doseAmount, "Dose copiada!")}
            title="Copiar dose"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Informações adicionais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Via de administração */}
          {doseRoute && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Route className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Via</p>
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{doseRoute}</p>
              </div>
            </div>
          )}
          
          {/* Período */}
          {dosePeriod && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                <Calendar className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Período</p>
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{dosePeriod}</p>
              </div>
            </div>
          )}
          
          {/* Frequência */}
          {doseFrequency && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                <Repeat className="h-4 w-4 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Frequência</p>
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{doseFrequency}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculatedDoseCard;

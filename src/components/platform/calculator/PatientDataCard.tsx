
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface CalculationDataForCard {
  weight: number;
  age: number;
  calculationDate: string;
  calculationTime: string;
}

interface PatientDataCardProps {
  calculationData: CalculationDataForCard;
}

// Adicionando a função de cópia com toast
const copyToClipboard = (text: string, successMessage: string = "Texto copiado para a área de transferência!") => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(successMessage);
  }).catch(err => {
    console.error("Falha ao copiar texto: ", err);
    toast.error("Falha ao copiar texto.");
  });
};

const PatientDataCard: React.FC<PatientDataCardProps> = ({ calculationData }) => {
  const textToCopy = `
Dados do Paciente:
- Peso: ${calculationData.weight} kg
- Idade: ${calculationData.age} anos
- Data do cálculo: ${calculationData.calculationDate}
- Horário: ${calculationData.calculationTime}
  `.trim();
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-3 right-3 z-10"
        onClick={() => copyToClipboard(textToCopy, "Dados do paciente copiados!")}
        title="Copiar dados do paciente"
      >
        <Copy className="h-4 w-4" />
      </Button>
      
      <CardHeader className="border-b border-gray-200 dark:border-gray-800">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <span className="text-lg">👤</span>
          Dados do Paciente
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-sm space-y-3 pt-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Peso:</span>
          <span className="font-semibold">{calculationData.weight} kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Idade:</span>
          <span className="font-semibold">{calculationData.age} anos</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Data:</span>
          <span className="font-semibold">{calculationData.calculationDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Horário:</span>
          <span className="font-semibold">{calculationData.calculationTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDataCard;

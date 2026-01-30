import React from 'react';
import { Medication } from '@/types/medication';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface MedicationInfoResultsSectionProps {
  medication: Medication;
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

const MedicationInfoResultsSection: React.FC<MedicationInfoResultsSectionProps> = ({ medication }) => {
  const medicationInfoToCopy = `
Informações do Medicamento: ${medication.name}
${medication.description && medication.description.trim() !== "" ? `Descrição: ${medication.description}` : ''}
${medication.alerts && medication.alerts.length > 0 ? `Alertas: ${medication.alerts.join(', ')}` : ''}
  `.trim();

  const observationsToCopy = `
Observações (${medication.name}):
${medication.dosageInformation?.administrationNotes || 
`Tomar com ou sem alimentos, conforme orientação.
Completar todo o tratamento prescrito.
Manter em temperatura ambiente, salvo indicação contrária.`}
  `.trim();

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-extrabold gradient-text-premium text-glow">Informações do Medicamento</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 via-blue-500/30 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 shimmer-effect" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 relative glass-card-premium noise-texture corner-accent group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-blue-500/5 opacity-50" />
          
           <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 glass-button z-20"
            onClick={() => copyToClipboard(medicationInfoToCopy, "Informações do medicamento copiadas!")}
            title="Copiar informações do medicamento"
          >
            <Copy className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </Button>
          <CardHeader className="border-b border-white/10 relative z-10">
            <CardTitle className="text-xl gradient-text-premium font-bold">{medication.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 relative z-10 space-y-4">
            {medication.description && medication.description.trim() !== "" && (
              <div className="glass-card p-4 rounded-xl">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {medication.description}
                </p>
              </div>
            )}
            {medication.alerts && medication.alerts.length > 0 && (
              <div className="glass-card p-4 rounded-xl border-l-2 border-red-500">
                <h4 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                  <span>⚠️</span> Alertas Importantes
                </h4>
                <ul className="space-y-2">
                  {medication.alerts.map((alert, index) => (
                    <li key={index} className="text-sm text-red-500 dark:text-red-400 flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{alert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="relative glass-card-premium corner-accent group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-50" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 glass-button z-20"
            onClick={() => copyToClipboard(observationsToCopy, "Observações copiadas!")}
            title="Copiar observações"
          >
            <Copy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </Button>
          <CardHeader className="border-b border-white/10 relative z-10">
            <CardTitle className="text-lg font-bold gradient-text-premium flex items-center gap-2">
              <span className="icon-glass-bg p-2 rounded-lg">📝</span>
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3 pt-6 relative z-10">
            {medication.dosageInformation?.administrationNotes ? (
              <p>{medication.dosageInformation.administrationNotes}</p>
            ) : (
              <>
                <p>Tomar com ou sem alimentos, conforme orientação.</p>
                <p>Completar todo o tratamento prescrito.</p>
                <p>Manter em temperatura ambiente, salvo indicação contrária.</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MedicationInfoResultsSection;

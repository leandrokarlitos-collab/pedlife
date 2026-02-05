
import React from 'react';
import { Medication } from '@/types/medication';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Bot, Calculator, Scale, User, Clock } from 'lucide-react';

interface MedicationDetailsSideCardProps {
  medication: Medication;
}

// Função para determinar o que é relevante para o cálculo baseado na lógica
const getRelevantForCalculation = (medication: Medication): string => {
  const logica = medication.calculationParams?.logica_js || '';
  const usualDose = medication.dosageInformation?.usualDose || '';

  const hasPeso = logica.includes('peso') || usualDose.toLowerCase().includes('kg');
  const hasIdade = logica.includes('idade') ||
                   usualDose.toLowerCase().includes('anos') ||
                   usualDose.toLowerCase().includes('meses') ||
                   usualDose.toLowerCase().includes('idade');

  if (hasPeso && hasIdade) return 'Peso e idade';
  if (hasPeso) return 'Somente peso';
  if (hasIdade) return 'Somente idade';
  return 'Dose fixa';
};

const MedicationDetailsSideCard: React.FC<MedicationDetailsSideCardProps> = ({ medication }) => {
  const calcParams = medication.calculationParams;
  const relevantFor = getRelevantForCalculation(medication);

  return (
    <Card className="border border-gray-200 dark:border-gray-800 sticky top-20">
      <CardHeader className="border-b border-gray-200 dark:border-gray-800">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <span className="text-lg">ℹ️</span>
          Informações do Medicamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm pt-6">
        {/* Nome do Medicamento */}
        <div className="space-y-1">
          <Label className="font-semibold text-xs text-muted-foreground uppercase">Nome</Label>
          <p className="text-gray-900 dark:text-gray-100 font-medium">{medication.name}</p>
        </div>

        {/* Seção Padronizada de Dosagem */}
        <div className="space-y-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-medium text-xs uppercase">
            <Calculator className="h-3.5 w-3.5" />
            Informações de Dosagem
          </div>

          {/* Dosagem Usual */}
          {medication.dosageInformation?.usualDose && (
            <div className="space-y-1">
              <Label className="font-semibold text-xs text-muted-foreground uppercase flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                Dosagem usual
              </Label>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">{medication.dosageInformation.usualDose}</p>
            </div>
          )}

          {/* Dosagem Máxima */}
          {calcParams?.doseMaxima && (
            <div className="space-y-1">
              <Label className="font-semibold text-xs text-red-600 dark:text-red-400 uppercase flex items-center gap-1.5">
                <Scale className="h-3 w-3" />
                Dosagem máxima
              </Label>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">{calcParams.doseMaxima}</p>
            </div>
          )}

          {/* Dosagem Mínima */}
          {calcParams?.doseMinima && (
            <div className="space-y-1">
              <Label className="font-semibold text-xs text-green-600 dark:text-green-400 uppercase flex items-center gap-1.5">
                <Scale className="h-3 w-3" />
                Dosagem mínima
              </Label>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">{calcParams.doseMinima}</p>
            </div>
          )}

          {/* Lógica de Cálculo */}
          {calcParams?.logica_js && (
            <div className="space-y-1">
              <Label className="font-semibold text-xs text-purple-600 dark:text-purple-400 uppercase flex items-center gap-1.5">
                <Calculator className="h-3 w-3" />
                Lógica de cálculo
              </Label>
              <p className="text-gray-900 dark:text-gray-100 text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {calcParams.logica_js.replace(/^"|"$/g, '').replace(/\\"/g, '"')}
              </p>
            </div>
          )}

          {/* Relevante para o Cálculo */}
          <div className="space-y-1">
            <Label className="font-semibold text-xs text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5">
              <User className="h-3 w-3" />
              Relevante para o cálculo
            </Label>
            <p className="text-gray-900 dark:text-gray-100 font-medium">{relevantFor}</p>
          </div>
        </div>

        {/* Intervalo */}
        {medication.dosageInformation?.doseInterval && (
          <div className="space-y-1">
            <Label className="font-semibold text-xs text-muted-foreground uppercase">Intervalo</Label>
            <p className="text-gray-900 dark:text-gray-100">{medication.dosageInformation.doseInterval}</p>
          </div>
        )}

        {/* Duração */}
        {medication.dosageInformation?.treatmentDuration && (
          <div className="space-y-1">
            <Label className="font-semibold text-xs text-muted-foreground uppercase">Duração</Label>
            <p className="text-gray-900 dark:text-gray-100">{medication.dosageInformation.treatmentDuration}</p>
          </div>
        )}

        {/* Notas de Administração */}
        {medication.dosageInformation?.administrationNotes && (
          <div className="space-y-1">
            <Label className="font-semibold text-xs text-muted-foreground uppercase">Notas de Administração</Label>
            <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{medication.dosageInformation.administrationNotes}</p>
          </div>
        )}
        <div className="pt-6">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-center mb-3">
            <p className="text-sm text-muted-foreground font-medium mb-1">💭 Paciente alérgico?</p>
            <p className="text-xs text-muted-foreground">Consulte o assistente inteligente</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full">
                <Bot className="mr-2 h-4 w-4" /> Auxílio do Lifebot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:border-gray-700">
              <DialogHeader>
                <DialogTitle className="flex items-center dark:text-gray-100">
                  <Bot className="mr-2 h-5 w-5 text-primary" /> Lifebot Assistente
                </DialogTitle>
                <DialogDescription className="dark:text-gray-300">
                  Informações sobre {medication.name} e possíveis interações alérgicas.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-2">
                <p className="text-sm font-semibold dark:text-gray-100">Medicamento: {medication.name}</p>
                {medication.description && (
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    <strong>Descrição:</strong> {medication.description}
                  </p>
                )}
                <p className="text-sm text-muted-foreground dark:text-gray-300 pt-2">
                  Aqui o Lifebot forneceria informações detalhadas sobre alergias, interações medicamentosas comuns e outras considerações importantes para o medicamento {medication.name}.
                </p>
                 {medication.alerts && medication.alerts.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">Alertas Importantes:</p>
                    <ul className="list-disc list-inside text-sm text-red-500 dark:text-red-400 pl-4">
                      {medication.alerts.map((alert, index) => (
                        <li key={index}>{alert}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationDetailsSideCard;

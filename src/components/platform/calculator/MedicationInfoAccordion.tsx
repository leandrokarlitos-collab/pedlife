import React, { useState } from 'react';
import { Medication } from '@/types/medication';
import { ChevronDown, Pill, AlertTriangle, FileText, Beaker, Clock, Info, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
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
import { Button } from "@/components/ui/button";

interface MedicationInfoAccordionProps {
  medication: Medication;
  detailedCalculation?: string;
}

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  badgeColor?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  icon,
  iconColor,
  children,
  defaultOpen = false,
  badge,
  badgeColor = 'bg-slate-100 text-slate-600',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn(
      "rounded-xl overflow-hidden transition-all duration-200",
      "bg-white/60 dark:bg-slate-800/80",
      "border border-slate-200/50 dark:border-slate-600/60",
      "shadow-sm dark:shadow-black/20",
      isOpen && "ring-1 ring-violet-500/20"
    )}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 p-4 text-left transition-colors",
          "hover:bg-slate-50 dark:hover:bg-slate-800/60"
        )}
      >
        <div className={cn("p-2 rounded-lg", iconColor)}>
          {icon}
        </div>
        <span className="flex-1 font-medium text-slate-800 dark:text-slate-200">
          {title}
        </span>
        {badge && (
          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", badgeColor)}>
            {badge}
          </span>
        )}
        <ChevronDown className={cn(
          "h-5 w-5 text-slate-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      <div className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 pb-4 pt-0">
          <div className="pl-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const MedicationInfoAccordion: React.FC<MedicationInfoAccordionProps> = ({
  medication,
  detailedCalculation,
}) => {
  const hasAlerts = medication.alerts && medication.alerts.length > 0;
  const hasDosageInfo = medication.dosageInformation;
  const hasAdminNotes = medication.dosageInformation?.administrationNotes;

  return (
    <div className="space-y-3">
      {/* Posologia */}
      {hasDosageInfo && (
        <AccordionItem
          title="Posologia"
          icon={<Pill className="h-4 w-4 text-violet-600 dark:text-violet-400" />}
          iconColor="bg-violet-100 dark:bg-violet-900/30"
          defaultOpen={true}
        >
          <div className="space-y-3 text-sm">
            {medication.dosageInformation?.usualDose && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-400 min-w-[120px]">Dose usual:</span>
                <span className="text-slate-800 dark:text-slate-200 whitespace-pre-line">{medication.dosageInformation.usualDose}</span>
              </div>
            )}
            {/* Dose Máxima */}
            {medication.calculationParams?.doseMaxima && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-red-600 dark:text-red-400 min-w-[120px]">Dose máxima:</span>
                <span className="text-slate-800 dark:text-slate-200 whitespace-pre-line">{medication.calculationParams.doseMaxima}</span>
              </div>
            )}
            {/* Dose Mínima */}
            {medication.calculationParams?.doseMinima && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-green-600 dark:text-green-400 min-w-[120px]">Dose mínima:</span>
                <span className="text-slate-800 dark:text-slate-200 whitespace-pre-line">{medication.calculationParams.doseMinima}</span>
              </div>
            )}
            {/* Lógica de Cálculo */}
            {medication.calculationParams?.formulaCalculo && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-purple-600 dark:text-purple-400 min-w-[120px]">Lógica de cálculo:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{medication.calculationParams.formulaCalculo}</span>
              </div>
            )}
            {medication.dosageInformation?.doseInterval && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-400 min-w-[120px]">Intervalo:</span>
                <span className="text-slate-800 dark:text-slate-200">{medication.dosageInformation.doseInterval}</span>
              </div>
            )}
            {medication.dosageInformation?.treatmentDuration && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-400 min-w-[120px]">Duração:</span>
                <span className="text-slate-800 dark:text-slate-200">{medication.dosageInformation.treatmentDuration}</span>
              </div>
            )}
            {medication.dosageInformation?.concentration && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-400 min-w-[120px]">Concentração:</span>
                <span className="text-slate-800 dark:text-slate-200">{medication.dosageInformation.concentration}</span>
              </div>
            )}
          </div>
        </AccordionItem>
      )}

      {/* Alertas e Contraindicações */}
      <AccordionItem
        title="Alertas e Contraindicações"
        icon={<AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />}
        iconColor="bg-red-100 dark:bg-red-900/30"
        badge={hasAlerts ? `${medication.alerts?.length}` : undefined}
        badgeColor="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
      >
        {hasAlerts ? (
          <ul className="space-y-2">
            {medication.alerts?.map((alert, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <span className="text-slate-700 dark:text-slate-300">{alert}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nenhum alerta específico para este medicamento.
          </p>
        )}
      </AccordionItem>

      {/* Notas de Administração */}
      {hasAdminNotes && (
        <AccordionItem
          title="Notas de Administração"
          icon={<FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
          iconColor="bg-blue-100 dark:bg-blue-900/30"
        >
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {medication.dosageInformation?.administrationNotes}
          </p>
        </AccordionItem>
      )}

      {/* Detalhes do Cálculo */}
      {detailedCalculation && (
        <AccordionItem
          title="Detalhes do Cálculo"
          icon={<Beaker className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
          iconColor="bg-emerald-100 dark:bg-emerald-900/30"
        >
          <pre className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap font-mono bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
            {detailedCalculation}
          </pre>
        </AccordionItem>
      )}

      {/* Descrição do medicamento */}
      {medication.description && (
        <AccordionItem
          title="Sobre o Medicamento"
          icon={<Info className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
          iconColor="bg-slate-100 dark:bg-slate-800"
        >
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {medication.description}
          </p>
        </AccordionItem>
      )}

      {/* Botão Lifebot */}
      <div className={cn(
        "p-4 rounded-xl",
        "bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/40 dark:to-blue-900/40",
        "border border-violet-200/50 dark:border-violet-600/50",
        "shadow-sm dark:shadow-black/20"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/40">
              <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Paciente alérgico? Dúvidas sobre interações?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Consulte o assistente inteligente
              </p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="bg-violet-600 hover:bg-violet-700">
                <Bot className="mr-2 h-4 w-4" /> Lifebot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-slate-800 dark:border-slate-700">
              <DialogHeader>
                <DialogTitle className="flex items-center dark:text-slate-100">
                  <Bot className="mr-2 h-5 w-5 text-violet-500" /> Lifebot Assistente
                </DialogTitle>
                <DialogDescription className="dark:text-slate-300">
                  Informações sobre {medication.name} e possíveis interações.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-3">
                <p className="text-sm font-semibold dark:text-slate-100">
                  Medicamento: {medication.name}
                </p>
                {medication.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <strong>Descrição:</strong> {medication.description}
                  </p>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-300 pt-2">
                  O Lifebot fornecerá informações detalhadas sobre alergias, interações medicamentosas e outras considerações importantes.
                </p>
                {hasAlerts && (
                  <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                      ⚠️ Alertas Importantes:
                    </p>
                    <ul className="space-y-1">
                      {medication.alerts?.map((alert, index) => (
                        <li key={index} className="text-sm text-red-600 dark:text-red-400">
                          • {alert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MedicationInfoAccordion;

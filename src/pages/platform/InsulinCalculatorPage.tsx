
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Droplets } from 'lucide-react';

import InsulinPageBreadcrumb from '@/components/platform/insulin-calculator/InsulinPageBreadcrumb';
import InsulinCalculatorForm, { insulinFormSchema, InsulinFormValues } from '@/components/platform/insulin-calculator/InsulinCalculatorForm';
import InsulinCalculationResults, { CalculatedValues } from '@/components/platform/insulin-calculator/InsulinCalculationResults';
import ImportantNotesCard from '@/components/platform/insulin-calculator/ImportantNotesCard';
import ProtocolTable from '@/components/platform/insulin-calculator/ProtocolTable';
import DoseAdjustmentTable from '@/components/platform/insulin-calculator/DoseAdjustmentTable';
import { FeedbackSection } from '@/components/ui/FeedbackSection';

const protocolData = [
  { condition: "GLICEMIA ≥ 180 MG/DL", conduct: "CONDUTA (VIDE TABELA 2)" },
  { condition: "GLICEMIA ↑", conduct: "↑ “2 X Δ”" },
  { condition: "GLICEMIA INALTERADA OU GLICEMIA ↓ DE 1 - 40 MG/DL/H", conduct: "↑ “1 X Δ”" },
  { condition: "GLICEMIA ↓ DE 41 - 80 MG/DL/H", conduct: "NÃO ALTERA" },
  { condition: "GLICEMIA ↓ DE 81 - 120 MG/DL/H", conduct: "↓ “1 X Δ”" },
  { condition: "GLICEMIA ↓ + DE 120 MG/DL/H", conduct: "PARA A INFUSÃO POR 30 MIN. E REINICIE ↓ “2 X Δ”" },
];

const doseAdjustmentData = [
  { doseRange: "< 0,04 UI/KG/H", deltaML: "4,2 ML", twoDeltaML: "8,4 ML" },
  { doseRange: "0,04 - 0,08 UI/KG/H", deltaML: "8,4 ML", twoDeltaML: "16,8 ML" },
  { doseRange: "0,09 - 0,13 UI/KG/H", deltaML: "12,6 ML", twoDeltaML: "25,2 ML" },
  { doseRange: "0,14 - 0,2 UI/KG/H", deltaML: "16,8 ML", twoDeltaML: "33,6 ML" },
  { doseRange: "0,21 - 0,27 UI/KG/H", deltaML: "25,2 ML", twoDeltaML: "50,4 ML" },
  { doseRange: "0,28 - 0,35 UI/KG/H", deltaML: "33,6 ML", twoDeltaML: "67,2 ML" },
  { doseRange: "> 0,35 UI/KG/H", deltaML: "42 ML", twoDeltaML: "84 ML" },
];

const InsulinCalculatorPage: React.FC = () => {
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues | null>(null);

  const form = useForm<InsulinFormValues>({
    resolver: zodResolver(insulinFormSchema),
    defaultValues: {
      peso: undefined,
      glicemia: undefined,
      taxaInfusaoUIKgH: 0.036,
    },
  });

  const onSubmit = (values: InsulinFormValues) => {
    const doseUIH = values.taxaInfusaoUIKgH * values.peso;
    const adminBICMlH = doseUIH * 10; // Baseado em 25 UI em 250 ML (0.1 UI/ML)

    setCalculatedValues({
      doseInsulinaUIH: doseUIH.toFixed(2),
      administracaoBICMlH: adminBICMlH.toFixed(1),
      solucaoInsulina: "INSULINA REGULAR 25 UI + SF 0,9% 250 ML",
    });
    console.log("Form submitted, calculated values:", {
      doseInsulinaUIH: doseUIH.toFixed(2),
      administracaoBICMlH: adminBICMlH.toFixed(1),
      solucaoInsulina: "INSULINA REGULAR 25 UI + SF 0,9% 250 ML",
    });
  };
  
  console.log("Current calculatedValues state:", calculatedValues);
  console.log("Current form values for taxaInfusaoUIKgH:", form.getValues("taxaInfusaoUIKgH"));


  return (
    <div className="container mx-auto py-12 px-4 relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1" style={{ top: '8%', left: '12%' }} />
        <div className="particle particle-3" style={{ top: '35%', right: '18%' }} />
        <div className="particle particle-2" style={{ bottom: '25%', left: '22%' }} />
        <div className="particle particle-1" style={{ top: '70%', right: '25%' }} />
      </div>

      <div className="relative z-10">
        {/* Breadcrumb */}
        <InsulinPageBreadcrumb />

        {/* Header */}
        <header className="mb-10 text-center animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="icon-glass-bg p-5 rounded-2xl animate-pulse-glow corner-accent">
              <Droplets className="h-16 w-16 text-violet-600 dark:text-violet-400 drop-shadow-2xl" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-indigo-500/20 blur-2xl rounded-full opacity-50 -z-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold gradient-text-premium mb-4 text-glow-strong tracking-tight">
            Referencial para Insulina
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Cálculos automáticos baseados no
            <span className="gradient-text-accent font-semibold"> peso e valor glicêmico</span> para infusão de insulina.
          </p>

          {/* Decorative line with shimmer */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 shimmer-effect" />
            </div>
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-75" />
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 shimmer-effect" />
            </div>
          </div>
        </header>

        {/* Calculadora */}
        <div className="max-w-4xl mx-auto">
          <InsulinCalculatorForm form={form} onSubmit={onSubmit} />

          {calculatedValues && (
            <InsulinCalculationResults
              calculatedValues={calculatedValues}
              taxaInfusaoUIKgH={form.getValues("taxaInfusaoUIKgH")}
            />
          )}

          <ImportantNotesCard />

          <div className="grid md:grid-cols-1 gap-6">
            <ProtocolTable data={protocolData} />
            <DoseAdjustmentTable data={doseAdjustmentData} />
          </div>

          {/* Seção de Feedback */}
          <div className="mt-12 mb-6">
            <FeedbackSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsulinCalculatorPage;

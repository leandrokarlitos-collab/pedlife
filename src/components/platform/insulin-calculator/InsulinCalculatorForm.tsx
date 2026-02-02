import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const insulinFormSchema = z.object({
  peso: z.coerce.number().positive({ message: "Peso deve ser um número positivo." }).min(0.1, "Peso deve ser maior que zero."),
  glicemia: z.coerce.number().positive({ message: "Glicemia deve ser um número positivo." }).min(1, "Glicemia deve ser maior que zero."),
  taxaInfusaoUIKgH: z.coerce.number().positive({ message: "Taxa de infusão deve ser positiva." }).min(0.001, "Taxa de infusão deve ser maior que zero."),
});

export type InsulinFormValues = z.infer<typeof insulinFormSchema>;

interface InsulinCalculatorFormProps {
  form: UseFormReturn<InsulinFormValues>;
  onSubmit: (values: InsulinFormValues) => void;
}

const InsulinCalculatorForm: React.FC<InsulinCalculatorFormProps> = ({ form, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl mb-8 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-white/10 ring-1 ring-inset ring-white/20 dark:ring-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(99,102,241,0.08)]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/30 dark:border-white/10">
        <div className="flex items-center gap-3">
          <img
            src="/icons/flebotomia.png"
            alt="Calculadora de Insulina"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Calculadora de Insulina
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Informe os dados do paciente para calcular a dose
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="peso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="peso" className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                      Peso (KG)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="peso"
                        type="number"
                        placeholder="Ex: 42"
                        {...field}
                        className="text-base py-3 bg-white/50 dark:bg-slate-700/50 border-slate-200/50 dark:border-slate-600/50 focus:border-slate-400 focus:ring-slate-400/20 rounded-xl"
                        step="0.1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="glicemia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="glicemia" className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                      Glicemia (MG/DL)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="glicemia"
                        type="number"
                        placeholder="Ex: 360"
                        {...field}
                        className="text-base py-3 bg-white/50 dark:bg-slate-700/50 border-slate-200/50 dark:border-slate-600/50 focus:border-slate-400 focus:ring-slate-400/20 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxaInfusaoUIKgH"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="taxaInfusaoUIKgH" className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                      Taxa de Infusão (UI/KG/H)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="taxaInfusaoUIKgH"
                        type="number"
                        placeholder="Ex: 0.036"
                        {...field}
                        className="text-base py-3 bg-white/50 dark:bg-slate-700/50 border-slate-200/50 dark:border-slate-600/50 focus:border-slate-400 focus:ring-slate-400/20 rounded-xl"
                        step="0.001"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
              <Button
                type="submit"
                className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300"
              >
Calcular
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="flex-1 sm:flex-none text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 py-3 px-8 rounded-xl transition-all duration-300"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InsulinCalculatorForm;

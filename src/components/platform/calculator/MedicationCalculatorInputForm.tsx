
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';
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
import { ArrowLeft } from 'lucide-react';

type FormValues = {
  weight: number;
  age: number;
};

interface MedicationCalculatorInputFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
  navigate: NavigateFunction;
}

const MedicationCalculatorInputForm = ({ 
  form, 
  onSubmit, 
  navigate 
}: MedicationCalculatorInputFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="weight" className="font-medium text-sm flex items-center gap-2">
                <span>⚖️</span> Peso (kg)
              </FormLabel>
              <FormControl>
                <Input 
                  id="weight" 
                  type="number" 
                  placeholder="Digite o peso do paciente" 
                  {...field} 
                  className="text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="age" className="font-medium text-sm flex items-center gap-2">
                <span>🎂</span> Idade (anos)
              </FormLabel>
              <FormControl>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Digite a idade do paciente" 
                  {...field} 
                  className="text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button 
            type="submit" 
            className="w-full sm:flex-1"
          >
            Calcular Dose
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MedicationCalculatorInputForm;

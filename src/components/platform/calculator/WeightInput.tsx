import React from 'react';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeightInputProps {
  value: number;
  onChange: (weight: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const WeightInput: React.FC<WeightInputProps> = ({
  value,
  onChange,
  min = 0.1,
  max = 200,
  step = 0.1,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    // Permitir qualquer valor positivo digitado manualmente
    if (!isNaN(newValue) && newValue >= 0) {
      onChange(newValue);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  // Calcular porcentagem para o gradiente do slider
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <Scale className="h-4 w-4 text-violet-500" />
        Peso
      </label>

      {/* Input numérico */}
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-xl",
        "bg-white/70 dark:bg-slate-800/70",
        "border border-slate-200 dark:border-slate-700",
        "focus-within:ring-2 focus-within:ring-violet-500/30 focus-within:border-violet-500"
      )}>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          step="any"
          className={cn(
            "flex-1 text-2xl font-bold bg-transparent",
            "text-slate-900 dark:text-white",
            "focus:outline-none",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
        />
        <span className="text-lg font-medium text-slate-500 dark:text-slate-400">kg</span>
      </div>

      {/* Slider visual */}
      <div className="relative pt-2 pb-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${percentage}%, rgb(226, 232, 240) ${percentage}%, rgb(226, 232, 240) 100%)`
          }}
        />

        {/* Marcadores de referência - valores típicos pediátricos */}
        <div className="flex justify-between mt-1 text-xs text-slate-400 dark:text-slate-500">
          <span>0.1</span>
          <span>10</span>
          <span>30</span>
          <span>60</span>
          <span>100</span>
          <span>200kg</span>
        </div>
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid rgb(139, 92, 246);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: all 0.15s ease;
        }
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 10px rgba(139, 92, 246, 0.3);
        }
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid rgb(139, 92, 246);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default WeightInput;

import React from 'react';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeightInputProps {
  value: number;
  onChange: (weight: number) => void;
  min?: number;
  max?: number;
}

// Pontos de referência igualmente espaçados na régua
const MARKERS = [0.1, 10, 30, 60, 100, 200];

const WeightInput: React.FC<WeightInputProps> = ({
  value,
  onChange,
  min = 0.1,
  max = 200,
}) => {

  // Converter valor real (0.1-200) para posição no slider (0-100)
  // Usa interpolação linear entre os marcadores
  const valueToSliderPosition = (val: number): number => {
    // Limitar ao range
    val = Math.max(MARKERS[0], Math.min(MARKERS[MARKERS.length - 1], val));

    // Encontrar entre quais marcadores o valor está
    for (let i = 0; i < MARKERS.length - 1; i++) {
      if (val >= MARKERS[i] && val <= MARKERS[i + 1]) {
        // Posição do segmento (cada segmento = 20% do slider, pois temos 6 marcadores = 5 segmentos)
        const segmentStart = (i / (MARKERS.length - 1)) * 100;
        const segmentEnd = ((i + 1) / (MARKERS.length - 1)) * 100;

        // Posição dentro do segmento
        const ratio = (val - MARKERS[i]) / (MARKERS[i + 1] - MARKERS[i]);

        return segmentStart + ratio * (segmentEnd - segmentStart);
      }
    }
    return 100;
  };

  // Converter posição no slider (0-100) para valor real (0.1-200)
  const sliderPositionToValue = (pos: number): number => {
    // Encontrar em qual segmento a posição está
    const segmentSize = 100 / (MARKERS.length - 1); // 20% por segmento
    const segmentIndex = Math.min(Math.floor(pos / segmentSize), MARKERS.length - 2);

    // Posição dentro do segmento (0 a 1)
    const positionInSegment = (pos - segmentIndex * segmentSize) / segmentSize;

    // Interpolar entre os marcadores
    const startValue = MARKERS[segmentIndex];
    const endValue = MARKERS[segmentIndex + 1];

    return startValue + positionInSegment * (endValue - startValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    // Permitir qualquer valor positivo digitado manualmente
    if (!isNaN(newValue) && newValue >= 0) {
      onChange(newValue);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    const realValue = sliderPositionToValue(sliderPos);
    // Arredondar para 1 casa decimal
    onChange(Math.round(realValue * 10) / 10);
  };

  // Calcular porcentagem para o gradiente do slider
  const percentage = valueToSliderPosition(value);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <Scale className="h-4 w-4 text-violet-500" />
        Peso
      </label>

      {/* Input numérico */}
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-xl",
        "bg-white/70 dark:bg-slate-700/80",
        "border border-slate-200 dark:border-slate-600/60",
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

      {/* Slider visual com escala não-linear */}
      <div className="relative pt-2 pb-1">
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={percentage}
          onChange={handleSliderChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${percentage}%, rgb(226, 232, 240) ${percentage}%, rgb(226, 232, 240) 100%)`
          }}
        />

        {/* Marcadores de referência - igualmente espaçados */}
        <div className="flex justify-between mt-1 text-xs text-slate-400 dark:text-slate-400">
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

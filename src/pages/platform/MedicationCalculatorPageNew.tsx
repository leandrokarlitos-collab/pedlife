import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Calculator } from 'lucide-react';
import { slugify, cn } from '@/lib/utils';
import { mockMedicationsData, allCategories, evaluateJsLogic, calculateDosage } from '@/data/mockMedications';
import { formatarIntervaloBR } from '@/utils/numberFormat';
import { Medication } from '@/types/medication';
import { useSearchHistory } from '@/hooks/use-search-history';
import { useUser } from '@/hooks/use-user';

// Componentes novos
import MedicationHeader from '@/components/platform/calculator/MedicationHeader';
import AgeInput from '@/components/platform/calculator/AgeInput';
import WeightInput from '@/components/platform/calculator/WeightInput';
import AgeBracketButtons from '@/components/platform/calculator/AgeBracketButtons';
import InlineResultCard from '@/components/platform/calculator/InlineResultCard';
import MedicationInfoAccordion from '@/components/platform/calculator/MedicationInfoAccordion';
import MedicationNotFound from '@/components/platform/calculator/MedicationNotFound';

interface CalculationResult {
  doseText: string;
  weight: number;
  ageMonths: number;
  calculationTime: string;
  calculationDate: string;
  detailedCalculation?: string;
  alertas?: string[];  // 🆕 Alertas de dose máxima/mínima
}

const MedicationCalculatorPageNew: React.FC = () => {
  const { categorySlug, medicationSlug } = useParams<{ categorySlug: string; medicationSlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { recordSearch } = useSearchHistory(user);

  // Verificar se veio de um favorito
  const fromFavorite = searchParams.get('fromFavorite') === 'true';
  const favoriteWeight = searchParams.get('weight');
  const favoriteAge = searchParams.get('age');
  const hasCalculatedFromFavorite = useRef(false);

  // Estados
  const [weight, setWeight] = useState<number>(10);
  const [ageMonths, setAgeMonths] = useState<number>(24); // 2 anos em meses
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [searchRecorded, setSearchRecorded] = useState(false);

  // Buscar dados
  const categoryData = categorySlug ? mockMedicationsData[categorySlug] : undefined;
  const medication = categoryData?.medications.find(m => {
    const medSlug = m.slug || slugify(m.name);
    return medSlug === medicationSlug;
  });
  const categoryDisplayInfo = allCategories.find(c => c.slug === categorySlug);

  // Registrar pesquisa quando a página é acessada
  useEffect(() => {
    if (medication && categorySlug && categoryDisplayInfo && !searchRecorded) {
      recordSearch({
        medicationId: medication.slug || slugify(medication.name),
        medicationName: medication.name,
        categorySlug,
        categoryName: categoryDisplayInfo.title,
      });
      setSearchRecorded(true);
    }
  }, [medication, categorySlug, categoryDisplayInfo, recordSearch, searchRecorded]);

  // Verificar se é categoria de dose fixa (oftalmológicos-otológicos unificados)
  const isFixedDoseCategory = categorySlug === 'oftalmologicos-otologicos';

  // Para dose fixa, mostrar resultado automaticamente
  useEffect(() => {
    if (isFixedDoseCategory && medication && !result) {
      const doseResultText = medication.dosageInformation?.usualDose || 'Dose não disponível';
      setResult({
        doseText: doseResultText,
        weight: 0,
        ageMonths: 0,
        calculationTime: format(new Date(), 'HH:mm'),
        calculationDate: format(new Date(), 'dd/MM/yyyy'),
      });
    }
  }, [isFixedDoseCategory, medication, result]);

  // Carregar valores salvos do localStorage OU dos parâmetros de favorito
  useEffect(() => {
    if (fromFavorite && favoriteWeight && favoriteAge) {
      // Se veio de um favorito, usar os valores do favorito
      setWeight(parseFloat(favoriteWeight));
      setAgeMonths(parseInt(favoriteAge));
    } else {
      // Caso contrário, usar valores salvos no localStorage
      const savedWeight = localStorage.getItem('pedlife_lastWeight');
      const savedAge = localStorage.getItem('pedlife_lastAge');
      if (savedWeight) setWeight(parseFloat(savedWeight));
      if (savedAge) setAgeMonths(parseInt(savedAge));
    }
  }, [fromFavorite, favoriteWeight, favoriteAge]);

  // Calcular automaticamente se veio de um favorito
  useEffect(() => {
    if (fromFavorite && favoriteWeight && favoriteAge && medication && !hasCalculatedFromFavorite.current && !result) {
      // Marcar que já calculou para evitar loop
      hasCalculatedFromFavorite.current = true;

      // Pequeno delay para garantir que os estados foram atualizados
      const timer = setTimeout(() => {
        // Disparar cálculo automático
        const weightValue = parseFloat(favoriteWeight);
        const ageValue = parseInt(favoriteAge);
        const ageYears = Math.floor(ageValue / 12);

        let doseResultText = '';
        const params = medication.calculationParams;

        if (params) {
          try {
            const resultado = calculateDosage(weightValue, params, ageYears);
            if (resultado && resultado.doseText) {
              doseResultText = resultado.doseText;

              setResult({
                doseText: doseResultText,
                weight: weightValue,
                ageMonths: ageValue,
                calculationTime: format(new Date(), 'HH:mm'),
                calculationDate: format(new Date(), 'dd/MM/yyyy'),
                alertas: resultado.alertas,
              });
              // Limpar parâmetros da URL após calcular
              setSearchParams({});
              return;
            }
          } catch (error) {
            console.error('Erro ao calcular dose do favorito:', error);
          }
        }

        // Fallback se não conseguir calcular
        if (params?.logica_js) {
          try {
            const calculatedDose = evaluateJsLogic(params.logica_js, weightValue);
            let doseFormatada = calculatedDose.replace(/(\d+)\.(\d+)/g, '$1,$2');

            let doseComUnidade = doseFormatada;
            if (!doseComUnidade.includes('mL') && !doseComUnidade.includes('mg') &&
              !doseComUnidade.includes('g') && !doseComUnidade.includes('mcg') &&
              !doseComUnidade.includes('gotas')) {
              if (medication.form?.toLowerCase().includes('xarope') ||
                medication.form?.toLowerCase().includes('suspen') ||
                medication.form?.toLowerCase().includes('solu')) {
                doseComUnidade += ' mL';
              }
            }

            let intervaloFormatado = '';
            if (medication.dosageInformation?.doseInterval) {
              intervaloFormatado = formatarIntervaloBR(medication.dosageInformation.doseInterval);
            }

            doseResultText = `${doseComUnidade}${intervaloFormatado ? ` de ${intervaloFormatado}` : ''}`;

            setResult({
              doseText: doseResultText,
              weight: weightValue,
              ageMonths: ageValue,
              calculationTime: format(new Date(), 'HH:mm'),
              calculationDate: format(new Date(), 'dd/MM/yyyy'),
            });
            // Limpar parâmetros da URL após calcular
            setSearchParams({});
          } catch (error) {
            console.error('Erro no fallback:', error);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [fromFavorite, favoriteWeight, favoriteAge, medication, result, setSearchParams]);

  // Se não encontrar, mostrar erro
  if (!categoryData || !medication || !categoryDisplayInfo || !categorySlug || !medicationSlug) {
    return <MedicationNotFound />;
  }

  // Calcular dose
  const calculateDose = () => {
    if (!medication) return;

    setIsCalculating(true);

    // Salvar valores no localStorage
    localStorage.setItem('pedlife_lastWeight', weight.toString());
    localStorage.setItem('pedlife_lastAge', ageMonths.toString());

    // Converter idade de meses para anos para os cálculos (Preservando decimal se necessário)
    const ageValue = ageMonths;
    const ageYears = ageMonths / 12;

    let doseResultText = '';
    let detailedCalculation = '';

    const params = medication.calculationParams;

    // 🆕 PRIORIDADE: Usar função calculateDosage() que suporta TSX
    if (params) {
      try {
        console.log('🔄 [CALC] Calculando dose com TSX/JSON híbrido...', {
          medicamento: medication.name,
          peso: weight,
          idadeMeses: ageMonths,
          temCustomCalculator: !!params.customCalculator
        });

        // Passamos a idade em MESES para o calculador, pois é mais preciso para pediatria
        const resultado = calculateDosage(weight, params, ageMonths);

        console.log('📊 [CALC] Resultado:', resultado);

        if (resultado && resultado.doseText) {
          doseResultText = resultado.doseText;
          console.log('✅ [CALC] Usando resultado:', doseResultText);
          console.log('⚠️ [CALC] Alertas:', resultado.alertas);

          setResult({
            doseText: doseResultText,
            weight,
            ageMonths,
            calculationTime: format(new Date(), 'HH:mm'),
            calculationDate: format(new Date(), 'dd/MM/yyyy'),
            detailedCalculation,
            alertas: resultado.alertas,  // 🆕 Passar alertas
          });

          setIsCalculating(false);
          return; // ← Sair, não executar lógica antiga
        }
      } catch (error) {
        console.error('❌ [CALC] Erro:', error);
      }
    }

    // FALLBACK: Usar lógica do JSON se disponível
    if (params?.logica_js) {
      try {
        const calculatedDose = evaluateJsLogic(params.logica_js, weight);

        // 🇧🇷 Converter ponto para vírgula (formato brasileiro)
        let doseFormatada = calculatedDose.replace(/(\d+)\.(\d+)/g, '$1,$2');

        // Verificar se já tem unidade
        let doseComUnidade = doseFormatada;
        if (!doseComUnidade.includes('mL') && !doseComUnidade.includes('mg') &&
          !doseComUnidade.includes('g') && !doseComUnidade.includes('mcg') &&
          !doseComUnidade.includes('gotas')) {
          if (medication.form?.toLowerCase().includes('xarope') ||
            medication.form?.toLowerCase().includes('suspen') ||
            medication.form?.toLowerCase().includes('solu')) {
            doseComUnidade += ' mL';
          } else if (medication.form?.toLowerCase().includes('comprimido')) {
            doseComUnidade += ' comprimido(s)';
          }
        }

        // 🇧🇷 Formatar intervalo brasileiro: "8/8h" → "8 em 8 horas"
        let intervaloFormatado = '';
        if (medication.dosageInformation?.doseInterval) {
          intervaloFormatado = formatarIntervaloBR(medication.dosageInformation.doseInterval);
        }

        // 🇧🇷 Formato padronizado: "X mL de 8 em 8 horas, por 7 dias"
        doseResultText = `${doseComUnidade}${intervaloFormatado ? ` de ${intervaloFormatado}` : ''}`;

        // Adicionar duração se disponível
        if (medication.dosageInformation?.treatmentDuration) {
          doseResultText += `, por ${medication.dosageInformation.treatmentDuration}`;
        }

        // Gerar explicação detalhada
        detailedCalculation = `Cálculo para ${medication.name}:\n\n`;
        detailedCalculation += `Dados do paciente:\n`;
        detailedCalculation += `- Peso: ${weight} kg\n`;
        detailedCalculation += `- Idade: ${ageMonths} meses (${ageYears} anos)\n\n`;
        detailedCalculation += `Resultado: ${doseResultText}`;

      } catch (error) {
        console.error('Erro ao calcular dose:', error);
        doseResultText = medication.dosageInformation?.usualDose || 'Consulte um profissional de saúde.';
      }
    } else {
      // Fallback
      doseResultText = medication.dosageInformation?.usualDose || 'Consulte um profissional de saúde para orientações específicas.';
    }

    // Definir resultado
    setTimeout(() => {
      setResult({
        doseText: doseResultText,
        weight,
        ageMonths,
        calculationTime: format(new Date(), 'HH:mm'),
        calculationDate: format(new Date(), 'dd/MM/yyyy'),
        detailedCalculation,
      });
      setIsCalculating(false);
    }, 300); // Pequeno delay para feedback visual
  };

  // Novo cálculo (exibir calculadora novamente)
  const handleNewCalculation = () => {
    setResult(null);
  };

  // Selecionar faixa etária
  const handleAgeBracketSelect = (months: number, weightKg: number) => {
    setAgeMonths(months);
    setWeight(weightKg);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 min-h-full">
      {/* Header do medicamento */}
      <MedicationHeader
        medication={medication}
        categorySlug={categorySlug}
        categoryDisplayInfo={categoryDisplayInfo}
      />

      {/* Resultado (aparece após cálculo, substituindo a calculadora) */}
      {result && (
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <InlineResultCard
            medication={medication}
            result={result}
            categorySlug={categorySlug}
            onNewCalculation={handleNewCalculation}
          />
        </div>
      )}

      {/* Calculadora (esconde quando já tem resultado) */}
      {!result && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className={cn(
            "rounded-2xl overflow-hidden",
            "bg-white/60 dark:bg-slate-800/80",
            "backdrop-blur-xl backdrop-saturate-150",
            "border border-white/40 dark:border-slate-600/60",
            "shadow-lg shadow-black/5 dark:shadow-black/30"
          )}>
            {/* Header da calculadora */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                <Calculator className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Calculadora de Dose
              </h2>
            </div>

            {/* Conteúdo da calculadora */}
            <div className="p-5 space-y-6">
              {/* Grid de inputs */}
              <div className="grid md:grid-cols-2 gap-6">
                <WeightInput
                  value={weight}
                  onChange={setWeight}
                />
                <AgeInput
                  value={ageMonths}
                  onChange={setAgeMonths}
                />
              </div>

              {/* Botões de faixa etária */}
              <AgeBracketButtons
                onSelect={handleAgeBracketSelect}
                selectedAge={ageMonths}
              />

              {/* Botão calcular */}
              <button
                onClick={calculateDose}
                disabled={isCalculating}
                className={cn(
                  "group relative w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200",
                  "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700",
                  "text-white shadow-lg shadow-violet-500/25",
                  "hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                  "flex items-center justify-center gap-3",
                  "overflow-hidden"
                )}
              >
                {/* Efeito de brilho no hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                    <span className="relative z-10">Calculando...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Calcular Dose</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Informações do medicamento (acordeões) */}
      <div className="mt-6">
        <MedicationInfoAccordion
          medication={medication}
          detailedCalculation={result?.detailedCalculation}
        />
      </div>
    </div>
  );
};

export default MedicationCalculatorPageNew;

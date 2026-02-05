import { slugify } from '@/lib/utils';
import { MockMedicationData, CategoryInfo, DosageCalculationParams } from '@/types/medication';
import { loadMedicationData, loadCategories } from './categoryLoader';
import { formatDosageText } from './tsxAdapter';
import { formatarNumeroBR } from '@/utils/numberFormat';

// Carregando os dados e categorias de forma dinâmica através do categoryLoader
let mockMedicationsData: MockMedicationData = {};
let allCategories: CategoryInfo[] = [];

// Função para inicializar dados básicos (metadata das categorias)
export function initializeMedicationData() {
  allCategories = loadCategories();
  // Inicializa o objeto com o metadata das categorias, mas sem a lista completa de medicamentos (que virá sob demanda)
  mockMedicationsData = loadMedicationData();
}

// Inicializa imediatamente com o que for síncrono
initializeMedicationData();

// Função para recarregar dados se necessário
export const reloadMedicationData = () => {
  initializeMedicationData();
  return { mockMedicationsData, allCategories };
};

// Função para extrair informações de concentração do texto da lógica
function extractConcentration(logicaJs: string): string {
  if (!logicaJs) return 'Concentração não especificada';

  const concentrationMatch = logicaJs.match(/(\d+(?:\.\d+)?)\s*mg\/(\d+(?:\.\d+)?)\s*ml/i);
  if (concentrationMatch) {
    return `${concentrationMatch[1]}mg/${concentrationMatch[2]}mL`;
  }

  const gotsMatch = logicaJs.match(/(\d+)\s*mg\/ml.*gotas/i);
  if (gotsMatch) {
    return `${gotsMatch[1]}mg/mL (Gotas)`;
  }

  return 'Concentração não especificada';
}

// Função para extrair intervalo de dosagem
function extractDoseInterval(logicaJs: string): string {
  if (!logicaJs) return 'Conforme prescrição médica';

  const intervalMatch = logicaJs.match(/de (\d+\/\d+ horas)/);
  if (intervalMatch) {
    return intervalMatch[1];
  }

  if (logicaJs.includes('uma vez ao dia')) {
    return 'Uma vez ao dia';
  }

  if (logicaJs.includes('dose única')) {
    return 'Dose única';
  }

  return 'Conforme prescrição médica';
}

// Função para extrair duração do tratamento
function extractTreatmentDuration(logicaJs: string): string {
  if (!logicaJs) return 'Conforme prescrição médica';

  const durationMatch = logicaJs.match(/por (\d+(?:-\d+)?\s*dias?)/i);
  if (durationMatch) {
    return durationMatch[1].trim();
  }

  if (logicaJs.includes('dose única')) {
    return 'Dose única';
  }

  return 'Conforme prescrição médica';
}

// Função para extrair parâmetros de cálculo da lógica JavaScript
function extractCalculationParams(medicamento: string, logicaJs: string): DosageCalculationParams {
  const params: DosageCalculationParams = {
    type: slugify(medicamento),
    originalLogic: logicaJs || '',
    jsLogic: logicaJs || '', // Armazenando a lógica JavaScript original
    mgPerKg: 0,
    maxDailyDoseMg: 0,
    dosesPerDay: 1,
    concentrationNumeratorMg: 0,
    concentrationDenominatorMl: 1
  };

  // Extrair concentração (ex: 250mg/5ml)
  if (logicaJs) {
    const concentrationMatch = logicaJs.match(/(\d+(?:\.\d+)?)\s*mg\s*\/\s*(\d+(?:\.\d+)?)\s*ml/i);
    if (concentrationMatch) {
      params.concentrationNumeratorMg = parseFloat(concentrationMatch[1]);
      params.concentrationDenominatorMl = parseFloat(concentrationMatch[2]);
    }

    // Extrair dose por kg (ex: peso*10)
    const dosePerKgMatch = logicaJs.match(/peso\s*\*\s*(\d+(?:\.\d+)?)/i);
    if (dosePerKgMatch) {
      params.mgPerKg = parseFloat(dosePerKgMatch[1]);
    }

    // Extrair número de doses por dia
    if (logicaJs.includes('8/8 horas')) {
      params.dosesPerDay = 3;
    } else if (logicaJs.includes('12/12 horas')) {
      params.dosesPerDay = 2;
    } else if (logicaJs.includes('6/6 horas')) {
      params.dosesPerDay = 4;
    } else if (logicaJs.includes('4/4 horas')) {
      params.dosesPerDay = 6;
    }
  }

  // Extrair dose máxima diária (se disponível)
  const maxDoseMatch = logicaJs.match(/Math\.min\([^,]+,\s*(\d+)\)/i) ||
    logicaJs.match(/MIN\([^,]+,\s*(\d+)\)/i);
  if (maxDoseMatch) {
    params.maxDailyDoseMg = parseFloat(maxDoseMatch[1]);
  }

  return params;
}

// Função para avaliar com segurança a lógica JavaScript do JSON
// Esta função está mantida por compatibilidade com código existente
function safeEvaluateLogic(logic: string, weight: number, age: number): number {
  try {
    // Substituir variáveis comuns usadas nas expressões
    let sanitizedLogic = logic
      .replace(/\bpeso\b/gi, weight.toString())
      .replace(/\bidade\b/gi, age.toString())
      .replace(/\bMIN\b/g, 'Math.min')
      .replace(/\bMAX\b/g, 'Math.max')
      .replace(/\bROUND\b/g, 'Math.round')
      .replace(/\bFLOOR\b/g, 'Math.floor')
      .replace(/\bCEIL\b/g, 'Math.ceil');

    // Extrair apenas a parte da expressão matemática
    const mathExpression = sanitizedLogic.match(/[\d\s\*\/\+\-\(\)\.\,\<\>\=\?\:\&\|\!Math\s\.min\s\.max\s\.round\s\.floor\s\.ceil]+/);
    if (!mathExpression) {
      throw new Error('Expressão matemática não encontrada');
    }

    // Avaliar a expressão usando Function (mais seguro que eval)
    // eslint-disable-next-line no-new-func
    const result = Function('Math', `"use strict"; return (${mathExpression[0]});`)(Math);
    return typeof result === 'number' ? result : 0;
  } catch (error) {
    console.error('Erro ao avaliar lógica:', error);
    return 0;
  }
}

// Tipo de retorno do cálculo de dose
export interface CalculateDosageResult {
  dose: number;
  volume: number;
  doseText: string;
  alertas?: string[];  // 🆕 Alertas de dose máxima/mínima
  observacoes?: string[];
}

/**
 * Converte strings de restrição (ex: "≥ 2 meses", "≥ 20 kg") em valores numéricos para validação
 */
function parseRestriction(text: string): { value: number, unit: 'meses' | 'anos' | 'kg' } | null {
  if (!text) return null;
  // Regex para capturar o número e a unidade
  const match = text.match(/(?:≥|>|>=)?\s*(\d+(?:[.,]\d+)?)\s*(meses?|anos?|kg)/i);
  if (!match) return null;

  const value = parseFloat(match[1].replace(',', '.'));
  const unitStr = match[2].toLowerCase();

  let unit: 'meses' | 'anos' | 'kg' = 'kg';
  if (unitStr.startsWith('mês') || unitStr.startsWith('meses')) unit = 'meses';
  else if (unitStr.startsWith('ano')) unit = 'anos';
  else if (unitStr.startsWith('kg')) unit = 'kg';

  return { value, unit };
}

// Função para calcular a dose com base na lógica do JSON
export function calculateDosage(weight: number, params: DosageCalculationParams, age: number = 5): CalculateDosageResult {
  try {
    // 🆕 PRIORIDADE: Se tem função customCalculator (do TSX), usar ela
    if (params.customCalculator && typeof params.customCalculator === 'function') {
      const resultado = params.customCalculator(weight, age);

      // Extrair valores numéricos do resultado
      const doseMatch = resultado.doseCalculada?.match(/(\d+(?:[.,]\d+)?)/);
      const volumeMatch = resultado.volumeCalculado?.match(/(\d+(?:[.,]\d+)?)/);

      const doseMg = doseMatch ? parseFloat(doseMatch[1].replace(',', '.')) : 0;
      const volumeMl = volumeMatch ? parseFloat(volumeMatch[1].replace(',', '.')) : 0;

      // ✨ FORMATAR NO PADRÃO BR: "X,X mL de 8/8 horas, por 7 dias"
      const resultadoBR = {
        ...resultado,
        doseCalculada: resultado.doseCalculada?.replace(/(\d+)\.(\d+)/g, '$1,$2'),
        volumeCalculado: resultado.volumeCalculado?.replace(/(\d+)\.(\d+)/g, '$1,$2'),
      };

      const duracaoTratamento = params.duracaoTratamento || params.treatmentDuration;
      const doseText = formatDosageText(resultadoBR, duracaoTratamento);

      // 🆕 VERIFICAÇÃO CENTRALIZADA DE LIMITES DE DOSE
      const alertas = [...(resultado.alertas || [])];

      // --- VALIDAÇÃO UNIVERSAL DE RESTRIÇÃO DE IDADE/PESO ---
      if (params.restricaoIdade) {
        const { idadeMinima, pesoMinimo } = params.restricaoIdade;

        if (idadeMinima) {
          const parsed = parseRestriction(idadeMinima);
          if (parsed) {
            if (parsed.unit === 'meses' && age < parsed.value) {
              const jaTem = alertas.some(a => a.toLowerCase().includes('recomendado para menores de') || a.toLowerCase().includes('idade mínima'));
              if (!jaTem) alertas.push(`Uso restrito: medicamento não recomendado para menores de ${parsed.value} meses.`);
            } else if (parsed.unit === 'anos' && (age / 12) < parsed.value) {
              const jaTem = alertas.some(a => a.toLowerCase().includes('recomendado para menores de') || a.toLowerCase().includes('idade mínima'));
              if (!jaTem) alertas.push(`Uso restrito: medicamento não recomendado para menores de ${parsed.value} ${parsed.value === 1 ? 'ano' : 'anos'}.`);
            }
          }
        }

        if (pesoMinimo) {
          const parsed = parseRestriction(pesoMinimo);
          if (parsed && parsed.unit === 'kg' && weight < parsed.value) {
            const jaTem = alertas.some(a => a.toLowerCase().includes('peso mínimo') || a.toLowerCase().includes('preferir'));
            if (!jaTem) alertas.push(`Aviso: preferir outras apresentações para peso menor que ${parsed.value} kg.`);
          }
        }
      }

      const dosesAoDia = params.dosesPerDay || params.dosesAoDia || 2;
      const doseDiariaCalculadaMg = doseMg * dosesAoDia;

      // 1. Verificar dose máxima PRIMEIRO
      let atingiuMaximo = alertas.some(a => a.toLowerCase().includes('máxim') || a.toLowerCase().includes('atingida'));
      const maxDiaria = params.doseMaxDiariaMg || params.maxDailyDoseMg;

      if (maxDiaria && !atingiuMaximo) {
        const doseUsual = params.doseUsualMgKg || params.mgPerKg || params.doseMinMgKg || 50;
        const doseDiariaSemCap = weight * doseUsual;
        if (doseDiariaSemCap >= maxDiaria * 0.99) {
          atingiuMaximo = true;
          alertas.push(`Dose máxima diária atingida (${params.doseMaxima || maxDiaria + ' mg/dia'})`);
        }
      }

      // 2. Verificar dose mínima
      const jaTemAlertaMinimo = alertas.some(a => a.toLowerCase().includes('mínim') || a.toLowerCase().includes('abaixo'));
      if (params.doseMinMgKg && !jaTemAlertaMinimo && !atingiuMaximo) {
        const doseMinimaDiaria = weight * params.doseMinMgKg;
        if (doseDiariaCalculadaMg > 0 && doseDiariaCalculadaMg < doseMinimaDiaria * 0.95) {
          alertas.push(`Dose abaixo do mínimo recomendado (${params.doseMinima || params.doseMinMgKg + ' mg/kg/dia'})`);
        }
      }

      return {
        dose: doseMg,
        volume: volumeMl,
        doseText: doseText,
        alertas: alertas,
        observacoes: resultado.observacoes || []
      };
    }

    // Fallback para lógica JSON antiga
    if (!params.originalLogic) {
      throw new Error('Lógica de cálculo não definida');
    }

    // Tentar usar a lógica JavaScript diretamente do JSON
    let doseMg = 0;
    if (params.originalLogic) {
      // Extrair a parte da lógica que calcula a dose
      doseMg = safeEvaluateLogic(params.originalLogic, weight, age);
    } else if (params.mgPerKg) {
      // Fallback para o cálculo baseado em parâmetros extraídos
      doseMg = weight * params.mgPerKg;

      // Aplicar dose máxima diária se definida
      if (params.maxDailyDoseMg && doseMg > params.maxDailyDoseMg) {
        doseMg = params.maxDailyDoseMg;
      }
    }

    // Calcular volume em mL
    let volumeMl = 0;
    if (params.concentrationNumeratorMg && params.concentrationDenominatorMl) {
      const concentration = params.concentrationNumeratorMg / params.concentrationDenominatorMl; // mg/mL
      volumeMl = doseMg / concentration;
    }

    // Gerar texto descritivo da dose
    let doseText = '';
    const doseInterval = extractDoseInterval(params.originalLogic);
    const treatmentDuration = extractTreatmentDuration(params.originalLogic);

    if (volumeMl > 0) {
      doseText = `Tomar ${volumeMl.toFixed(1)} mL por via oral ${doseInterval.toLowerCase()} por ${treatmentDuration}.`;
    } else {
      doseText = `Dose: ${doseMg.toFixed(1)} mg ${doseInterval.toLowerCase()} por ${treatmentDuration}.`;
    }

    // 🆕 VERIFICAÇÃO DE LIMITES PARA JSON
    const alertasJson: string[] = [];

    // Verificar dose máxima
    if (params.maxDailyDoseMg || params.doseMaxDiariaMg) {
      const maxDiaria = params.maxDailyDoseMg || params.doseMaxDiariaMg;
      const mgPerKg = params.mgPerKg || params.doseUsualMgKg || 50;
      const doseDiariaCalculada = weight * mgPerKg;

      if (doseDiariaCalculada >= maxDiaria) {
        alertasJson.push(`Dose máxima diária atingida (${params.doseMaxima || maxDiaria + ' mg/dia'})`);
      }
    }

    // Verificar dose mínima
    if (params.doseMinMgKg) {
      const mgPerKg = params.mgPerKg || params.doseUsualMgKg || params.doseMinMgKg;
      const doseDiariaCalculada = weight * mgPerKg;
      const doseMinimaDiaria = weight * params.doseMinMgKg;

      if (doseDiariaCalculada < doseMinimaDiaria * 0.9) { // 10% de margem
        alertasJson.push(`Dose abaixo do mínimo recomendado (${params.doseMinima || params.doseMinMgKg + ' mg/kg/dia'})`);
      }
    }

    return {
      dose: parseFloat(doseMg.toFixed(2)),
      volume: parseFloat(volumeMl.toFixed(2)),
      doseText: doseText,
      alertas: alertasJson.length > 0 ? alertasJson : undefined
    };
  } catch (error) {
    console.error('Erro ao calcular dosagem:', error);
    // Não mostrar erro ao usuário, retornar valores padrão
    return {
      dose: 0,
      volume: 0,
      doseText: 'Consulte um profissional de saúde para orientações específicas.'
    };
  }
}

// Função para converter texto em lógica JavaScript
function convertToJsLogic(text: string): string {
  if (!text) return '""';

  // Remover aspas duplas ou simples do início e fim
  let cleanText = text.trim().replace(/^["']|["']$/g, '');

  // Se o texto já parece ser uma expressão JavaScript válida, retornar como está
  if (cleanText.includes('peso') || cleanText.includes('Math.') ||
    /[\+\-\*\/\(\)]/.test(cleanText)) {
    return cleanText;
  }

  // Caso contrário, retornar como string literal
  return `"${cleanText}"`;
}

// Exportando os dados de medicamentos (agora variáveis que podem ser atualizadas)
export { mockMedicationsData, allCategories };

// Função para avaliar a lógica JavaScript de forma segura
function evaluateJsLogic(logicaJs: string, peso: number): string {
  if (!logicaJs) return 'Sem lógica de cálculo definida';

  try {
    // Abordagem simplificada: extrair valores numéricos diretamente da string
    // Isso é mais seguro que tentar avaliar JavaScript dinâmico

    // Padrão para Amoxicilina e similares (xaropes)
    if (logicaJs.includes('Tomar') && logicaJs.includes('mL')) {
      // Calcular a dose baseada no peso
      // Exemplo: "Tomar " + Math.round((peso*50<=1750 ? (peso*50/3)/(250/5) : (1750/3)/(250/5)), 1) + " mL..."
      const dosePorKg = 50; // mg/kg/dia
      const doseMaxima = 1750; // mg/dia
      const divisor = 3; // 3x ao dia
      const concentracao = 250 / 5; // 250mg/5mL

      // Cálculo da dose em mL
      const doseMg = Math.min(peso * dosePorKg, doseMaxima);
      const dosePorTomadaMg = doseMg / divisor;
      const doseMl = Math.round((dosePorTomadaMg / concentracao) * 10) / 10; // Arredondar para 1 casa decimal

      return doseMl + ' mL';
    }

    // Padrão para Ceftriaxona e similares (reconstituir)
    if (logicaJs.includes('Reconstituir') && logicaJs.includes('frasco(s)')) {
      // Exemplo: "Reconstituir "+Math.ceil(Math.min(peso*100,4000)/1000)+" frasco(s)..."
      const dosePorKg = 100; // mg/kg/dia
      const doseMaxima = 4000; // mg/dia
      const tamFrasco = 1000; // mg por frasco

      // Cálculo do número de frascos
      const doseMg = Math.min(peso * dosePorKg, doseMaxima);
      const numFrascos = Math.ceil(doseMg / tamFrasco);

      return numFrascos + ' frasco(s)';
    }

    // Se não conseguir extrair com os padrões acima, tenta uma abordagem genérica
    // Remover aspas extras e tentar avaliar a expressão
    let cleanLogic = logicaJs;
    if (logicaJs.startsWith('"') && logicaJs.endsWith('"')) {
      cleanLogic = logicaJs.substring(1, logicaJs.length - 1);

      // Substituir variáveis pelo valor do peso
      cleanLogic = cleanLogic.replace(/\{peso\}/g, String(peso));

      // Extrair números da string
      const numeros = cleanLogic.match(/\d+(\.\d+)?/g);
      if (numeros && numeros.length > 0) {
        // Retornar o primeiro número encontrado como dose
        return numeros[0] + ' mL';
      }

      return cleanLogic;
    }

    // Se chegou aqui, tenta uma avaliação simples
    return String(peso) + ' unidade(s)';
  } catch (error) {
    console.error('Erro ao avaliar lógica:', error);
    return '1 unidade';
  }
}

// Exportando funções auxiliares para cálculo de dosagem
export {
  extractConcentration,
  extractDoseInterval,
  extractTreatmentDuration,
  extractCalculationParams,
  evaluateJsLogic,
  safeEvaluateLogic,
  convertToJsLogic,
  extractBaseName
};

// Função para extrair o nome base de um medicamento (sem concentração, forma, etc.)
function extractBaseName(fullName: string): string {
  // Remover informações de concentração, forma, etc.
  // Exemplos:
  // "Amoxicilina 250mg/5ml" -> "Amoxicilina"
  // "Cefalexina 500mg" -> "Cefalexina"
  // "Escopolamina + Dipirona 10mg/mL + 500mg/mL" -> "Escopolamina + Dipirona"

  // Primeiro, remover qualquer texto entre parênteses
  let cleanedName = fullName.replace(/\s*\([^)]*\)\s*/g, ' ');

  // Remover marcas registradas e símbolos comerciais
  cleanedName = cleanedName.replace(/\s*[®™©]\s*/g, ' ');

  // Casos especiais: medicamentos compostos (com +)
  if (cleanedName.includes('+')) {
    // Para medicamentos compostos, queremos manter o formato "Medicamento A + Medicamento B"
    // mas remover as concentrações que vêm depois
    const compoundMatch = cleanedName.match(/^([^\d]+(?:\+[^\d]+)+)(?:\s+\d|\s*$)/i);
    if (compoundMatch && compoundMatch[1]) {
      return compoundMatch[1].trim();
    }
  }

  // Padrão para encontrar o nome base (geralmente é a primeira palavra ou palavras antes de números ou formas farmacêuticas)
  const commonForms = ['xarope', 'gotas', 'comprimido', 'cápsula', 'injetável', 'suspensão', 'solução', 'pó', 'creme', 'pomada', 'gel'];
  const formsPattern = commonForms.join('|');

  // Padrão melhorado: captura o nome até encontrar um número ou uma forma farmacêutica
  const baseNameMatch = cleanedName.match(new RegExp(`^([\\w\\s\u00E1\u00E0\u00E2\u00E3\u00E9\u00E8\u00EA\u00ED\u00EF\u00F3\u00F4\u00F5\u00F6\u00FA\u00E7\u00F1-]+?)(?:\\s+\\d|\\s+(?:${formsPattern})|\\s+\\(|$)`, 'i'));

  if (baseNameMatch && baseNameMatch[1]) {
    return baseNameMatch[1].trim();
  }

  return cleanedName.trim(); // Retorna o nome limpo se não conseguir extrair o nome base
}

// Função para determinar via de administração
function determineApplication(medicamento: string, logicaJs: string): string {
  if (logicaJs.includes('por via oral') || logicaJs.includes('VO') || medicamento.includes('Xarope') || medicamento.includes('Gotas')) {
    return 'VO';
  }
  if (logicaJs.includes('EV') || logicaJs.includes('por via EV')) {
    return 'EV';
  }
  if (logicaJs.includes('IM') || logicaJs.includes('por via IM')) {
    return 'IM';
  }
  if (logicaJs.includes('nebulização') || logicaJs.includes('inalação')) {
    return 'Inalatória';
  }
  if (logicaJs.includes('tópica') || logicaJs.includes('pomada') || logicaJs.includes('creme')) {
    return 'Tópica';
  }
  return 'VO'; // Padrão
}

// Função para determinar forma farmacêutica
function determineForm(medicamento: string, logicaJs: string): string {
  if (medicamento.includes('Xarope') || medicamento.includes('xarope')) {
    return 'Suspensão Oral';
  }
  if (medicamento.includes('Gotas') || medicamento.includes('gotas')) {
    return 'Solução Oral em Gotas';
  }
  if (medicamento.includes('Comprimido') || medicamento.includes('comprimido')) {
    return 'Comprimido';
  }
  if (medicamento.includes('Pó') || medicamento.includes('pó')) {
    return 'Pó para Reconstituição';
  }
  if (medicamento.includes('Pomada') || medicamento.includes('pomada')) {
    return 'Pomada';
  }
  if (medicamento.includes('Creme') || medicamento.includes('creme')) {
    return 'Creme';
  }
  if (logicaJs.includes('nebulização')) {
    return 'Solução para Nebulização';
  }
  return 'Suspensão Oral';
}

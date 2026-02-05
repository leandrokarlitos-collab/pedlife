/**
 * Adaptador TSX → Medication
 * 
 * Converte medicamentos do formato TSX (MedicamentoData) para o formato
 * JSON legado (Medication) usado pela aplicação.
 */

import type { Medication, DosageCalculationParams } from '@/types/medication';
import type { MedicamentoExport, MedicamentoData, ResultadoCalculo } from '@/medications/types';
import { formatarIntervaloBR } from '@/utils/numberFormat';

/**
 * Formata o texto de dosagem no padrão: "X mL de 8/8 horas, por 7 dias"
 * NÃO inventa duração - apenas usa se estiver explícita
 */
export function formatDosageText(
  resultado: ResultadoCalculo,
  duracaoTratamento?: string
): string {
  console.log('🎨 [FORMAT] Formatando dosagem:', { resultado, duracaoTratamento });

  const volume = resultado.volumeCalculado || resultado.doseCalculada;
  const intervaloOriginal = resultado.intervalo;

  // 🇧🇷 Converter para formato brasileiro: "8/8h" → "8 em 8 horas"
  const intervalo = formatarIntervaloBR(intervaloOriginal);

  console.log('🎨 [FORMAT] Extraído:', { volume, intervaloOriginal, intervaloBR: intervalo });

  // Formato base: "X mL de 8 em 8 horas"
  let texto = `${volume} de ${intervalo}`;

  // Adicionar duração APENAS se estiver explícita
  if (duracaoTratamento) {
    texto += `, por ${duracaoTratamento}`;
  }

  console.log('🎨 [FORMAT] Texto formatado final:', texto);

  return texto;
}

/**
 * Extrai informação de concentração do medicamento TSX
 */
function extractConcentration(data: MedicamentoData): string {
  if (data.parametrosCalculo?.concentracaoNumeradorMg &&
    data.parametrosCalculo?.concentracaoDenominadorMl) {
    return `${data.parametrosCalculo.concentracaoNumeradorMg}mg/${data.parametrosCalculo.concentracaoDenominadorMl}mL`;
  }

  // Tentar extrair do nome do medicamento
  const match = data.nome.match(/(\d+(?:\.\d+)?)\s*(mg|mcg|UI)(?:\/(\d+(?:\.\d+)?)\s*(mL|L))?/i);
  if (match) {
    if (match[3]) {
      return `${match[1]}${match[2]}/${match[3]}${match[4]}`;
    }
    return `${match[1]}${match[2]}`;
  }

  return 'Ver fórmula';
}

/**
 * Extrai duração de tratamento APENAS se explícita no medicamento
 * NÃO inventa valores - retorna undefined se não estiver claro
 */
function extractTreatmentDuration(data: MedicamentoData): string | undefined {
  // 1. Verificar se tem campo duracaoTratamento
  if (data.duracaoTratamento) {
    return data.duracaoTratamento;
  }

  // 2. Tentar extrair das observações (apenas padrões claros)
  if (data.observacoes) {
    const match = data.observacoes.match(/(?:por|durante|tratamento de)\s+(\d+(?:-\d+)?)\s*dias?/i);
    if (match) return `${match[1]} dias`;

    // Verificar dose única
    if (data.observacoes.toLowerCase().includes('dose única')) {
      return 'dose única';
    }
  }

  // 3. Verificar intervalo para dose única
  if (data.parametrosCalculo?.intervalo?.toLowerCase().includes('dose única')) {
    return 'dose única';
  }

  // 4. Se não encontrar, retornar undefined (NÃO inventar)
  return undefined;
}

/**
 * Converte MedicamentoData (TSX) para Medication (JSON)
 */
export function convertTsxToMedication(tsxMed: MedicamentoExport): Medication {
  const { data, calcularDose } = tsxMed;

  // Montar via de administração
  const application = Array.isArray(data.viaAdministracao)
    ? data.viaAdministracao.join('/')
    : data.viaAdministracao;

  // Montar nomes comerciais
  const brandNames = data.nomesComerciais?.join(', ') || '';

  // Montar notas de administração
  let adminNotes = '';
  if (data.observacoes) adminNotes += data.observacoes;
  if (data.reconstituicao?.necessaria && data.reconstituicao.diluente) {
    adminNotes += `\nReconstituir com ${data.reconstituicao.volumeMl || ''}mL de ${data.reconstituicao.diluente}.`;
  }
  if (data.diluicao) {
    adminNotes += `\nDiluir em ${data.diluicao.volumeMl} de ${data.diluicao.solucao}.`;
    if (data.diluicao.tempoInfusao) {
      adminNotes += ` Infundir em ${data.diluicao.tempoInfusao}.`;
    }
  }

  // Criar parâmetros de cálculo
  const calculationParams: DosageCalculationParams = {
    type: data.id,

    // Adicionar função customizada de cálculo (do TSX)
    customCalculator: calcularDose,

    // 🐛 DEBUG
    _hasTsxCalculator: !!calcularDose,
    _medicamentoId: data.id,

    // Parâmetros de dose
    mgPerKg: data.parametrosCalculo?.doseUsualMgKg,
    maxDailyDoseMg: data.parametrosCalculo?.doseMaxDiariaMg,
    dosesPerDay: data.parametrosCalculo?.dosesAoDia,

    // Concentração
    concentrationNumeratorMg: data.parametrosCalculo?.concentracaoNumeradorMg,
    concentrationDenominatorMl: data.parametrosCalculo?.concentracaoDenominadorMl,

    // Informações adicionais
    doseMinMgKg: data.parametrosCalculo?.doseMinMgKg,
    doseMaxMgKg: data.parametrosCalculo?.doseMaxMgKg,
    intervalo: data.parametrosCalculo?.intervalo,
    formulaCalculo: data.parametrosCalculo?.formulaCalculo,

    // 🆕 Dose mínima e máxima (texto para exibição)
    doseMinima: data.doseMinima,
    doseMaxima: data.doseMaxima,

    // 🆕 Lógica de cálculo (texto legível)
    logica_js: data.parametrosCalculo?.formulaCalculo || data.doseUsualTexto,

    // 🆕 Duração do tratamento (se explícita)
    duracaoTratamento: data.duracaoTratamento,
    treatmentDuration: extractTreatmentDuration(data),

    // 🆕 Restrições de idade/peso para validação central
    restricaoIdade: data.restricaoIdade,
  };

  // Montar objeto Medication
  const medication: Medication = {
    name: data.nome,
    slug: data.id,
    application,
    form: data.formaFarmaceutica,
    description: data.classe.descricao || `Medicamento da categoria ${data.categoria}`,
    alerts: data.alertas || [],
    commonBrandNames: brandNames,

    dosageInformation: {
      concentration: extractConcentration(data),
      // Dose usual: texto descritivo (ex: "50 a 90 mg/kg/dia")
      usualDose: data.doseUsualTexto,
      doseInterval: data.parametrosCalculo?.intervalo || '',
      treatmentDuration: extractTreatmentDuration(data) || undefined, // undefined se não explícita
      administrationNotes: adminNotes.trim(),
    },

    calculationParams,
  };

  return medication;
}

/**
 * Converte array de medicamentos TSX para array de Medication
 */
export function convertTsxMedicationsArray(tsxMeds: MedicamentoExport[]): Medication[] {
  return tsxMeds.map(convertTsxToMedication);
}

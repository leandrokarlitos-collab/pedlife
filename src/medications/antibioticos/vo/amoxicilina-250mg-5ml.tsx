/**
 * Amoxicilina 250 mg/5 mL - Suspensão Oral
 *
 * Antibiótico da classe das Penicilinas para uso oral.
 * Indicado para infecções bacterianas em pediatria.
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-250mg-5ml',
  nome: 'Amoxicilina 250 mg/5 mL',
  nomesComerciais: ['Amoxil', 'Novamox', 'Amoxicilina Genérico'],

  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',

  classe: {
    nome: 'Penicilina',
    descricao: 'Antibiótico beta-lactâmico de amplo espectro',
  },

  categoria: 'antibioticos',

  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada ou diluente próprio',
    estabilidade: 'Válido por até 14 dias após reconstituição, sob refrigeração',
  },

  doseUsualTexto: '50 a 90 mg/kg/dia, por via oral a cada 12/12h',
  doseMinima: '50 mg/kg/dia',
  doseMaxima: '1750 mg/dia',

  parametrosCalculo: {
    doseMinMgKg: 50,
    doseMaxMgKg: 90,
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 1750,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,5 mL = volume de 12/12h',
    logicaJs: `
      const doseDiaria = Math.min(peso * 50, 1750);
      const dosePorTomada = doseDiaria / 2;
      const volumeMl = (dosePorTomada / 250) * 5;
      return Math.round(volumeMl * 10) / 10;
    `,
  },

  restricaoIdade: {
    idadeMinima: '≥ 2 meses',
    observacao: 'Uso seguro em lactentes a partir de 2 meses de idade',
  },

  observacoes:
    'Agitar antes de usar. Administrar por via oral, preferencialmente 1h após refeição. Após ser reconstituído: Válido por até 14 dias sob refrigeração.',

  alertas: [
    'Verificar histórico de alergia a penicilinas',
    'Pode causar diarreia e rash cutâneo',
    'Ajustar dose em insuficiência renal',
  ],

  ultimaAtualizacao: '2026-02-02',
};

/**
 * Calcula a dose de Amoxicilina 250mg/5mL baseado no peso
 */
export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const alertas: string[] = [];
  const observacoes: string[] = [];

  // 1. Verificar restrição de idade (idade em meses)
  console.log(`[DEBUG] Amoxicilina 250mg atingiu calcularDose: peso=${peso}, idadeMeses=${idade}`);
  if (idade !== undefined && idade < 2) {
    alertas.push('Uso restrito: medicamento não recomendado para menores de 2 meses.');
  }

  // Dose usual: 50 mg/kg/dia dividido em 2 doses
  const doseDiariaMg = Math.min(peso * 50, 1750);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 250) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  // 2. Verificar se atingiu dose máxima
  if (peso * 50 >= 1750) {
    alertas.push('Dose máxima diária atingida (1750 mg/dia)');
  }

  // Adicionar observação sobre agitar
  observacoes.push('Agitar bem o frasco antes de cada dose');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes,
    alertas,
  };
}

// Exportação padrão do módulo
const medicamento: MedicamentoExport = {
  data,
  calcularDose,
};

export default medicamento;

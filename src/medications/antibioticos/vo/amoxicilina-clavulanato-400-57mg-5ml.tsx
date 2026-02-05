/**
 * Amoxicilina + Clavulanato 400 + 57 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-clavulanato-400-57mg-5ml',
  nome: 'Amoxicilina + Clavulanato 400 + 57 mg/5 mL',
  nomesComerciais: ['Clavulin BD'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Penicilina + Inibidor de beta-lactamase',
    descricao: 'Antibiótico com espectro ampliado',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
    estabilidade: 'Válido por 7 dias sob refrigeração',
  },
  doseUsualTexto: '30 a 50 mg/kg/dia, por via oral a cada 12/12h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '1750 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 30,
    doseMaxMgKg: 50,
    doseUsualMgKg: 40,
    doseMaxDiariaMg: 1750,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 400,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,3125 mL = nº mL de 12/12h',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 meses',
  },
  observacoes: 'Administrar no início das refeições.',
  alertas: ['Verificar histórico de alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 40, 1750);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 400) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 40 >= 1750) alertas.push('Dose máxima diária atingida');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg (de amoxicilina)`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes: ['Administrar no início das refeições'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

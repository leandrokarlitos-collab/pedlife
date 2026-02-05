/**
 * Amoxicilina + Clavulanato 250 + 62,5 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-clavulanato-250-62-5mg-5ml',
  nome: 'Amoxicilina + Clavulanato 250 + 62,5 mg/5 mL',
  nomesComerciais: ['Clavulin', 'Clavulin BD'],
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
  doseUsualTexto: '20 a 40 mg/kg/dia, por via oral a cada 8/8h',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '1500 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 20,
    doseMaxMgKg: 40,
    doseUsualMgKg: 25,
    doseMaxDiariaMg: 1500,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,1333 mL = nº mL de 8/8h',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 meses',
  },
  observacoes: 'Administrar no início das refeições para reduzir intolerância GI.',
  alertas: ['Verificar histórico de alergia a penicilinas', 'Monitorar função hepática em uso prolongado'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 25, 1500);
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = (dosePorTomadaMg / 250) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 25 >= 1500) alertas.push('Dose máxima diária atingida');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg (de amoxicilina)`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Administrar no início das refeições'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

/**
 * Piperacilina + Tazobactam 4g + 500mg - Pó para Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'piperacilina-tazobactam-ev',
  nome: 'Piperacilina + Tazobactam 4g + 500mg',
  nomesComerciais: ['Tazocin', 'Tazobac'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Penicilina + Inibidor de beta-lactamase',
    descricao: 'Antibiótico de amplo espectro para infecções graves',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'SF 0,9%, SG 5% ou Água Destilada',
    volumeMl: 20,
    concentracaoFinal: '≈ 200 mg/mL (total piperacilina+tazobactam)',
  },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100-200 mL',
    tempoInfusao: '≥ 60 min',
  },
  doseUsualTexto: '240 a 400 mg/kg/dia divididos em 3 a 4 doses',
  doseMinima: '240 mg/kg/dia',
  doseMaxima: '18 g/dia (piperacilina) + 2,25 g/dia (tazobactam)',
  parametrosCalculo: {
    doseMinMgKg: 240,
    doseMaxMgKg: 400,
    doseUsualMgKg: 240,
    doseMaxDiariaMg: 18000,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 3,
    formulaCalculo: `Peso (kg) × 0,4 mL/dose (240 mg/kg/dia) 3 doses/dia
Peso (kg) × 0,67 mL/dose (400 mg/kg/dia)`,
  },
  observacoes: `Ajustar dose em insuficiência renal.
Não misturar na mesma solução com aminoglicosídeos.
Utilizar imediatamente após preparo ou refrigerar por até 24h.`,
  alertas: [
    'Não misturar com aminoglicosídeos',
    'Ajustar em insuficiência renal',
    'Observar sinais de hipersensibilidade',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 240, 18000);
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = dosePorTomadaMg / 200;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 240 >= 18000) alertas.push('Dose máxima diária atingida');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído)`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Reconstituir com 20 mL', 'Infundir em ≥ 60 min'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

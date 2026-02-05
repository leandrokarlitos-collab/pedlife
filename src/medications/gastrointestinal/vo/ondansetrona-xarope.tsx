/**
 * Ondansetrona 0,8 mg/mL (4 mg/5 mL) - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ondansetrona-xarope',
  nome: 'Ondansetrona 0,8 mg/mL (4 mg/5 mL)',
  nomesComerciais: ['Zofran', 'Vonau'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope',
  classe: {
    nome: 'Antiemético',
  },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: `Crianças de 6m a 11 anos: 5 mL (4 mg), 2 a 3 vezes ao dia
≥ 12 anos: 10 mL (8 mg), 2 vezes ao dia`,
  doseMinima: '4 mg',
  doseMaxima: '24 mg/dia',
  parametrosCalculo: {
    intervalo: '8/8h ou 12/12h',
    concentracaoNumeradorMg: 4,
    concentracaoDenominadorMl: 5,
  },
  observacoes: `Administrar 30 minutos antes da quimioterapia.
Risco de prolongamento do intervalo QT.
Cautela em insuficiência hepática.`,
  alertas: ['Risco de prolongamento QT'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl: number;
  let doseMg: number;
  let intervalo: string;

  if (idade !== undefined && idade >= 12) {
    volumeMl = 10; doseMg = 8; intervalo = '12/12h';
  } else {
    volumeMl = 5; doseMg = 4; intervalo = '8/8h (2-3x/dia)';
  }

  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo,
    observacoes: ['Dose fixa por idade'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

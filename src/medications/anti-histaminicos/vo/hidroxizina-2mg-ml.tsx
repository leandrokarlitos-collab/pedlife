/**
 * Hidroxizina 2 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'hidroxizina-2mg-ml',
  nome: 'Hidroxizina 2 mg/mL (Xarope)',
  nomesComerciais: ['Hixizine', 'Prurizin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope',
  classe: {
    nome: 'Anti-histamínico de 1ª geração',
    descricao: 'Anti-histamínico com efeito sedativo',
  },
  categoria: 'anti-histaminicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Crianças: 0,7 mg/kg/dose, de 8/8h (3 vezes ao dia)',
  doseMinima: '0,7 mg/kg/dose',
  doseMaxima: '< 6 anos: 50 mg/dia | ≥ 6 anos: 100 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 0.7,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 2,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,35 mL por dose',
  },
  observacoes: `Causa sonolência.
Usar com cautela com outros depressores do SNC.
Pode ser necessário ajuste de dose em insuficiência renal ou hepática.`,
  alertas: [
    'Causa sonolência',
    'Evitar com outros depressores do SNC',
    'Cautela em insuficiência renal/hepática',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 0.7;
  const volumeMl = dosePorTomadaMg / 2;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  // Verificar dose máxima por idade
  const doseMaxDiaria = (idade !== undefined && idade < 6) ? 50 : 100;
  const doseDiariaCalculada = dosePorTomadaMg * 3;

  const alertas: string[] = [];
  if (doseDiariaCalculada > doseMaxDiaria) {
    alertas.push(`Dose diária calculada (${doseDiariaCalculada.toFixed(0)} mg) excede máximo (${doseMaxDiaria} mg/dia)`);
  }

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Causa sonolência'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

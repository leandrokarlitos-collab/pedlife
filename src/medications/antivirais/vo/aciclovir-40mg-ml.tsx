/**
 * Aciclovir 40 mg/mL - Suspensão Oral (HPMIX)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'aciclovir-40mg-ml',
  nome: 'Aciclovir (HPMIX) 40 mg/mL',
  nomesComerciais: ['Zovirax', 'Aciclovir Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: {
    nome: 'Antiviral',
    descricao: 'Antiviral para herpes simples e herpes zoster',
  },
  categoria: 'antivirais',
  reconstituicao: { necessaria: false },
  doseUsualTexto: `Tratamento H. Simples: 20 mg/kg/dose de 6/6h (4x/dia)
Supressão H. Simples (Imunocomprometidos): 20 mg/kg/dose de 6/6h
Tratamento H. Zóster (>6 anos): 800 mg (20 mL) de 6/6h`,
  doseMinima: '20 mg/kg/dose',
  doseMaxima: '800 mg por dose',
  parametrosCalculo: {
    doseUsualMgKg: 20,
    doseMaxDiariaMg: 3200,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 40,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,5 mL por dose (para dose de 20 mg/kg)',
  },
  observacoes: `Ajustar dose em insuficiência renal.
Manter boa hidratação.
Agitar bem a suspensão antes de usar.
Eficácia maior com início precoce do tratamento.`,
  alertas: [
    'Manter hidratação adequada',
    'Ajustar em insuficiência renal',
    'Iniciar tratamento precocemente',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = Math.min(peso * 20, 800);
  const volumeMl = dosePorTomadaMg / 40;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 20 >= 800) alertas.push('Dose máxima por tomada atingida (800 mg)');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Agitar bem antes de usar', 'Manter hidratação'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

/**
 * Dipirona 500 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dipirona-gotas',
  nome: 'Dipirona 500 mg/mL (Gotas)',
  nomesComerciais: ['Novalgina', 'Dipirona Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Gotas',
  classe: {
    nome: 'Analgésico/Antipirético',
    descricao: 'Analgésico e antipirético derivado pirazolona',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10-25 mg/kg/dose a cada 6-8 horas (1 gota = 25 mg)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '25 mg/kg/dose',
  parametrosCalculo: {
    doseMinMgKg: 10,
    doseMaxMgKg: 25,
    doseUsualMgKg: 15,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    formulaCalculo: '1 gota/kg para dose de 25 mg/kg (cada gota = 25 mg)',
  },
  restricaoIdade: {
    idadeMinima: '≥ 3 meses',
    observacao: 'Uso restrito em alguns países por risco de agranulocitose',
  },
  observacoes: `Pode causar hipotensão se administrada rapidamente.
Risco raro de agranulocitose.
1 gota = 25 mg.`,
  alertas: [
    'Risco raro de agranulocitose',
    'Pode causar hipotensão',
    'Evitar uso prolongado',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMg = peso * 15;
  const gotasPorDose = doseMg / 25; // 1 gota = 25 mg

  const alertas: string[] = [];
  if (idade !== undefined && idade < 0.25) {
    alertas.push('Cautela em < 3 meses');
  }

  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotasPorDose.toFixed(0)} gotas`,
    unidade: 'gotas',
    intervalo: '6/6h ou 8/8h',
    observacoes: ['1 gota = 25 mg'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

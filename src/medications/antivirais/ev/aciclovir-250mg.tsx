/**
 * Aciclovir 250 mg - Pó para Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'aciclovir-250mg-ev',
  nome: 'Aciclovir 250 mg',
  nomesComerciais: ['Zovirax IV'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Antiviral',
    descricao: 'Antiviral para herpes grave e encefalite herpética',
  },
  categoria: 'antivirais',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para Injeção ou SF 0,9%',
    volumeMl: 10,
    concentracaoFinal: '25 mg/mL',
  },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '50-100 mL',
    tempoInfusao: '60 min',
  },
  doseUsualTexto: `Crianças (3m-12a): 250-500 mg/m² a cada 8 horas
Neonatos (até 3m): 10-20 mg/kg a cada 8 horas`,
  doseMinima: '250 mg/m² (crianças) ou 10 mg/kg (neonatos)',
  doseMaxima: '500 mg/m²/dose (crianças) ou 20 mg/kg/dose (neonatos)',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: `Crianças: Calcular ASC (m²), Dose = ASC × [250 ou 500]
Neonatos: Volume(mL) = (Peso(kg) × [10 ou 20]) ÷ 25 mg/mL`,
  },
  observacoes: `Infusão lenta, durante 1 hora, para evitar danos renais.
Manter hidratação adequada do paciente.
Ajustar dose em insuficiência renal.
Usar imediatamente após preparo.`,
  alertas: [
    'Infusão deve ser LENTA (1 hora)',
    'Nefrotóxico se infusão rápida',
    'Manter hidratação',
    'Ajustar em insuficiência renal',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  // Usando dose de 10 mg/kg para neonatos/pediatria
  const dosePorTomadaMg = peso * 10;
  const volumeMl = dosePorTomadaMg / 25;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  const alertas: string[] = ['Infundir em pelo menos 1 hora'];
  const observacoes = [
    'Reconstituir com 10 mL de AD ou SF 0,9%',
    'Diluir em 50-100 mL para infusão',
    'Manter hidratação do paciente',
  ];

  if (idade !== undefined && idade < 0.25) {
    // Neonato (< 3 meses)
    observacoes.push('Neonato: dose de 10-20 mg/kg/dose');
  }

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído)`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes,
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

/**
 * Ibuprofeno 50 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ibuprofeno-50mg-ml',
  nome: 'Ibuprofeno 50 mg/mL (Gotas)',
  nomesComerciais: ['Alivium', 'Ibuprofeno Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Gotas',
  classe: {
    nome: 'AINE',
    descricao: 'Anti-inflamatório não esteroidal',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Crianças (>6 meses): 1 a 2 gotas por kg de peso, 3 a 4 vezes ao dia',
  doseMinima: '1 gota/kg/dose',
  doseMaxima: '40 gotas (200 mg) por dose',
  parametrosCalculo: {
    doseMinMgKg: 5,
    doseMaxMgKg: 10,
    doseUsualMgKg: 10,
    doseMaxDiariaMg: 40,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    formulaCalculo: '1 a 2 gotas por kg de peso por dose (1 gota = 2,5 mg)',
  },
  restricaoIdade: {
    idadeMinima: '> 6 meses',
    observacao: 'Não utilizar em crianças menores de 6 meses',
  },
  observacoes: `Administrar preferencialmente após as refeições.
O intervalo entre doses deve ser de 6 a 8 horas.
Não utilizar em crianças menores de 6 meses.`,
  alertas: [
    'Não usar em < 6 meses',
    'Administrar após refeições',
    'Pode causar irritação gástrica',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const gotasPorDose = Math.min(peso * 2, 40); // 2 gotas/kg, máx 40 gotas

  const alertas: string[] = [];
  if (idade !== undefined && idade < 0.5) {
    alertas.push('CONTRAINDICADO em menores de 6 meses');
  }
  if (peso * 2 >= 40) {
    alertas.push('Dose máxima por tomada atingida (40 gotas)');
  }

  return {
    doseCalculada: `${(gotasPorDose * 2.5).toFixed(0)} mg`,
    volumeCalculado: `${gotasPorDose.toFixed(0)} gotas`,
    unidade: 'gotas',
    intervalo: '6/6h ou 8/8h',
    observacoes: ['Administrar após refeições', '1 gota = 2,5 mg'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

/**
 * Ibuprofeno 200 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'ibuprofeno-200mg-ml-gotas',
    nome: 'Ibuprofeno 200 mg/mL (Gotas)',
    nomesComerciais: ['Alivium', 'Ibuprofeno Genérico'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Gotas',
    classe: {
        nome: 'Anti-inflamatório Não Esteroidal (AINE)',
    },
    categoria: 'analgesicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: '5 a 10 mg/kg/dose, a cada 6 a 8 horas.',
    doseMinima: '5 mg/kg/dose',
    doseMaxima: '40 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 5,
        intervalo: '6/6h ou 8/8h',
        dosesAoDia: 4,
        concentracaoNumeradorMg: 200,
        concentracaoDenominadorMl: 1,
        formulaCalculo: '1 gota a cada 2 kg de peso (1 mL = 10 gotas)',
    },
    restricaoIdade: {
        idadeMinima: '≥ 6 meses',
    },
    observacoes: '1 mL equivale a 10 gotas nesta apresentação. Administrar preferencialmente após as refeições.',
    alertas: [
        'Não utilizar em menores de 6 meses',
        'Concentração alta - atenção ao número de gotas',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const doseMg = peso * 5; // Usando 5 mg/kg como base
    const numGotas = Math.round(peso / 2); // 1 gota a cada 2 kg

    const alertas: string[] = [];
    if (idade !== undefined && idade < 0.5) {
        alertas.push('Não recomendado para menores de 6 meses');
    }

    return {
        doseCalculada: `${doseMg.toFixed(0)} mg`,
        volumeCalculado: `${numGotas} gotas`,
        unidade: 'gotas',
        intervalo: '6/6 ou 8/8 horas',
        observacoes: ['Atenção: Concentração elevada'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

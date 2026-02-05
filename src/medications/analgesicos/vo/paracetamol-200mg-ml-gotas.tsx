/**
 * Paracetamol 200 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'paracetamol-200mg-ml-gotas',
    nome: 'Paracetamol 200 mg/mL (Gotas)',
    nomesComerciais: ['Tylenol Baby', 'Paracetamol Genérico'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Gotas',
    classe: {
        nome: 'Analgésico e Antipirético',
    },
    categoria: 'analgesicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: '10 a 15 mg/kg/dose (aprox. 1 gota/kg), a cada 4 a 6 horas.',
    doseMinima: '10 mg/kg/dose',
    doseMaxima: '75 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 15,
        intervalo: '4/4h ou 6/6h',
        dosesAoDia: 5,
        concentracaoNumeradorMg: 200,
        concentracaoDenominadorMl: 1,
        formulaCalculo: '1 gota por kg de peso (máximo 35-40 gotas)',
    },
    observacoes: 'Não exceder 5 doses em 24 horas. Risco de hepatotoxicidade em superdosagem.',
    alertas: [
        'Risco de hepatotoxicidade em doses elevadas',
        'Não exceder 5 doses por dia',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const numGotas = Math.min(Math.round(peso), 40); // 1 gota/kg, limitado a 40 gotas

    return {
        doseCalculada: `${numGotas * 10} mg`,
        volumeCalculado: `${numGotas} gotas`,
        unidade: 'gotas',
        intervalo: '4/4 ou 6/6 horas',
        observacoes: ['Não exceder 5 doses ao dia'],
        alertas: numGotas === 40 ? ['Dose máxima atingida (40 gotas)'] : [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

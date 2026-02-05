/**
 * Dimenidrinato 25 mg/mL + Vit. B6 5 mg/mL (Dramin B6 Gotas)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'dimenidrinato-gotas',
    nome: 'Dimenidrinato + Vit. B6 (Dramin B6 Gotas)',
    nomesComerciais: ['Dramin B6 Gotas'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Gotas',
    classe: {
        nome: 'Antiemético / Anti-histamínico',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças (>2 anos): 1,25 mg/kg/dose a cada 6 a 8 horas.',
    doseMinima: '1,25 mg/kg/dose',
    doseMaxima: '7,5 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 1.25,
        intervalo: '6/6h ou 8/8h',
        dosesAoDia: 4,
        concentracaoNumeradorMg: 25,
        concentracaoDenominadorMl: 1,
        formulaCalculo: '1 gota por kg por dose',
    },
    restricaoIdade: {
        idadeMinima: '≥ 2 anos',
        observacao: 'Contraindicado para menores de 2 anos',
    },
    observacoes: '1 mL equivale a 20 gotas. Causa sonolência.',
    alertas: [
        'Contraindicado para menores de 2 anos',
        'Pode causar sonolência',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const numGotas = Math.round(peso); // 1 gota por kg

    const alertas: string[] = [];
    if (idade !== undefined && idade < 2) {
        alertas.push('Contraindicado para menores de 2 anos');
    }

    return {
        doseCalculada: `${(numGotas * 1.25).toFixed(1)} mg`,
        volumeCalculado: `${numGotas} gotas`,
        unidade: 'gotas',
        intervalo: '6/6 ou 8/8 horas',
        observacoes: ['Causa sonolência'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

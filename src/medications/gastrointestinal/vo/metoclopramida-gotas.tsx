/**
 * Metoclopramida 4 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'metoclopramida-gotas',
    nome: 'Metoclopramida 4 mg/mL (Gotas)',
    nomesComerciais: ['Plasil'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Gotas',
    classe: {
        nome: 'Antiemético / Procinético',
    },
    categoria: 'gastrointestinal',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças (>1 ano): 1 a 2 gotas por kg de peso, 3 vezes ao dia.',
    doseMinima: '1 gota/kg/dose',
    doseMaxima: '2 gotas/kg/dose',
    parametrosCalculo: {
        doseUsualMgKg: 0.2, // Aprox 1 gota/kg
        intervalo: '8/8h',
        dosesAoDia: 3,
        concentracaoNumeradorMg: 4,
        concentracaoDenominadorMl: 1,
        formulaCalculo: '1 a 2 gotas por kg por dose',
    },
    restricaoIdade: {
        idadeMinima: '≥ 1 ano',
        observacao: 'Contraindicado para menores de 1 ano',
    },
    observacoes: 'Risco de reações extrapiramidais (espasmos), principalmente em crianças. Administrar 30 min antes das refeições.',
    alertas: [
        'Risco de reações extrapiramidais (espasmos)',
        'Contraindicado para menores de 1 ano',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const numGotas = Math.round(peso); // 1 gota por kg

    const alertas: string[] = [];
    if (idade !== undefined && idade < 1) {
        alertas.push('Contraindicado para menores de 1 ano');
    }

    return {
        doseCalculada: `${(numGotas * 0.2).toFixed(1)} mg`,
        volumeCalculado: `${numGotas} gotas`,
        unidade: 'gotas',
        intervalo: '8/8 horas',
        observacoes: ['Administrar 30 min antes das refeições'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

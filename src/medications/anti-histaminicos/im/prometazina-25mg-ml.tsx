/**
 * Prometazina 25 mg/mL - Ampola 2 mL
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'prometazina-25mg-ml',
    nome: 'Prometazina 25 mg/mL',
    nomesComerciais: ['Fenergan'],
    viaAdministracao: 'IM',
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Anti-histamínico de 1ª geração',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças (>2 anos): 0,5 a 1 mg/kg/dose.',
    doseMinima: '0,5 mg/kg/dose',
    doseMaxima: '1 mg/kg/dose',
    parametrosCalculo: {
        doseUsualMgKg: 0.5,
        intervalo: 'conforme necessidade',
        concentracaoNumeradorMg: 25,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,02 a 0,04 mL',
    },
    restricaoIdade: {
        idadeMinima: '≥ 2 anos',
        observacao: 'Contraindicado para menores de 2 anos',
    },
    observacoes: 'Deve ser administrada por via IM profunda. NUNCA administrar por via Subcutânea ou Intra-arterial (risco de necrose grave).',
    alertas: [
        'NUNCA administrar por via SC ou intra-arterial',
        'Risco de necrose grave',
        'Causa sonolência acentuada',
        'Contraindicado para menores de 2 anos',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const doseMg = peso * 0.5;
    const volumeMl = doseMg / 25;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    const alertas: string[] = [];
    if (idade !== undefined && idade < 2) {
        alertas.push('Contraindicado para menores de 2 anos');
    }

    return {
        doseCalculada: `${doseMg.toFixed(1)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: 'dose única (IM profunda)',
        observacoes: ['Administrar por via IM profunda apenas', 'Causa sonolência acentuada'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

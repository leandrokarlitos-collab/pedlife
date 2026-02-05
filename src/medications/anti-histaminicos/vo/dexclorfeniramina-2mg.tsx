/**
 * Maleato de Dexclorfeniramina 2 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'dexclorfeniramina-2mg',
    nome: 'Dexclorfeniramina 2 mg (Comprimido)',
    nomesComerciais: ['Polaramine'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Comprimido Oral',
    classe: {
        nome: 'Anti-histamínico de 1ª geração',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: `Dose fixa por idade:
- > 12 anos: 1 comprimido, 3 a 4 vezes por dia.
- 6 a 12 anos: 1/2 comprimido, 3 vezes por dia.`,
    doseMinima: '3 mg/dia (6-12a)',
    doseMaxima: '12 mg/dia (>12a)',
    parametrosCalculo: {
        intervalo: '6/6h ou 8/8h',
        dosesAoDia: 3,
    },
    restricaoIdade: {
        idadeMinima: '≥ 6 anos',
        observacao: 'Comprimido indicado para crianças que conseguem deglutir',
    },
    observacoes: 'Pode causar sonolência; evitar dirigir ou operar máquinas.',
    alertas: ['Pode causar sonolência acentuada'],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    let volumeComprimido = 0;
    let doseMg = 0;
    let intervalo = '8/8 horas';

    if (idade !== undefined) {
        if (idade < 6) {
            volumeComprimido = 0;
        } else if (idade < 12) {
            volumeComprimido = 0.5; doseMg = 1;
        } else {
            volumeComprimido = 1; doseMg = 2; intervalo = '6/6 ou 8/8 horas';
        }
    } else {
        if (peso < 35) {
            volumeComprimido = 0.5; doseMg = 1;
        } else {
            volumeComprimido = 1; doseMg = 2;
        }
    }

    const alertas: string[] = [];
    if (idade !== undefined && idade < 6) {
        alertas.push('Forma farmacêutica não recomendada para menores de 6 anos');
    }

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: `${volumeComprimido} comprimido`,
        unidade: 'comprimido',
        intervalo: intervalo,
        observacoes: ['Pode causar sonolência'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

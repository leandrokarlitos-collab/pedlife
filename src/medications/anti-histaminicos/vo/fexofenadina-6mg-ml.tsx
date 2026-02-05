/**
 * Fexofenadina 6 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'fexofenadina-6mg-ml',
    nome: 'Fexofenadina 6 mg/mL (Xarope)',
    nomesComerciais: ['Allegra'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Xarope',
    classe: {
        nome: 'Anti-histamínico de 2ª geração',
        descricao: 'Anti-histamínico não sedativo',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: `Dose fixa por idade, 2x ao dia:
- Urticária (6m a 2a): 2,5 mL (15 mg)
- Rinite/Urticária (2 a 11a): 5 mL (30 mg)`,
    doseMinima: '2,5 mL (15 mg)',
    doseMaxima: '5 mL (30 mg)',
    parametrosCalculo: {
        intervalo: '12/12h',
        dosesAoDia: 2,
        concentracaoNumeradorMg: 6,
        concentracaoDenominadorMl: 1,
    },
    restricaoIdade: {
        idadeMinima: '≥ 6 meses',
        observacao: 'A segurança não foi estabelecida abaixo de 6 meses',
    },
    observacoes: 'Agitar bem antes de usar. Não administrar com sucos de frutas.',
    alertas: ['Não administrar com sucos de frutas (toranja, laranja ou maçã)'],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    let volumeMl = 0;
    let doseMg = 0;
    let faixaEtaria = 'Não identificada';

    if (idade !== undefined) {
        if (idade < 0.5) {
            faixaEtaria = '< 6 meses';
        } else if (idade < 2) {
            volumeMl = 2.5; doseMg = 15; faixaEtaria = '6m a 2a';
        } else if (idade < 12) {
            volumeMl = 5; doseMg = 30; faixaEtaria = '2 a 11a';
        } else {
            volumeMl = 10; doseMg = 60; faixaEtaria = '≥ 12 anos';
        }
    } else {
        // Estimativa por peso
        if (peso < 12) {
            volumeMl = 2.5; doseMg = 15; faixaEtaria = '6m a 2a (estimada)';
        } else {
            volumeMl = 5; doseMg = 30; faixaEtaria = '2 a 11a (estimada)';
        }
    }

    const alertas: string[] = [];
    if (idade !== undefined && idade < 0.5) {
        alertas.push('Segurança não estabelecida para menores de 6 meses');
    }

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: `${volumeMl} mL`,
        unidade: 'mL',
        intervalo: '12/12 horas',
        observacoes: [`Dose para faixa etária: ${faixaEtaria}`, 'Agitar bem antes de usar', 'Não administrar com sucos'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

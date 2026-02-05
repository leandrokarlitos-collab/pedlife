/**
 * Desloratadina 5 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'desloratadina-5mg',
    nome: 'Desloratadina 5 mg (Comprimido)',
    nomesComerciais: ['Desalex', 'Esalerg'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Comprimido Oral',
    classe: {
        nome: 'Anti-histamínico de 2ª geração',
        descricao: 'Anti-histamínico não sedativo',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Maiores de 12 anos: 5 mg (1 comprimido) uma vez ao dia.',
    doseMinima: '5 mg/dia',
    doseMaxima: '5 mg/dia',
    parametrosCalculo: {
        intervalo: '24/24h',
        dosesAoDia: 1,
        formulaCalculo: 'Dose fixa de 1 comprimido ao dia',
    },
    restricaoIdade: {
        idadeMinima: '≥ 12 anos',
        observacao: 'Uso contraindicado para menores de 12 anos',
    },
    observacoes: 'Pode ser tomado com ou sem alimentos.',
    alertas: ['Não recomendado para menores de 12 anos'],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const alertas: string[] = [];
    if (idade !== undefined && idade < 12) {
        alertas.push('Uso contraindicado para menores de 12 anos');
    }

    return {
        doseCalculada: '5 mg',
        volumeCalculado: '1 comprimido',
        unidade: 'comprimido',
        intervalo: '24/24 horas (dose única diária)',
        observacoes: ['Dose fixa'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

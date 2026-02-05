/**
 * Cetirizina 10 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'cetirizina-10mg',
    nome: 'Cetirizina 10 mg (Comprimido)',
    nomesComerciais: ['Zyrtec'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Comprimido Oral',
    classe: {
        nome: 'Anti-histamínico de 2ª geração',
        descricao: 'Anti-histamínico não sedativo',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Adultos e crianças > 12 anos: 10 mg (1 comprimido) uma vez ao dia.',
    doseMinima: '10 mg/dia',
    doseMaxima: '10 mg/dia',
    parametrosCalculo: {
        intervalo: '24/24h',
        dosesAoDia: 1,
    },
    restricaoIdade: {
        idadeMinima: '≥ 12 anos',
    },
    observacoes: 'Pode ser tomado com ou sem alimentos. Pode causar sonolência em alguns pacientes.',
    alertas: ['Pode causar sonolência'],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const alertas: string[] = [];
    if (idade !== undefined && idade < 12) {
        alertas.push('Uso não recomendado nesta apresentação para menores de 12 anos');
    }

    return {
        doseCalculada: '10 mg',
        volumeCalculado: '1 comprimido',
        unidade: 'comprimido',
        intervalo: '24/24 horas (dose única diária)',
        observacoes: ['Dose fixa'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

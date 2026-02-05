/**
 * Fexofenadina - Comprimido (60/120/180 mg)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'fexofenadina-comprimido',
    nome: 'Fexofenadina (Comprimido)',
    nomesComerciais: ['Allegra'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Comprimido Oral',
    classe: {
        nome: 'Anti-histamínico de 2ª geração',
        descricao: 'Anti-histamínico não sedativo',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: `Dose única diária para > 12 anos:
- Rinite Alérgica: 120 mg ou 180 mg
- Urticária: 180 mg`,
    doseMinima: '120 mg/dia',
    doseMaxima: '180 mg/dia',
    parametrosCalculo: {
        intervalo: '24/24h',
        dosesAoDia: 1,
    },
    restricaoIdade: {
        idadeMinima: '≥ 12 anos',
        observacao: 'Uso não recomendado para menores de 12 anos',
    },
    observacoes: 'Administrar com líquido (água). Não administrar com sucos de frutas.',
    alertas: ['Não recomendado para menores de 12 anos', 'Evitar sucos de frutas'],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const alertas: string[] = [];
    if (idade !== undefined && idade < 12) {
        alertas.push('Uso não recomendado para menores de 12 anos');
    }

    return {
        doseCalculada: '120-180 mg',
        volumeCalculado: '1 comprimido',
        unidade: 'comprimido',
        intervalo: '24/24 horas (dose única diária)',
        observacoes: ['Dose fixa'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

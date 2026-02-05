/**
 * Hidroxizina 25 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'hidroxizina-25mg',
    nome: 'Hidroxizina 25 mg (Comprimido)',
    nomesComerciais: ['Hixizine', 'Prurizin'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Comprimido Oral',
    classe: {
        nome: 'Anti-histamínico de 1ª geração',
        descricao: 'Anti-histamínico com efeito sedativo',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças: 0,7 mg/kg/dose, de 8/8h (3 vezes ao dia)',
    doseMinima: '0,7 mg/kg/dose',
    doseMaxima: '< 6 anos: 50 mg/dia | ≥ 6 anos: 100 mg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 0.7,
        intervalo: '8/8h',
        dosesAoDia: 3,
        formulaCalculo: 'Peso (kg) × 0.7 ÷ 25 = nº CP',
    },
    restricaoIdade: {
        idadeMinima: '≥ 6 anos',
        observacao: 'Para crianças que conseguem deglutir comprimidos',
    },
    observacoes: `Causa sonolência.
Usar com cautela com outros depressores do SNC.
Pode ser necessário ajuste de dose em insuficiência renal ou hepática.`,
    alertas: [
        'Causa sonolência',
        'Evitar com outros depressores do SNC',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const dosePorTomadaMg = peso * 0.7;
    const numComprimidos = dosePorTomadaMg / 25;
    const numComprimidosArredondado = Math.round(numComprimidos * 4) / 4; // Arredonda para 0.25 mais próximo

    const doseMaxDiaria = (idade !== undefined && idade < 6) ? 50 : 100;
    const doseDiariaCalculada = dosePorTomadaMg * 3;

    const alertas: string[] = [];
    if (doseDiariaCalculada > doseMaxDiaria) {
        alertas.push(`Dose diária calculada (${doseDiariaCalculada.toFixed(0)} mg) excede máximo (${doseMaxDiaria} mg/dia)`);
    }

    return {
        doseCalculada: `${dosePorTomadaMg.toFixed(1)} mg`,
        volumeCalculado: `${numComprimidosArredondado} comprimido(s)`,
        unidade: 'comprimido(s)',
        intervalo: '8/8 horas',
        observacoes: ['Causa sonolência', 'Fracionar o comprimido se necessário'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

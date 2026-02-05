/**
 * Fluconazol 2 mg/mL - EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'fluconazol-ev',
    nome: 'Fluconazol 2 mg/mL (EV)',
    nomesComerciais: ['Zoltec'],
    viaAdministracao: 'EV',
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Antifúngico',
        descricao: 'Triazol',
    },
    categoria: 'antifungicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças: 6 a 12 mg/kg/dia, em dose única diária.',
    doseMinima: '6 mg/kg/dia',
    doseMaxima: '12 mg/kg/dia (máx 600 mg/dia)',
    parametrosCalculo: {
        doseUsualMgKg: 6,
        intervalo: '24/24h',
        dosesAoDia: 1,
        concentracaoNumeradorMg: 2,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 3 mL (para 6 mg/kg)',
    },
    observacoes: 'A infusão não deve exceder 200 mg/hora (100 mL/h). Proteger da luz.',
    alertas: [
        'Não exceder 200 mg/hora na infusão',
        'Monitorar função hepática e renal',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = Math.min(peso * 6, 600);
    const volumeMl = doseMg / 2;

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: `${volumeMl} mL`,
        unidade: 'mL',
        intervalo: '24/24 horas (dose única)',
        observacoes: ['Infundir em pelo menos 1 a 2 horas', 'Dose máxima de 600 mg atingida se peso > 100kg'],
        alertas: [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

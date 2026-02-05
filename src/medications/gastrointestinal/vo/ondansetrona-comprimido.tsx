/**
 * Ondansetrona 4 mg e 8 mg - Comprimido / Orodispersível
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'ondansetrona-comprimido',
    nome: 'Ondansetrona (Comprimido / Orodispersível)',
    nomesComerciais: ['Vonau Flash', 'Zofran'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Comprimido Oral',
    classe: {
        nome: 'Antiemético',
        descricao: 'Antagonista do receptor 5-HT3',
    },
    categoria: 'gastrointestinal',
    reconstituicao: { necessaria: false },
    doseUsualTexto: `Crianças de 2 a 11 anos: 4 mg, 2 a 3 vezes ao dia.
≥ 12 anos: 8 mg, 2 vezes ao dia.`,
    doseMinima: '4 mg',
    doseMaxima: '24 mg/dia',
    parametrosCalculo: {
        intervalo: '8/8h ou 12/12h',
        dosesAoDia: 3,
    },
    restricaoIdade: {
        idadeMinima: '≥ 2 anos',
    },
    observacoes: 'Formas orodispersíveis se dissolvem na língua, não precisam de água. Administrar 30-60 min antes da quimioterapia.',
    alertas: [
        'Risco de prolongamento do intervalo QT',
        'Cautela em insuficiência hepática',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    let doseMg = 0;
    let faixaEtaria = 'Não identificada';

    if (idade !== undefined) {
        if (idade < 2) {
            faixaEtaria = '< 2 anos';
        } else if (idade < 12) {
            doseMg = 4; faixaEtaria = '2 a 11a';
        } else {
            doseMg = 8; faixaEtaria = '≥ 12 anos';
        }
    } else {
        if (peso < 35) {
            doseMg = 4;
        } else {
            doseMg = 8;
        }
    }

    const alertas: string[] = [];
    if (idade !== undefined && idade < 2) {
        alertas.push('Uso não recomendado abaixo de 2 anos nesta forma');
    }

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: '1 comprimido',
        unidade: 'comprimido',
        intervalo: doseMg === 4 ? '8/8 ou 12/12 horas' : '12/12 horas',
        observacoes: [`Dose para faixa etária: ${faixaEtaria}`],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;

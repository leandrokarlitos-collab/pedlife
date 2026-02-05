# Medicamentos TSX sem Duração de Tratamento

**Data:** 02/02/2026  
**Total Analisado:** 228 medicamentos TSX

---

## 📊 Resumo Geral

| Status | Quantidade | Percentual |
|--------|------------|------------|
| **COM duração explícita** | 33 | 14.5% |
| **SEM duração explícita** | 195 | **85.5%** |

---

## 📋 Resumo por Categoria

| Categoria | Total | Com Duração | Sem Duração | % |
|-----------|-------|-------------|-------------|---|
| Analgesicos | 29 | 0 | 29 | 0% |
| Anti-histamínicos | 16 | 7 | 9 | 44% |
| **Antibióticos** | **87** | **5** | **82** | **6%** ⚠️ |
| Anticonvulsivantes | 7 | 2 | 5 | 29% |
| Antídotos | 4 | 1 | 3 | 25% |
| Antifúngicos | 7 | 2 | 5 | 29% |
| **Antiparasitários** | 9 | **6** | 3 | **67%** ✅ |
| Antitussígenos | 20 | 1 | 19 | 5% |
| Antivirais | 3 | 0 | 3 | 0% |
| Corticoides | 8 | 3 | 5 | 38% |
| Gastrointestinal | 26 | 4 | 22 | 15% |
| Inalatórios | 7 | 0 | 7 | 0% |
| Vitaminas | 5 | 2 | 3 | 40% |

---

## ⚠️ Categorias Prioritárias (Mais Usadas)

### 🔴 Antibióticos - 82 sem duração (94%)
**Impacto:** ALTO - Categoria mais usada

Todos os antibióticos precisam de duração de tratamento definida (geralmente 7-10 dias). Sugestões:
- Penicilinas: 7-10 dias
- Cefalosporinas: 7-10 dias
- Macrolídeos: 5-7 dias
- Tuberculostáticos: conforme protocolo (meses)

### 🟡 Analgésicos - 29 sem duração (100%)
**Impacto:** MÉDIO - Uso frequente mas geralmente "conforme necessário"

A maioria é uso sintomático. Opções:
- "conforme necessário" ou
- "3-5 dias" (para processo inflamatório) ou
- Deixar sem duração (já que é SOS)

### 🟡 Gastrointestinal - 22 sem duração (85%)
**Impacto:** MÉDIO

Varia muito:
- Antieméticos: geralmente SOS
- Laxativos: até regularização
- IBP: 14-28 dias

---

## ✅ Medicamentos COM Duração (33)

### Por Tipo:
- **"dose única"**: 28 medicamentos (principalmente anti-histamínicos e IM)
- **Duração específica**: 5 medicamentos

### Exemplos com Duração:
1. Prometazina (anti-histamínicos): dose única
2. Desloratadina (anti-histamínicos): dose única
3. Penicilina Benzatina (antibióticos IM): dose única
4. Albendazol (antiparasitários): 3 dias
5. Ivermectina (antiparasitários): dose única

---

## 💡 Recomendações

### Opção A: Adicionar duracaoTratamento nos TSX
Editar cada arquivo TSX para adicionar:
```typescript
duracaoTratamento: '7-10 dias', // ou conforme o medicamento
```

**Vantagem:** Duração específica e precisa  
**Desvantagem:** Precisa editar 195 arquivos

### Opção B: Deixar sem duração
Formatar apenas como: `"X mL de 8/8 horas"`

**Vantagem:** Sem trabalho adicional  
**Desvantagem:** Informação incompleta

### Opção C: Híbrido (Recomendado)
- Adicionar duração apenas para **antibióticos** (alta prioridade)
- Deixar outros como "conforme necessário" ou sem duração
- Total a editar: ~82 arquivos (antibióticos)

---

## 🎯 Formato Atual Implementado

Com a implementação atual:

### Se TEM duração:
```
"17.5 mL de 12/12 horas, por 7-10 dias"
```

### Se NÃO TEM duração:
```
"17.5 mL de 12/12 horas"
```

**Sistema NÃO inventa durações** - reporta apenas o que está explícito! ✅

---

**Gerado em:** 02/02/2026

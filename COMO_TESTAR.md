# Como Testar o Sistema TSX

**Data:** 02/02/2026

---

## 🚀 Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor inicia na porta **8080**: http://localhost:8080

---

## 🔍 Debug no Console do Navegador

### 1. Abra o Console (F12 → Console)

### 2. Ao carregar a aplicação, você verá:

```
✅ [TSX] Carregado 87 medicamentos para antibioticos
🔍 [DEBUG] Primeiro medicamento TSX: Amoxicilina 250 mg/5 mL
🔍 [DEBUG] Tem customCalculator? true

✅ [TSX] Carregado 29 medicamentos para analgesicos
🔍 [DEBUG] Primeiro medicamento TSX: Dipirona 500 mg/mL (Gotas)
🔍 [DEBUG] Tem customCalculator? true

📋 [JSON] Carregado 9 medicamentos para pcr
```

**✅ Se mostrar `true` para customCalculator** = TSX está carregando corretamente!

### 3. Navegue até um medicamento TSX

Exemplo: `Antibióticos` → `Amoxicilina 250 mg/5 mL`

### 4. Preencha o formulário

- **Peso:** 10 kg
- **Idade:** 2 anos
- Clique em **Calcular**

### 5. Verifique os logs ao calcular:

```
🔍 [DEBUG] Verificando customCalculator: {
  temCustomCalculator: true,
  tipoCustomCalculator: "function",
  medicamentoId: "amoxicilina-250mg-5ml",
  hasTsxCalculator: true
}

✅ [TSX] Usando calcularDose() do TSX para: amoxicilina-250mg-5ml

📊 [TSX] Resultado: {
  doseCalculada: "250 mg",
  volumeCalculado: "2.5 mL",
  unidade: "mL",
  intervalo: "12/12 horas",
  observacoes: [...],
  alertas: []
}
```

### 6. Resultado Exibido na Tela

**Esperado:**
```
2.5 mL de 12/12 horas
```

---

## ❌ Se NÃO Funcionar

### Cenário 1: customCalculator é `undefined`

**Problema:** Funções não estão sendo preservadas

**Solução:** Verificar se o import está correto em `tsxMedicationLoader.ts`

### Cenário 2: Erro no console

**Problema:** Algum erro de TypeScript ou runtime

**Solução:** Verificar mensagem de erro específica

### Cenário 3: Mostra texto genérico

**Problema:** Não está usando `calculateDosage()` universal

**Solução:** Verificar se a lógica em `MedicationCalculatorPage.tsx` está correta

---

## 🐛 Checklist de Debug

- [ ] Console mostra `✅ [TSX] Carregado X medicamentos`?
- [ ] Console mostra `Tem customCalculator? true`?
- [ ] Ao calcular, mostra `✅ [TSX] Usando calcularDose()`?
- [ ] Resultado mostra volume específico (ex: "2.5 mL")?
- [ ] Formato está correto ("X mL de 8/8 horas")?

---

## 📝 Comandos Úteis

### Recompilar TypeScript
```bash
npm run build
```

### Verificar Erros de Lint
```bash
npm run lint
```

### Limpar Cache e Reiniciar
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules/.vite
npm run dev
```

---

## 📊 Medicamentos para Testar

### Antibióticos (TSX):
1. **Amoxicilina 250mg/5mL** (10kg) → "2.5 mL de 12/12 horas"
2. **Azitromicina 200mg/5mL** (15kg) → Verificar cálculo
3. **Cefalexina 250mg/5mL** (12kg) → Verificar cálculo

### Analgésicos (TSX):
1. **Paracetamol 100mg/mL** (10kg) → "1.5 mL de 6/6 horas"
2. **Dipirona Gotas** (10kg) → Verificar gotas
3. **Ibuprofeno 50mg/mL** (15kg) → Verificar cálculo

### Gastrointestinal (TSX):
1. **Ondansetrona Xarope** (10kg) → Verificar cálculo

### JSON (Fallback):
1. **PCR** → Qualquer medicamento (deve usar JSON normalmente)

---

**Se todos os checkboxes acima estiverem ✅, o sistema está funcionando!**

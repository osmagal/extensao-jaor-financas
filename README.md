# **Extensão Chrome: JAOR Finanças - Gestão de Demonstrativos**

## **Visão Geral**

A extensão **JAOR Finanças** foi desenvolvida para facilitar a consulta e impressão de demonstrativos financeiros diretamente no navegador. Ela se conecta a um backend no Google Apps Script para buscar dados atualizados e formatados em HTML.

---

## **Funcionalidades Principais**

1. **Consulta Automatizada:** Ao clicar no botão de consulta, a extensão busca os dados financeiros mais recentes.
2. **Interface Amigável:** Resultados exibidos de forma clara e organizada.
3. **Impressão Rápida:** Botão flutuante dedicado para abrir a janela de impressão com o conteúdo visualizado.

---

## **Como Funciona (Lógica Técnica)**

### **1. Requisição de Dados**
A extensão utiliza `fetch` para realizar uma chamada `GET` ao endpoint do Apps Script:

```javascript
async function getResponseFromAPI() {
    try {
        const response = await fetch("SEU_URL_APPS_SCRIPT_AQUI", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.text();
        return data; // Retorna o HTML do demonstrativo
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        return "Erro ao processar a solicitação";
    }
}
```

### **2. Impressão do Demonstrativo**
Um botão flutuante permite que o usuário imprima o resultado obtido sem sair da página:

```javascript
button.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(bodyPrint);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
});
```

---

## **Configuração**

- **Manifest V3:** Utiliza a versão mais recente do framework de extensões do Chrome.
- **Permissões:** Necessário acesso a permissões de rede para o endpoint configurado.

### **Configuração do Endpoint do Backend**

No arquivo `popup.js`, substitua o placeholder da URL pelo endpoint de implantação do seu Google Apps Script (Web App):

```javascript
const response = await fetch("https://script.google.com/macros/s/SEU_APPS_SCRIPT_ID_AQUI/exec", { ... });
```

---

---

## **Conclusão**

O **JAOR Finanças** demonstra como integrar sistemas de gestão (como Google Sheets via Apps Script) diretamente no navegador, otimizando o fluxo de trabalho de contabilidade e finanças.

// Botão para seleção do arquivo PDF.
document.getElementById("select-pdf").addEventListener("click", async () => {
    // Abre o seletor de arquivos.

    document.querySelector("#loading").style.display = "flex";
    document.querySelector("#output").style.display = "none";

    //Obtem retorno da IA
    const resp = await getResponseFromAPI();

    // Exibe a resposta na tela.
    const output = document.getElementById("output");

    output.style.border = "1px solid #ddd";
    //Atribui retorno ao elemento <p>
    output.innerHTML = await resp;
    document.querySelector("#loading").style.display = "none";
    document.querySelector("#output").style.display = "flex";

});

let bodyPrint = "";
async function getResponseFromAPI() {
    try {
        // Faz a requisição ao Web App do Google Apps Script (substitua pelo seu endpoint)
        const response = await fetch("https://script.google.com/macros/s/SEU_APPS_SCRIPT_ID_AQUI/exec", {
            method: "GET", // Método POST para enviar dados.
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Converte a resposta para JSON.
        const data = await response.text();
        bodyPrint = data;

        // Exibe o resultado no console.
        console.log("Resposta da API:", data);

        // Retorna o JSON no formato desejado.
        return data;

    } catch (error) {
        console.error("Erro ao obter resposta do servidor: ", error);
        return "Erro ao processar a solicitação";
    }
}


const button = document.querySelector(".float-button");
// Adicionando o evento de clique
button.addEventListener('click', () => {

    // Cria uma nova janela para impressão
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(bodyPrint);
        printWindow.document.close();

        // Imprime a janela
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    } else {
        alert('Erro ao abrir a janela de impressão. Verifique as configurações do seu navegador.');
    }
});
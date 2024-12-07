// Arquivo: converter.js

// Adiciona um evento de submissão ao formulário
document.getElementById("converterForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Obtém os valores dos campos
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);
  
    // Verifica se o valor é válido
    if (isNaN(amount) || amount <= 0) {
      document.getElementById("result").innerText = "Por favor, insira um valor válido.";
      return;
    }
  
    // URL da API de câmbio
    const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}`;
  
    // Faz uma requisição à API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter taxas de câmbio.");
        }
        return response.json();
      })
      .then((data) => {
        // Verifica se a moeda de destino está disponível
        if (!data.rates[toCurrency]) {
          throw new Error("Conversão para a moeda selecionada não é suportada.");
        }
  
        // Calcula o valor convertido
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
  
        // Exibe o resultado
        document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      })
      .catch((error) => {
        document.getElementById("result").innerText = `Erro: ${error.message}`;
      });
  });
  
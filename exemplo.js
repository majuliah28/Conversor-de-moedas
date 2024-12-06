document.getElementById("converterForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário
  
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);
  
    if (isNaN(amount) || amount <= 0) {
      document.getElementById("result").innerText = "Por favor, insira um valor válido!";
      return;
    }
  
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      if (!response.ok) throw new Error("Erro ao buscar taxas de câmbio.");
  
      const data = await response.json();
      const rate = data.rates[toCurrency];
  
      if (!rate) {
        document.getElementById("result").innerText = "Conversão não disponível para a moeda selecionada.";
        return;
      }
  
      const convertedValue = (amount * rate).toFixed(2);
      document.getElementById("result").innerText = `Resultado: ${amount} ${fromCurrency} = ${convertedValue} ${toCurrency}`;
    } catch (error) {
      document.getElementById("result").innerText = "Erro ao realizar a conversão. Tente novamente.";
      console.error(error);
    }
  });
  



// Função para exibir os dados CSV em um elemento HTML
function displayCSV(data, id) {
    const csvDiv = document.getElementById(id); // Obtém o elemento HTML pelo ID fornecido
    csvDiv.innerHTML = data; // Define o conteúdo HTML do elemento como os dados CSV recebidos
}

// As funções assíncronas são processadas de forma muito parecida, portanto é necessário comentar apenas uma função.
// Função assíncrona para buscar os dados da questão 1
async function buscarQ1() {
    try {
      const medalhaQ1 = document.getElementById("medalhaQ1"); // Obtém o elemento de entrada para a medalha da questão 1
      const paisQ1 = document.getElementById("paisQ1"); // Obtém o elemento de entrada para o país da questão 1
      console.log(medalhaQ1.value, paisQ1.value); // Exibe os valores dos campos de entrada no console
      const response = await fetch(`/buscar?questao=1&args=${[medalhaQ1.value, paisQ1.value]}`); // Faz uma solicitação assíncrona ao servidor para buscar dados da questão 1 com os argumentos fornecidos
      if (!response.ok) {
        throw new Error('Failed to fetch response data'); // Lança um erro se a resposta não for bem-sucedida
      }
      const data = await response.json(); // Converte a resposta para JSON
      displayCSV(data.data, 'resposta1'); // Exibe os dados recebidos na página HTML
    } catch (error) {
      console.error('Error:', error.message); // Exibe qualquer erro ocorrido no console
    }
}

// Função assíncrona para buscar os dados da questão 2
async function buscarQ2() {
    try {
      const paisQ2 = document.getElementById("paisQ2");
      console.log( paisQ2.value)
      const response = await fetch(`/buscar?questao=2&args=${[paisQ2.value]}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta2');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

// Função assíncrona para buscar os dados da questão 3
async function buscarQ3() {
    try {
      const anoQ3 = document.getElementById("anoQ3");
      console.log( anoQ3.value)
      const response = await fetch(`/buscar?questao=3&args=${[anoQ3.value]}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta3');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

// Função assíncrona para buscar os dados da questão 4
async function buscarQ4() {
    try {
      const idadeQ4 = document.getElementById("idadeQ4");
      console.log( idadeQ4.value)
      const response = await fetch(`/buscar?questao=4&args=${idadeQ4.value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta4');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

// Função assíncrona para buscar os dados da questão 5
async function buscarQ5() {
    try {
      const sexoQ5 = document.getElementById("sexoQ5");
      console.log( sexoQ5.value)
      const response = await fetch(`/buscar?questao=5&args=${sexoQ5.value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta5');
    } catch (error) {
      console.error('Error:', error.message);
    }
}
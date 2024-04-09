

// Função para exibir os dados CSV em um elemento HTML
function displayCSV(data, id) {
  const csvDiv = document.getElementById(id); // Obtém o elemento HTML pelo ID fornecido
  csvDiv.innerHTML = data; // Define o conteúdo HTML do elemento como os dados CSV recebidos
}

// As funções assíncronas são processadas de forma muito parecida, portanto é necessário comentar apenas uma função.
// Função assíncrona para buscar os dados da questão 1
async function buscarQ1(showAlert=true) {
  try {
    const medalhaQ1 = document.getElementById("medalhaQ1"); // Obtém o elemento de entrada para a medalha da questão 1
    const paisQ1 = document.getElementById("paisQ1"); // Obtém o elemento de entrada para o país da questão 1
    if (medalhaQ1.value === '' || paisQ1.value === '') {
      showAlert && alert('Por favor selecione a medalha e o país')
    }
    else {
      const response = await fetch(`/buscar?questao=1&args=${[medalhaQ1.value, paisQ1.value]}`); // Faz uma solicitação assíncrona ao servidor para buscar dados da questão 1 com os argumentos fornecidos
      if (!response.ok) {
        alert(response?.message || 'Failed to fetch response data'); // Lança um erro se a resposta não for bem-sucedida
      }
      const data = await response.json(); // Converte a resposta para JSON
      displayCSV(data.data, 'resposta1'); // Exibe os dados recebidos na página HTML
    }
  } catch (error) {
    console.error('Error:', error.message); // Exibe qualquer erro ocorrido no console
  }

}

// Função assíncrona para buscar os dados da questão 2
async function buscarQ2(showAlert=true) {
  try {
    const paisQ2 = document.getElementById("paisQ2");
    if ( paisQ2.value === '') {
     showAlert && alert('Por favor selecione o país')
    }
    else {
    const response = await fetch(`/buscar?questao=2&args=${[paisQ2.value]}`);
    if (!response.ok) {
      alert(response?.message || 'Failed to fetch response data');
    }
    const data = await response.json();
    displayCSV(data.data, 'resposta2');
  }} catch (error) {
    console.error('Error:', error.message);
  }
}

// Função assíncrona para buscar os dados da questão 3
async function buscarQ3(showAlert=true) {
  try {
    const anoQ3 = document.getElementById("anoQ3");
   if ( anoQ3.value === '') {
     showAlert && alert('Por favor selecione o ano')
    }
    else {
    const response = await fetch(`/buscar?questao=3&args=${[anoQ3.value]}`);
    if (!response.ok) {
      alert(response?.message || 'Failed to fetch response data');
    }
    const data = await response.json();
    displayCSV(data.data, 'resposta3');
  }} catch (error) {
    console.error('Error:', error.message);
  }
}

// Função assíncrona para buscar os dados da questão 4
async function buscarQ4(showAlert=true) {
  try {
    const idadeQ4 = document.getElementById("idadeQ4");
    if ( idadeQ4.value === '') {
     showAlert && alert('Por favor selecione a idade')
    }
    else {
    const response = await fetch(`/buscar?questao=4&args=${idadeQ4.value}`);
    if (!response.ok) {
      alert(response?.message || 'Failed to fetch response data');
    }
    const data = await response.json();
    displayCSV(data.data, 'resposta4');
  }} catch (error) {
    console.error('Error:', error.message);
  }
}

// Função assíncrona para buscar os dados da questão 5
async function buscarQ5( showAlert=true) {
  try {
    const sexoQ5 = document.getElementById("sexoQ5");
    if ( sexoQ5.value === '') {
     showAlert && alert('Por favor selecione o sexo')
    }
    else {
    const response = await fetch(`/buscar?questao=5&args=${sexoQ5.value}`);
    if (!response.ok) {
      alert(response?.message || 'Failed to fetch response data');
    }
    const data = await response.json();
    displayCSV(data.data, 'resposta5');
  } }catch (error) {
    console.error('Error:', error.message);
  }
}
// Função para buscar todos os dados das funcoes
const buscarTodas = () => {
  try {
    buscarQ1(false);
    buscarQ2(false);
    buscarQ3(false);
    buscarQ4(false);
    buscarQ5(false);

  } catch (error) {
    console.error('Error:', error.message);
  }
}


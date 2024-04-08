/*document.getElementById('buscar-q1')?.addEventListener('click', () => {
    buscar('1', ['Gold', 'London'])
}
);
document.getElementById('buscar-q2')?.addEventListener('click', buscarQ2);
document.getElementById('buscar-q3')?.addEventListener('click', buscarQ3);
document.getElementById('buscar-q4')?.addEventListener('click', buscarQ4);
document.getElementById('buscar-q5')?.addEventListener('click', buscarQ5);*/

function displayCSV(data, id) {
    const csvDiv = document.getElementById(id);
    csvDiv.innerHTML = data;
    // Exercício: O método forEach é impuro, logo não é muito funcional.
    // Substitua-o por um método puro que dê no mesmo resultado.
}

async function buscarQ1() {
    try {
      const medalhaQ1 = document.getElementById("medalhaQ1");
      const paisQ1 = document.getElementById("paisQ1");
      console.log(medalhaQ1.value, paisQ1.value)
      const response = await fetch(`/buscar?questao=1&args=${[medalhaQ1.value, paisQ1.value]}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta1');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

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
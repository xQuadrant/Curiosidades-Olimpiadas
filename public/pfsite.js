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

async function buscarQ1(args) {
    try {
      const response = await fetch(`/buscar?questao=1&args=${args}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta1');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

async function buscarQ2(args) {
    try {
      const response = await fetch(`/buscar?questao=2&args=${args}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta2');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

async function buscarQ3(args) {
    try {
      const response = await fetch(`/buscar?questao=3&args=${args}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta3');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

async function buscarQ4(args) {
    try {
      const response = await fetch(`/buscar?questao=4&args=${args}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta4');
    } catch (error) {
      console.error('Error:', error.message);
    }
}

async function buscarQ5(args) {
    try {
      const response = await fetch(`/buscar?questao=5&args=${args}`);
      if (!response.ok) {
        throw new Error('Failed to fetch response data');
      }
      const data = await response.json();
      displayCSV(data.data, 'resposta5');
    } catch (error) {
      console.error('Error:', error.message);
    }
}
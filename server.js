
// Importando as bibliotecas necessárias
import express from 'express'; // Importa o framework Express
import path from 'path'; // Importa o módulo 'path' para lidar com caminhos de arquivos
import fs from 'fs'; 
import csv from 'csv-parser';
import {fileURLToPath} from 'url'; // Importa a função 'fileURLToPath' para converter URLs de arquivo em caminhos de arquivo

// Definindo as variáveis __filename e __dirname
const __filename = fileURLToPath(import.meta.url); // Obtém o caminho do arquivo atual
const __dirname = path.dirname(__filename); // Obtém o diretório do arquivo atual
console.log(__filename); // Exibe o caminho do arquivo atual no console
console.log(__dirname); // Exibe o diretório do arquivo atual no console

// Criando uma instância do aplicativo Express
const app = express();

// Configurando o aplicativo Express para servir arquivos estáticos a partir do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurando o mecanismo de visualização do aplicativo Express como 'ejs'
app.set('view engine', 'ejs');

// Rota para lidar com requisições na raiz do servidor
app.get('/', (req, res) => {
  // Lendo o conteúdo do arquivo 'index.html'
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Se ocorrer um erro ao ler o arquivo, envia uma resposta de erro interno do servidor
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
    } else {
      // Se o arquivo for lido com sucesso, envia seu conteúdo como resposta
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
});

// Definindo a porta na qual o servidor irá escutar as conexões
const port = 3000;

// Iniciando o servidor Express e ouvindo na porta especificada
app.listen(port, () => {
  console.log(`Rodando localmente com sucesso na porta  ${port}`); // Exibe uma mensagem indicando que o servidor está rodando com sucesso
});


app.get('/buscar', (req, res) => {
    const lerCSV = (caminhoArquivo, callback, args, acumulador, resposta) => {
        return fs.createReadStream(caminhoArquivo)  // Cria um stream de leitura do arquivo
            .pipe(csv()) // Pipe para o parser CSV
            .on('data', (linha) => { // Evento 'data' é acionado quando uma linha é lida
                if (callback(linha, ...args)) { // Verifica se a linha atende ao filtro fornecido
                    acumulador = [...acumulador, linha] // Adiciona a linha ao acumulador se atender ao filtro
                }
            })
            .on('end', () => { // Evento 'end' é acionado quando o arquivo é completamente lido
                console.log('Fim do arquivo CSV.'); // Indica o fim do arquivo
                // Imprime o resultado
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    data: resposta(acumulador)
                }));
            })
            .on('error', (error) => { // Evento 'error' é acionado se ocorrer um erro durante a leitura
                console.error('Erro ao ler o arquivo CSV:', error); // Exibe o erro no console
            });
    };

    // Funções de filtro para diferentes questões.
    // Essas funções são os filtros para as diferentes questões. Cada função recebe uma linha do CSV e os argumentos necessários para o filtro, e retorna true se a linha atender ao critério do filtro e false caso contrário.
    // O filtro "linha?.Season" é o mais importante nesta fase do processamento, visto que ele limita todos os resultados ás olimpíadas de inverno, garantindo que nenhum filtro se desvie do propósito do site.
    const filtroQuestao1 = (linha, medalha, pais) => {
        return linha?.Season === 'Winter' && linha.Medal === medalha && linha?.Team === pais // Filtro de estação, país e medalha. O operador "?" após "linha" verifica se o valor é nulo ou indefinido antes de ser acessado.
    }
    const filtroQuestao2 = (linha, pais) => {
        return linha?.Season === 'Winter' && linha?.Team === pais // Filtro de estação e país.
    }
    const filtroQuestao3 = (linha, ano) => {
        return linha?.Season === 'Winter' && linha?.Year === ano // Filtro de estação e ano.
    }
    const filtroQuestao4 = (linha, idade) => {
        return linha?.Season === 'Winter' && linha.Age  === idade // Filtro de estação e país.
    }
    const filtroQuestao5 = (linha, sexo) => {
        return linha?.Season === 'Winter' && linha?.Sex === sexo // Filtro de estação e sexo.
    }

    // As funções buscarQ1, buscarQ2, etc., chamam a função lerCSV com os filtros apropriados e retornam os resultados de acordo com a questão específica. Cada uma delas recebe os parâmetros necessários para aplicar o filtro específico.
    // Estas funções tem o funcionamento igual e argumentos praticamente idênticos, por tanto não é necessário a explicação de todas elas, apenas uma.
    // Retorno questão 1
    const buscarQ1 = (medalha, pais) => lerCSV( // A função recebe dois parâmetros, medalha e país e chama a função "lerCSV".
        'athlete_events.csv', // Caminho do arquivo.
        filtroQuestao1, // Função de filtro.
        [medalha, pais], // Argumentos do filtro
        [], // Lista vazia, para acúmulo de resultados.
        results => results.length // Comprimento da lista de resultados.
        );

    // Retorno questão 2
    const buscarQ2 = (pais) => lerCSV(
        'athlete_events.csv',
        filtroQuestao2,
        [pais],
        [],
        results => results.length
        );

    // Retorno questão 3
    const buscarQ3 = (ano) => lerCSV(
        'athlete_events.csv',
        filtroQuestao3,
        [ano],
        [],
        results => results[0].City // Este é o único diferencial entre as funções. Esta linha em específico retorna APENAS a primeira cidade a ser encontrada no processamento.
        );
    // Retorno questão 4
    const buscarQ4 = (idade) => lerCSV(// A função recebe um parâmetro,idade e chama a função "lerCSV".
        'athlete_events.csv',// Caminho do arquivo.
        filtroQuestao4,// Função de filtro.
        [idade],// Argumentos do filtro
        [],// Lista vazia, para acúmulo de resultados.
        results => results.length// Comprimento da lista de resultados.
        );

    // Retorno questão 5
    const buscarQ5 = (sexo) => lerCSV(
        'athlete_events.csv',
        filtroQuestao5,
        [sexo],
        [],
        results => results.length);

// O código abaixo está tratando diferentes casos com base no valor de 'req.query.questao'.
switch (req.query.questao){
    // Todos os valores estão atrelados a uma das questões apresentadas.
    // Caso o valor seja '1', chama a função buscarQ1 com os argumentos fornecidos na query.
    case '1':
        buscarQ1(...req.query.args.split(','))
        break;
    case '2':
        buscarQ2(...req.query.args.split(','))
        break;
    case '3':
        buscarQ3(...req.query.args.split(','))
        break;
    case '4':
        buscarQ4(...req.query.args.split(','))
        break;
    case '5':
        buscarQ5(...req.query.args.split(','))
        break;
    // Se o valor não corresponder a nenhum dos casos anteriores, imprime uma mensagem de erro.
    default:
        console.log(`Desculpe, questão não encontrada`);
}})

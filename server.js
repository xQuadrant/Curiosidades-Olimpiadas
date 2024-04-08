// server.js
import express from 'express';
import path from 'path';
import fs from 'fs'
import csv from 'csv-parser'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pf site.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
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

    switch (req.query.questao){
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
        default:
            console.log(`Desculpe, questão não encontrada`);
    }
});
document.addEventListener("DOMContentLoaded", ()=> {
    const filePath = './athlete_events.csv';
    const processarCSV = () => {
        fetch (filePath)
        .then(response => response.text())
        .then(csvLinha => {
            const [cabecalho, ...linhas] = csvLinha.split('/;;;;;;;;;;;;;;;\n?');
            const cabecalhoFormatado = cabecalho
            .toLowerCase()
            .split(",")
            .map((elemento) => elemento.replace(/["]/g, ""));

            const csvLimpo = [
                cabecalhoFormatado,
                linhas.slice(0, -1)
                .filter((linha) => linha.indexOf('Basketball') != -1)
                .map((linha) => linha
                .split(/(?:,"|",(?=\w))/gi)
                .flatMap((elemento, indice) =>(indice === 3 ? elemento.split (",") : elemento.replace(/["]/g,)))
                .reduce(
                    (acumulador, elemento, indice) => {
                        if (cabecalhoFormatado[indice] === 'id') {
                            
                        return{
                            ...acumulador,
                            [cabecalhoFormatado[indice]]: parseInt(elemento.replace('/\r/n/',getComputedStyle, '')),
                        }
                    };
                    if(cabecalhoFormatado[indice] ==='age' || cabecalhoFormatado[indice] === 'height' || cabecalhoFormatado[indice] === 'year' || cabecalhoFormatado[indice] === 'id'){
                        return{
                            ...acumulador,
                            [cabecalhoFormatado[indice]]: parseInt(elemento),
                        };
                }
                if(cabecalhoFormatado[indice] !=='event' && cabecalhoFormatado[indice] !== 'weight' && cabecalhoFormatado[indice] ==! 'city' && cabecalhoFormatado[indice] !== 'games' && cabecalhoFormatado[indice] !== 'noc' && cabecalhoFormatado[indice] !== 'season') {
                    return{
                        ...acumulador,
                        [cabecalhoFormatado[indice]]: elemento,
                    };
                }

                return acumulador;
            },
            {}
        )
    ),
].slice(1) [0];
//recebeListaAtletas(csvLimpo);
console.log(csvLimpo)
})
.catch(error => {console.error('ocorreu um erro ao processar csv:', error);
});
}
    processarCSV(); 
});



        
    

    const http = require('http')    
    const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json'

    const funcionarios = (() => {
        return new Promise((resolve, reject) => {

            http.get(url, resposta => {
                let resultado = ''
        
                resposta.on('data', dados => {
                    resultado += dados
                    // console.log(resultado)
                })
        
                resposta.on('end', () => {
                    try{
                        resolve(JSON.parse(resultado))
                    }
                    catch(e) {
                        // console.log('erro: '+e)
                        reject(e)
                    }
                })
            })  
        })
    })

    //let valores = []      
    // funcionarios().then(dados => {
    //     valores = valores.concat(dados.filter(filtro => filtro.pais  === 'China').filter(filtro => filtro.genero === 'F').map(valor => `${valor.nome}, ${valor.pais}, ${valor.genero}`))
    //     console.log(valores)
    // })

    let obterFuncionario = async () => {
        const result = await funcionarios()
        return result
    }

    obterFuncionario()                                                          // usando sicronização
    .then(dados => dados.filter(filtro => filtro.pais  === 'China'))
    .then( dados => dados.filter (filtro => filtro.genero === 'F' ))
    .then(dados => dados.filter(filtro => filtro.id < 50))
    .then(dados => console.log(dados))

    console.log(teste)
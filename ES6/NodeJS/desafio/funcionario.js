// Let´s go
const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json'
const axios = require('axios')


axios.get(url).then(response => {
   const funcionarios = response.data
    const filtro1 = filtro => filtro.pais  === 'China'
    const filtro2 = filtro => filtro.genero === 'F'
    const filtro3 = (proximo, atual) => atual.salario < proximo.salario ? proximo : atual

   let resultado  = funcionarios.filter(filtro1).filter(filtro2).reduce(filtro3)

   console.log(resultado)
})

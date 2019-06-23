
const importarA = require('./moduloA')
const importarB = require('./moduloB')

// console.log(importarB)           UM POUCO SOBRE IMPORTAÇÃO DE MODULOS, NO NODEJS/ E A INSTALAÇÃO DO nodemon, npm i -g nodemon (ele executa automaticamente o seu script, passando no terminal .. nodemon arquivo.js)
                                                    
const objetoImportado = importarB.carro

// console.log(objetoImportado)
                                                    
objetoImportado.vendeu = true

console.log(objetoImportado.vender())
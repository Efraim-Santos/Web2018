
module.exports = {          //Sistema de exportar com nodejs
    nome: 'efraim',
    idade(){
        return '25'
    }
}

module.exports.carro = {
    marca: 'Volkswagem',
    tipo: 'turbo',
    valor: 50.000,
    vendeu: false,
    vender() {
        if(this.vendeu){
            return 'vendeu'
        } else{
            return 'a venda'
        }
    }
}
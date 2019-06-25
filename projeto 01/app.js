class Despesas {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;   
        this.mes = mes;   
        this.dia = dia;   
        this.tipo = tipo;   
        this.descricao = descricao;   
        this.valor = valor;   
    }

    validar(){
        for(let i in this){
            if(this[i] === '' || this[i] === null || this[i] === undefined){
                return false
            } 
        }
        return true
    }
}

class Db {
    constructor(){
        let id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id', 0);
        }
    }
    getId(){
        return(localStorage.getItem('id'));
    }
    saveDb(despesas){
        let id = parseInt(this.getId())+1;
        localStorage.setItem('id', id);
        localStorage.setItem(id, JSON.stringify(despesas));
    }
    recuperarTodosRegistros() {
        let aux_id = localStorage.getItem('id');
        let registros = Array(); 
        
        for (let i=1; i <= aux_id; i++) { 
            
            let despesas = localStorage.getItem(i);
            
            if(despesas == null){
                continue;
            }
            
            registros[i] = (JSON.parse(despesas));
            registros[i].id = i;
        }
        return registros;
    }
    somaDespesas(){
        let registros = this.recuperarTodosRegistros();
        let total_despesas = 0;

        registros.forEach( x => {
            total_despesas += parseFloat(x.valor);
        });
        return total_despesas;
    }
    pesquisarDespesa(consultar_despesa){
        let registros = this.recuperarTodosRegistros();
        let resultado = Array();
        if(consultar_despesa.ano != ''){
            resultado = registros.filter( x => consultar_despesa.ano == x.ano);
        }
        if(consultar_despesa.mes != ''){
            resultado = registros.filter( x => consultar_despesa.mes == x.mes);
        }
        if(consultar_despesa.dia != ''){
            resultado = registros.filter( x => consultar_despesa.dia == x.dia);
        }
        if(consultar_despesa.tipo != ''){
            resultado = registros.filter( x => consultar_despesa.tipo == x.tipo);
        }
        if(consultar_despesa.descricao != ''){
            resultado = registros.filter( x => consultar_despesa.descricao == x.descricao);
        }
        if(consultar_despesa.valor != ''){
            resultado = registros.filter( x => consultar_despesa.valor == x.valor);
        }
        return resultado;
    }
}

function tratarDados(){

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let new_despesa = new Despesas(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
    let teste_db = new Db();

    if(new_despesa.validar() === true){
        teste_db.saveDb(new_despesa)
        
        $('#modalRegistraDespesa').modal('show');

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        
    }else{
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        //dialog de erro
        $('#modalRegistraDespesa').modal('show') 
    }
}

function carregaListaDespesas(consulta = null) {

    let despesas = Array()
    let banco = new Db();

    if(consulta != null){
        despesas = consulta;
    }else{
        despesas = banco.recuperarTodosRegistros();   
    }

    let table_despesas = document.getElementById('table_despesas');
    table_despesas.innerHTML = '';

    despesas.forEach( x => {

        let linha = table_despesas.insertRow();
        let aux_tipo = "";
        let tipo = parseInt(x.tipo);

        switch(tipo){
            case 1: aux_tipo = "Alimentação"; break
            case 2: aux_tipo = "Educação"; break
            case 3: aux_tipo = "Lazer"; break
            case 4: aux_tipo = "Saúde"; break
            case 5: aux_tipo = "Transporte"; break
        }

        let button = document.createElement('button');
        button.id = 'despesa_'+ x.id;
        button.className = 'btn btn-danger';
        button.innerHTML = '<i class="fas fa-times"></i>';
        button.onclick = () => {
            let aux_id = button.id;
            aux_id = aux_id.replace('despesa_', '');
            localStorage.removeItem(aux_id);
            window.location.reload();
        };

        linha.insertCell(0).innerHTML= `${x.dia}/${x.mes}/${x.ano}`;
        linha.insertCell(1).innerHTML= aux_tipo;
        linha.insertCell(2).innerHTML= x.descricao;
        linha.insertCell(3).innerHTML= x.valor;
        linha.insertCell(4).append(button);
    });

    let linha = table_despesas.insertRow();
    linha.className = 'bg-light'

    linha.insertCell(0).innerHTML = 'Total das Despesas: '
    linha.insertCell(1).innerHTML = ''
    linha.insertCell(2).innerHTML = ''
    linha.insertCell(3).innerHTML = `R$ ${banco.somaDespesas()}`;
    linha.insertCell(4).innerHTML = ''
}

function consultarDespesas (){
       
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let consultar_despesa = new Despesas(ano, mes, dia, tipo, descricao, valor);
    let consultar_banco= new Db();
    let resultado_da_consulta =  consultar_banco.pesquisarDespesa(consultar_despesa);
    carregaListaDespesas(resultado_da_consulta);
}
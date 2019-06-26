
var largura = window.innerWidth;
var altura = window.innerHeight;
var aux = 20;
var tempo = 30;
var cont_tiro = 1; 
var velocidade_game = 0;
var alternarImagem = 'url(imgs/ghost-1.png) no-repeat center center';

var url = window.location.search;
url = url.replace('?opcao=', '');

if(url == "normal"){
    velocidade_game = 1500;
    if(largura < 728){
        velocidade_game = 1200;
    }
} 
if(url == "dificil"){
    velocidade_game = 1000;
    if(largura < 728){
        velocidade_game = 800;
    }
}   

function gamePlay(){
    var page = document.body.style;
    page.position = 'relative';
    page.width = largura +'px';
    page.height = altura +'px';
    page.padding = '0';
    page.margin = '0';
    page.background = "url('imgs/imagem-6.jpg') no-repeat bottom center";
    page.backgroundSize = 'cover';
    
    sniper();
}

function randomica(){
    if(largura < 728){
        posicaoLargura = Math.floor(Math.random() * (largura - 110));
        posicaoAltura = Math.floor(Math.random() * (altura - 200));
    }else{
        posicaoLargura = Math.floor(Math.random() * (largura - 110));
        posicaoAltura = Math.floor(Math.random() * (altura - 140));
    }
    posicaoAltura = posicaoAltura < 0 ? 0 : posicaoAltura;
    posicaoLargura = posicaoLargura < 0 ? 0 : posicaoLargura;
}

var game = setInterval( 
    function (){

        if(document.getElementById('div-imagem')){
            document.getElementById('div-imagem').remove();
        }

        randomica();

        var divImagem = document.createElement('div');
        document.body.appendChild(divImagem);
        divImagem.id = 'div-imagem';
        divImagem.style.position = 'absolute';
        divImagem.style.display = 'inline-block';

        if(largura < 728){
            var tamanhoImagem = Math.floor((Math.random() * 25) + 45);
        }else{
            var tamanhoImagem = Math.floor((Math.random() * 75) + 40);
        }
        divImagem.style.width = tamanhoImagem+'px';
        divImagem.style.height = tamanhoImagem+'px';
        divImagem.style.background = alternarImagem;
        divImagem.style.backgroundSize = 'contain';
        
        if(aux === 20){
            aux = -20;
        }else{
            aux = 20;
        }

        divImagem.style.transform = 'rotate('+aux+'deg)';
        divImagem.style.left = posicaoLargura +'px';
        divImagem.style.top = posicaoAltura +'px';

        document.getElementById('div-imagem').onclick = tiro;
    }, velocidade_game);

    function tiro(){
        if(!(document.getElementById('tiro'))){
            var splash = document.createElement('img');
            document.getElementById('div-imagem').appendChild(splash);
            splash.src = 'imgs/splatter.png';
            splash.width = '52';
            splash.style.marginTop = '10%';
            splash.style.marginLeft = '20%';
            splash.id = 'tiro';

            if(cont_tiro <= 18){
                var aux_id = 'fantasmas-' + cont_tiro; 
                document.getElementById(aux_id).style.background = 'url(imgs/ghost-m.png) no-repeat center center'
                document.getElementById(aux_id).style.backgroundSize = 'contain';
                cont_tiro++;
            }
        }
    } 

    function sniper(){
        for(var i=1; i <= 18; i++){
            var fantasmas = document.createElement("span");
            document.getElementById('fantasmas').appendChild(fantasmas);
            fantasmas.id = 'fantasmas-'+i;
        }
    }

    var apagao = setInterval(
        function (){
            document.getElementById('div-imagem').style.opacity = '0.3' ;
    }, 2000);
    
    var cronometro = setInterval(
        function(){
        document.getElementById('cronometro').innerHTML = tempo;
        tempo--;
        if(tempo < 15){
            alternarImagem = 'url(imgs/ghost-2.png) no-repeat center center';
            document.getElementById('cronometro').style.color = 'red';
        }
        if(tempo < 0){
            clearInterval(cronometro);
            clearInterval(game);
            document.getElementById('div-imagem').style.background = 'none';

            if(cont_tiro >= 18){
                window.location.href ='vitoria.html';
            }else{
                window.location.href ='game-over.html';
            }
        }
    }, 1000);

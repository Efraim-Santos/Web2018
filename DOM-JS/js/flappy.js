
class CriandoJogo{

    constructor(){
        this.cont = -240
        this.valorProgresso = 0
    }

    criandoBarreiras(){
        const row = document.createElement('div')
        row.classList.add('row')
        // row.setAttribute('id', this.contagem)
        row.style.left = `${this.contagem}px`
        row.appendChild(this.barreiraSuperior)
        row.appendChild(this.barreiraInferior)
        const flappy = document.querySelector('[wm-flappy]')
        flappy.appendChild(row) 
        return row
    }   
    alturaBarreira(row){
        const barreiraSuperior = row.firstChild
        const barreiraInferior = row.lastChild
        const valorHeight = () => Math.floor(Math.random() * 375) +25 
        const salvandoAltura = valorHeight()
        barreiraSuperior.style.height = `${salvandoAltura}px`
        barreiraInferior.style.height = `${450 - salvandoAltura}px`
    }
    get barreiraInferior(){
        const barreiraInfe = document.createElement('div')
        barreiraInfe.classList.add('barreira-inferior')
        const getCabeca = this.criandoCabecaBarreira
        getCabeca.style.top = '-1px'
        barreiraInfe.appendChild(getCabeca)
        return barreiraInfe
    }
    get barreiraSuperior(){
        const barreiraSuper = document.createElement('div')
        barreiraSuper.classList.add('barreira-superior')
        const getCabeca = this.criandoCabecaBarreira
        getCabeca.style.top = '100%'
        barreiraSuper.appendChild(getCabeca)
        return barreiraSuper
    }
    get criandoCabecaBarreira(){
        const cabecaBarreira = document.createElement('div')
        cabecaBarreira.classList.add('cabeca-barreira')
        return cabecaBarreira
    }
    get contagem(){
        this.cont += 320;
        return this.cont
    }
    get passaro(){
        if(!document.querySelector('img')){
            const passaro = document.createElement('img')
            passaro.src = '../imgs/passaro.png'
            passaro.classList.add('passaro')
            passaro.style.bottom = '50%'
            const containerDoJogo = document.querySelector('[wm-flappy]')
            containerDoJogo.appendChild(passaro)
        return passaro
        }else{
            return document.querySelector('img.passaro')
        }
    }
    get alterarProgresso(){
        const progresso = document.querySelector('span.progresso')
        progresso.innerHTML = `${this.valorProgresso}`
        this.valorProgresso++
    }
    progresso(){
        const progresso = document.createElement('span')
        progresso.classList.add('progresso')
        const containerDoJogo = document.querySelector('[wm-flappy]')
        containerDoJogo.appendChild(progresso)
    }
    movimentoDoPassaro(stop = false){
        const voar = this.passaro
        let altura = parseInt(voar.style.bottom.replace('%', '')) 
        const movimento = setInterval( () => {
            if(!(altura < 0)){
                altura -= 1.5
                voar.style.bottom = `${altura}%`
            }
        },80)
        const corpo = document.querySelector('body')
        corpo.onkeypress = () => {
            if(altura < 90 && !stop){
                altura+=5
                voar.style.bottom = `${altura}%`
            }
        }
        if(stop){
            clearInterval(movimento)
        }
    }
    estaoSobrepostos(elementoA, elementoB){
        const a = elementoA.getBoundingClientRect()
        const b = elementoB.getBoundingClientRect()

        const horizontal = a.left + b.width >= b.left && b.left + b.width >= a.left
        const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top
        return horizontal && vertical
    }
    colidiu(barreiras){
        let colidiu = false
        barreiras.forEach(element => {
            if(!colidiu){
                const superior = element.firstChild
                const inferior = element.lastChild
                colidiu = this.estaoSobrepostos(this.passaro, superior) || this.estaoSobrepostos(this.passaro, inferior)
            }
        });
        return colidiu
    }
    gameOver(){
        const container = document.querySelector('div[wm-flappy]')
        const gameOver = document.createElement('p')
        const reiniciar = document.createElement('button')
        reiniciar.classList.add('reiniciar')
        gameOver.classList.add('game-over')
        gameOver.innerHTML = 'GAME OVER!'
        reiniciar.innerHTML = 'Reiniciar'
        container.appendChild(gameOver)
        container.appendChild(reiniciar)
        reiniciar.onclick = () => location.reload()
    }

    game(){
        this.progresso()
        const colunasJogo = [this.criandoBarreiras(), this.criandoBarreiras(), this.criandoBarreiras(), this.criandoBarreiras()]
        let largura = 0
        const play = setInterval(()  => {
            colunasJogo.forEach((elemento, index)=> {
                let aux = parseInt(elemento.style.left.replace('px', ''))
                if(aux < -82){
                    elemento.style.left = '1200px'
                    this.alturaBarreira(elemento)
                }else{
                    largura = parseInt(elemento.style.left.replace('px', ''))
                    elemento.style.left = `${largura -1}px`
                }
                if((index == 2 && aux == 560) || (index == 0 && aux == 560)){
                    this.alterarProgresso
                }
            }) 
            if(this.colidiu(colunasJogo)){
                clearInterval(play)
                this.movimentoDoPassaro(true)
                this.gameOver()
            } 
        }, 7);
        this.movimentoDoPassaro()
    }
}

const barreira_1 = new CriandoJogo()
barreira_1.game()
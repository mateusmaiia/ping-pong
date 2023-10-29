const canvasEl = document.querySelector("canvas"),
 canvasCtx = canvasEl.getContext("2d"),
 gapX = 10

 const mouse = {x: 0, y: 0}

 const field = {
    width: window.innerWidth,
    height: window.innerHeight,
    draw: function() {
        canvasCtx.fillStyle = "#286047" //cor
        canvasCtx.fillRect(0, 0, this.width, this.height)
    }
 }

 const line = {
    width: 15,
    height: field.height,
    draw: function() {
        canvasCtx.fillStyle = "#ffffff",
        canvasCtx.fillRect(
            field.width / 2 - this.width / 2,
            0,
            this.width,
            this.height
        )
    }
 }

 const leftPaddle = {
    x: gapX,
    y: 0,
    width: line.width,
    height: 200,
    _move: function(){
        this.y = mouse.y - this.height / 2
    },
    draw: function(){
        canvasCtx.fillStyle = "#ffffff",
        canvasCtx.fillRect(this.x, this.y, this.width, this.height)
        this._move()
    }

 }

 const rightPaddle = {
    x: field.width - line.width - gapX,
    y: 100,
    width: line.width,
    height: 200,
    speed: 5,
    _move: function(){
        if(this.y + this.height / 2 < ball.y + ball.r){
            this.y += this.speed 
        }else{
            this.y -= this.speed
        }
    },
    speedUp: function(){
        this.speed += 2
    },
    draw: function(){
        canvasCtx.fillStyle = "#ffffff",
        canvasCtx.fillRect(this.x, this.y, this.width, this.height)

        this._move()
    }
 }

 const score = {
    human: 0,
    computer: 0,
    incriseHuman: function(){
        this.human++
    },
    incriseComputer: function(){
        this.computer++
    },
    draw: function(){
        canvasCtx.font = "bold 72px Arial"
        canvasCtx.textAlign = "center"
        canvasCtx.textBaseline = "top"
        canvasCtx.fillStyle = "#01341D"
        canvasCtx.fillText(this.human, field.width / 4, 50)
        canvasCtx.fillText(this.computer, field.width / 4 + field.width / 2, 50)
    }
}

 const ball = {
    x: 0,
    y: 0,
    r: 20,
    speed: 5,
    directionX: 1,                                                                 //+1 vai pra baixo. -1 pra cima.
    directionY: 1,
    _calcPosition: function(){
        //verifica se o jogador 1 fez um ponto (x > largura do campo)
        if(this.x > field.width - this.r - rightPaddle.width - gapX){
            //verifica se a raquete direita está no ponto y da bola
            if(this.y + this.r > rightPaddle.y  && this.y - this.r < rightPaddle.y + rightPaddle.height){
                //rebate a bola invertendo o sinal de X
                this._reverseX()
            }else{
                //pontuar o jogador 1
                score.incriseHuman()
                this._pointUp()
            }
        }
        //verifica se o jogador 2 fez um ponto (x < 0)
        if( this.x < this.r + leftPaddle.width + gapX){
            //verifica se a raquete esquerda está na posição Y da bola.
            if(this.y + this.r> leftPaddle.y && this.y - this.r < leftPaddle.y + leftPaddle.height){
                 //rebate a bola invertendo o sinal de X
                 this._reverseX()   
            }else{
                //pontuar jogador 2
                score.incriseComputer()
                this._pointUp()
            }
        }

        //verifica as laterais superior e inferior.
        if(
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.height - this.r && this.directionY > 0)
          ){
            //rebate a bola invertendo o sinal do eixo Y.
            this._reverseY()
        }
    },
    _reverseX: function(){
        //1 * -1 = -1
        //-1 * -1 = 1
        this.directionX *= -1
    },
    _reverseY: function(){
        //1 * -1 = -1
        //-1 * -1 = -1
        this.directionY *= -1
    },
    _speedUp: function(){
        this.speed += 2
    },
    _pointUp: function(){
        this._speedUp()
        rightPaddle.speedUp()
        this.x = field.width / 2
        this.y = field.height / 2
    },
    _move:function(){
        this.x += this.directionX * this.speed
        this.y += this.directionY * this.speed
    } ,
    draw: function(){
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()

        this._move()
        this._calcPosition()
    }
 }

function setup(){
    // canvasEl.width = window.innerWidth
    // canvasCtx.width = window.innerWidth
    // canvasEl.height = window.innerHeight
    // canvasCtx.height = window.innerHeight

    //assim é melhor:
    canvasEl.width = canvasCtx.width = field.width
    canvasEl.height = canvasCtx.height = field.height
}
function draw(){
    //desenho campo
    field.draw()
    //desenho linha central
    line.draw()
    //desenha raquete esquerda
    leftPaddle.draw()
    //desenha raquete direita
    rightPaddle.draw()
    //desenhar o placar
    score.draw()
    //desenha a bolinha
    ball.draw()

}

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback){
            return window.setInterval(callback, 1000 / 60)
        }
    )
})()

function main(){
    animateFrame(main)
    draw()
}

setup()
main()

canvasEl.addEventListener('mousemove', function(e){
    mouse.x = e.pageX
    mouse.y = e.pageY

    console.log(mouse)
})
const canvasEl = document.querySelector("canvas"),
 canvasCtx = canvasEl.getContext("2d"),
 gapX = 10

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
    y: 100,
    width: line.width,
    height: 200,
    draw: function(){
        canvasCtx.fillStyle = "#ffffff",
        canvasCtx.fillRect(this.x, this.y, this.width, this.height)
    }
 }

 const rightPaddle = {
    x: field.width - line.width - gapX,
    y: 100,
    width: line.width,
    height: 200,
    draw: function(){
        canvasCtx.fillStyle = "#ffffff",
        canvasCtx.fillRect(this.x, this.y, this.width, this.height)
    }
 }

 const ball = {
    x: 300,
    y: 200,
    r: 20,
    draw: function(){
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()
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

    //desenha a bolinha
    ball.draw()

    //desenhar o placar
    canvasCtx.font = "bold 72px Arial"
    canvasCtx.textAlign = "center"
    canvasCtx.textBaseline = "top"
    canvasCtx.fillStyle = "#01341D"
    canvasCtx.fillText("3", window.innerWidth / 4, 50)
    canvasCtx.fillText("1", window.innerWidth / 4 + window.innerWidth / 2, 50)
}

setup()
draw()
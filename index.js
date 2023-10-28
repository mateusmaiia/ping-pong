const canvasEl = document.querySelector("canvas"),
 canvasCtx = canvasEl.getContext("2d") 

 const lineWidth = 15
 const field = {
    width: window.innerWidth,
    height: window.innerHeight,
    draw: () => {
        canvasCtx.fillStyle = "#286047" //cor
        canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight)
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

    const x = window.innerWidth / 2 - lineWidth / 2,
    y = 0,
    width = lineWidth,
    height = window.innerHeight

    //desenho linha central
    canvasCtx.fillStyle = ("#ffffff")
    canvasCtx.fillRect(x, y, width, height)

    //desenha raquete esquerda
    canvasCtx.fillRect(10, 100, lineWidth, 200)

    //desenha raquete direita
    canvasCtx.fillRect(window.innerWidth - lineWidth - 10, 200, lineWidth, 200)

    //desenha a bolinha
    canvasCtx.beginPath()
    canvasCtx.arc(200, 300, 20, 0, 2 * Math.PI, false)
    canvasCtx.fill()

    //desenhar o placar
    canvasCtx.font = "bold 72px Arial"
    canvasCtx.textAlign = "center"
    canvasCtx.textBaseline = "top"
    canvasCtx.fillStyle = "#01341D"
    canvasCtx.fillText("3", window.innerWidth / 4, 50)
    canvasCtx.fillText("1", window.innerWidth / 4 + window.innerWidth / 2, 50)


    +
}

setup()
draw()
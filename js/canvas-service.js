'use strict'

var gCanvas = document.querySelector('.meme-editor')
var gCtx = gCanvas.getContext('2d')

function renderImg() {
  var meme = getMeme()
  var memeImg = getMemeImg(meme.selectedImgId)
  var img = new Image()
  img.onload = drawAll // Draw when image has loaded
  // Load an image of intrinsic size 300x227 in CSS pixels
  img.src = memeImg.url
}

function getCtx() {
  return gCtx
}

function getCanvasWidth() {
  return gCanvas.width
}
function getCanvasHeight() {
  return gCanvas.height
}

function drawAll() {
  // Use the intrinsic size of image in CSS pixels for the canvas element
  gCanvas.width = this.naturalWidth
  gCanvas.height = this.naturalHeight

  // Will draw the image as 300x227, ignoring the custom size of 60x45
  // given in the constructor
  gCtx.drawImage(this, 0, 0)
  RenderMemeText()
}

function RenderMemeText() {
  var memeLines = getMemeLines()
  if (memeLines.length === 0) return
  memeLines.forEach((line) => {
    if (line === undefined) return
    var { size, color, align, txt, x, y, strokeColor, font } = line
    gCtx.font = `${size}px ${font}`
    gCtx.fillStyle = `${color}`
    gCtx.textAlign = `${align}`
    gCtx.fillText(txt, x, y)
    if (strokeColor) {
      gCtx.strokeStyle = strokeColor
      gCtx.lineWidth = 2
      gCtx.strokeText(txt, x, y)
    }
  })
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function getCanvas() {
  return gCanvas
}

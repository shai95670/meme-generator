'use strict'
var gKeywords = {
  happy: 16,
  funny: 16, 
  comics: 16,
  dogs: 16,
  drinks: 16,
  books: 16,
}
var gImgId = 1
var keyes = ['comics', 'funny', 'dogs', 'drinks', 'books'] 
var gImgs = createImgs()
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [],
}
var gFilter = 'all'

function getSavedMemes(){
  return savedMemes
}

function getKeywords(){
  return gKeywords
}

function setFilter(toFilter){
  if(!keyes.includes(toFilter)) {
    gFilter = 'all'
    return
  }
  gFilter = toFilter
}

function checkLinesEmpty(){
  return gMeme.lines.length === 0
}

function getFilter(){
  return gFilter
}

function getImgs(){
  var imgs = (gFilter !== 'all') ? gImgs.filter((img)=> img.keywords[0] === gFilter) : gImgs
  return imgs
}

function createImgs(){
  var imgs = []
  for (let i = 0; i < 18; i++) {
    imgs.push(createImg())
  }
  return imgs
}

function createImg(){
  var rndIdx = Math.floor(Math.random() * keyes.length)
  var img = { id: gImgId, url: `img/${gImgId}.jpg`, keywords: [keyes[rndIdx]] }
  gImgId++
  return img
}

function switchLines(diff) {
  gMeme.selectedLineIdx += diff
}

function getMemeLines() {
  return gMeme.lines
}

function deleteLine(){
  delete gMeme.lines[gMeme.selectedLineIdx]
}

function setFont(toFont){
  gMeme.lines[gMeme.selectedLineIdx].font = toFont
}

function addMemeText(txt, size, align, color) {
  var line = getSelectedLine()
  if (line) { //if current selected line
    // only edit text and return
    line.txt = txt
    return
  }
  line = createLine(txt, size, align, color)
  gMeme.lines.push(line)
}

function createLine(txt, size, align, color) {
  var line = null
  if (gMeme.selectedLineIdx === 0) {
    line = { txt, size, align, color, x: getCanvasWidth() / 2, y: 40, strokeColor: '', font: 'IMPACT' }
  } else if (gMeme.selectedLineIdx === 1) {
    line = { txt, size, align, color, x: getCanvasWidth() / 2, y: 450, strokeColor: '' , font: 'IMPACT'}
  } else {
    line = { txt, size, align, color, x:getCanvasWidth() / 2, y: 70, strokeColor: '', font: 'IMPACT'}
  }
  return line
}

function setLineAlign(alignTo){
  var line = getSelectedLine()
  line.align = alignTo
}

function setStrokeColor(val) {
  var line = getSelectedLine()
  line.strokeColor = val
}

function setMeme(imgId) {
  var meme = createMeme(imgId, [])
  gMeme = meme
}

function createMeme(imgId, lines) {
  var meme = { selectedImgId: imgId, selectedLineIdx: 0, lines }
  return meme
}

function getMeme() {
  return gMeme
}

function getMemeImg(id) {
  return gImgs.find((img) => img.id === id)
}

function changeFontSize(diff){
  var line = getSelectedLine()
  line.size += (diff * 5)
}

function moveLine(num) {
  var line = getSelectedLine()
  line.y += num
}

function getSelectedLine(){
  return gMeme.lines[gMeme.selectedLineIdx]
}

function setColor(toColor){
  var line = getSelectedLine()
  line.color = toColor
}

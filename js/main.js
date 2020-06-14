'use strict'

function showMemeEditor(imgId) {
  var filtetEl = document.querySelector('.filter-container')
  var galleryEl = document.querySelector('.gallery')
  var memeEditorEl = document.querySelector('.meme-editor-container')

  filtetEl.style.display = 'none'
  galleryEl.style.display = 'none'

  memeEditorEl.classList.remove('hide')
  setMeme(imgId)
  renderImg()
}

function onAddRow() {
  var lineOperationsEl = document.querySelector('textarea.text-input')
  addMemeText(lineOperationsEl.value, 30, '', 'red')
  clearCanvas()
  renderImg()
}

function onAddEmoji() {
  var emojiEl = document.querySelector('.emoji')
  addMemeText(emojiEl.innerText, 30, 'center', 'red')
  renderImg()
}

function onChangeSymbol(ev) {
  var emojiEl = document.querySelector('.emoji')
  var emojies = ['😀', '🤣', '🤬', '🥶', '😱', '👽', '⚰️', '💣']
  var rangeVal = ev.target.value
  emojiEl.innerText = emojies[rangeVal]
}

function onChangeFont() {
  if(checkLinesEmpty()) return
  var fontSelectorEl = document.querySelector('.font-selector')
  setFont(fontSelectorEl.value)
  renderImg()
}

function onAlignText(alignTo) {
  if(checkLinesEmpty()) return
  switch (alignTo) {
    case 'left':
      setLineAlign('left')
      break
    case 'center':
      setLineAlign('center')
      break
    case 'right':
      setLineAlign('right')
      break
  }
  renderImg()
}

function onSaveMeme() {
  var canvas = getCanvas()
  var imgContent = canvas.toDataURL('image/jpg')
  var imgArray = loadFromStorage('imgsArray')
  if (Array.isArray(imgArray)) {
    imgArray.push({ url: imgContent })
    saveToStorage('imgsArray', imgArray)
  } else saveToStorage('imgsArray', [{ url: imgContent }])
}

function renderSavedMemes() {
  var memeEditorEl = document.querySelector('.meme-editor-container')
  var filterEl = document.querySelector('.filter-container')
  var galleryEl = document.querySelector('.gallery')
  memeEditorEl.style.display = 'none'
  galleryEl.style.display = 'none'
  filterEl.style.display = 'flex'
  var savedMemeGallery = document.querySelector(
    '.saved-meme-gallery .gallery-container',
  )
  var imgs = loadFromStorage('imgsArray')
  if(!imgs) return
  var imgsHtml = imgs.map((img) => `<img  src='${img.url}'>`)
  savedMemeGallery.innerHTML = imgsHtml.join('')
}

function onDeleteLine() {
  deleteLine()
  renderImg()
}

function onFontSizeChange(diff) {
  // no lines then return
  if(checkLinesEmpty()) return
  changeFontSize(diff)
  renderImg()
}

function onSwitchLines(diff) {
  switchLines(diff)
}

function onStrokeColorChange(val) {
  setStrokeColor(val)
  renderImg()
}

function onMoveLine(num) {
  // no lines then return
  debugger
  if(checkLinesEmpty()) return
  if (num > 0) moveLine(num)
  else moveLine(num)
  renderImg()
}

function onColorChange(val) {
  setColor(val)
  renderImg()
}


function onSetFilter(ev){
  var filterVal = ev.target.innerText
  var keywords = getKeywords()
  if(keywords[filterVal] > 50) return
  keywords[filterVal] += 5
  var filterEl = document.querySelector(`.filter-${filterVal}`)
  filterEl.style.fontSize = `${keywords[filterVal]}px` 
  setFilter(filterVal)
  renderImgs()
}

function onSetSearch(val){
  setFilter(val)
  renderImgs()
}

renderImgs()
function renderImgs() {
  var galleryContainerEl = document.querySelector('.gallery-container')
  var imgs = getImgs()
  var imgsHtml = imgs.map(
    (img) => `<img onclick='showMemeEditor(${img.id})' src='${img.url}'>`,
  )
  galleryContainerEl.innerHTML = imgsHtml.join('')
}

function onDownloadImg(elLink){
  var imgContent = getCanvas().toDataURL('image/jpeg')
  elLink.href = imgContent
}

// variables used to get mouse position on the canvas

var canvas = getCanvas()
var ctx = getCtx()
var offsetX = canvas.offsetLeft
var offsetY = canvas.offsetTop
// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX
var startY

// an array to hold text objects
// var texts = getMemeLines()

// this var will hold the index of the hit-selected text
var selectedText = -1

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(text, x, y) {
  console.log('mouse x, y:', x, y, ' text x, y', text.x, text.y)
  return (
    x >= text.x &&
    x <= text.x + ctx.measureText(text.txt).width &&
    y >= text.y - text.size &&
    y <= text.y
  )
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
  var texts = getMemeLines()
  e.preventDefault()
  startX = parseInt(e.offsetX - offsetX)
  startY = parseInt(e.offsetY - offsetY)
  // Put your mousedown stuff here
  texts.forEach((text, idx) => {
    if (textHittest(text, startX, startY)) {
      selectedText = idx
    }
  })
}

// done dragging
function handleMouseUp(e) {
  e.preventDefault()
  selectedText = -1
}

// also done dragging
function handleMouseOut(e) {
  e.preventDefault()
  selectedText = -1
}

// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function handleMouseMove(e) {
  if (selectedText < 0) return
  e.preventDefault()
  var mouseX = parseInt(e.offsetX - offsetX)
  var mouseY = parseInt(e.offsetY - offsetY)

  // Put your mousemove stuff here
  var dx = mouseX - startX
  var dy = mouseY - startY
  startX = mouseX
  startY = mouseY

  var texts = getMemeLines()
  var text = texts[selectedText]
  text.x += dx
  text.y += dy
  renderImg()
}


// listen for mouse events
canvas.addEventListener('mousedown', (e) => {
  handleMouseDown(e)
})
canvas.addEventListener('mousemove', (e) => {
  handleMouseMove(e)
})
canvas.addEventListener('mouseup', (e) => {
  handleMouseUp(e)
})
canvas.addEventListener('mouseout', (e) => {
  handleMouseOut(e)
})

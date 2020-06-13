'use strict'

// on submit call to this function
function uploadImg(elForm, ev) {
  debugger
  ev.preventDefault()
  var canvas = getCanvas()
  document.querySelector('#imgData').value = canvas.toDataURL('image/jpeg')

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
  }
  doUploadImg(elForm, onSuccess)
}

function renderCanvas(img) {

  var canvas = getCanvas()
  gCtx.drawImage(img, 0, 0, img.width,    img.height, 0, 0, canvas.width, canvas.height);
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
  loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();
  
  reader.onload = function (event) {
      var img = new Image();
      img.onload = onImageReady.bind(null, img)
      img.src = event.target.result;
  }
  reader.readAsDataURL(ev.target.files[0]);
}

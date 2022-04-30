keyboardBox.onmousedown = function (event) {
  // (1) prepare to moving: make absolute and on top by z-index
  keyboardBox.style.position = 'absolute'
  keyboardBox.style.zIndex = 1000
  let shiftX = event.clientX - keyboardBox.getBoundingClientRect().left

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(keyboardBox)

  function moveAt (pageX) {
    let finalX = pageX - shiftX
    if (finalX < 0) {
      finalX = 0
    }
    if (finalX > 1238 - 413) {
      finalX = 1238 - 413
    }
    keyboardBox.style.left = finalX + 'px'
  }

//   // move our absolutely positioned ball under the pointer
//   moveAt(event.pageX, event.pageY)

  function onMouseMove (event) {
    moveAt(event.pageX, event.pageY)
  }

  // (2) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove)

  // (3) drop the ball, remove unneeded handlers
  document.onmouseup = function () {
    let Xpos = keyboardBox.getBoundingClientRect().left
    let finalX = Math.round(Xpos/59)*59
    keyboardBox.style.left = finalX + 'px'
    document.removeEventListener('mousemove', onMouseMove)
  }

  keyboardBox.ondragstart = function () {
    return false
  }
}

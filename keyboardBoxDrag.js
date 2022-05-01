keyboardBox.onmousedown = function (event) {
  // (1) prepare to moving: make absolute and on top by z-index
  keyboardBox.style.position = 'absolute'
  const shiftX = event.clientX - keyboardBox.getBoundingClientRect().left

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(keyboardBox)

  function moveAt (pageX) {
    let finalX = pageX - shiftX
    if (finalX < 0) {
      finalX = 0
    }
    if (finalX > 1240 - 532) {
      finalX = 1240 - 532
    }
    keyboardBox.style.left = finalX + 'px'
  }

  //   // move our absolutely positioned ball under the pointer
  moveAt(event.pageX)

  function onMouseMove (event) {
    moveAt(event.pageX, event.pageY)
  }

  // (2) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove)

  // (3) drop the ball, remove unneeded handlers
  document.onmouseup = function () {
    const Xpos = keyboardBox.getBoundingClientRect().left
    const finalX = Math.round(Xpos / 59) * 59
    keyboardBox.style.left = finalX + 'px'
    keyboardBox.pos = Math.round(Xpos / 59)
    document.removeEventListener('mousemove', onMouseMove)
  }

  keyboardBox.ondragstart = function () {
    return false
  }
}

function noteNumToNoteName (noteNum) {
  octave = Math.floor(noteNum / 7) + 3

  noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  sharps = [0, 'C#', 'D#', 0, 'F#', 'G#', 'A#', 0]
  noteLetter = noteLetters[noteNum % 7]
  return noteLetter + octave
}

keyboardBox.pos = 0
noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
sharps = [0, 'C#', 'D#', 0, 'F#', 'G#', 'A#']
function playTonebyKeyOffset (keyOffset) {
  // odd numbers are white keys. 1 is the leftmost white key in keyboardBox
  // even numbers are black keys. 0 is the black key on the left border of keyboardBox
  if (keyOffset % 2 === 1) {
    noteLetter = noteLetters[Math.floor((keyOffset / 2) + keyboardBox.pos) % 7]
  } else {
    noteLetter = sharps[(Math.floor(keyOffset / 2) + keyboardBox.pos) % 7]
    if (noteLetter === 0) {
      return
    }
  }
  octave = Math.floor((Math.floor(keyOffset / 2) + keyboardBox.pos) / 7) + 3

  playTone(noteLetter + octave)
}
document.onkeydown = function (event) {
  keys = ['q', 'a', 'w', 's', 'e', 'd', 'r', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'i', 'k', 'o', 'l', 'p']
  keyIndex = keys.findIndex(x => { if (x === event.key) return x })
  if (event.key === 'ı') {
    keyIndex = keys.findIndex(x => { if (x === 'i') return x })
  }
  if (keyIndex >= 0) {
    playTonebyKeyOffset(keyIndex)
  }
}

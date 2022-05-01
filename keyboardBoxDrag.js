"use strict";

const keyboardBox = document.getElementById("keyboardBox");
const keyboard = document.getElementById("keyboard");

keyboardBox.onmousedown = function (event) {
  // (1) prepare to moving: make absolute and on top by z-index
  let shiftX = 0;
  if (keyboardBox.style.left === "") {
    shiftX = event.clientX;
  } else {
    shiftX = event.clientX - parseInt(keyboardBox.style.left, 10);
  }

  const keyboardLeft = 0;
  const keyboardRight = keyboardLeft + keyboard.getBoundingClientRect().width;
  const keyboardBoxWidth = keyboardBox.getBoundingClientRect().width;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body

  function moveAt(pageX) {
    let finalX = pageX - shiftX;
    if (finalX < keyboardLeft) {
      finalX = keyboardLeft;
    }
    if (finalX > keyboardRight - keyboardBoxWidth) {
      finalX = keyboardRight - keyboardBoxWidth;
    }
    keyboardBox.style.left = finalX + "px";
  }

  // move our absolutely positioned ball under the pointer
  moveAt(event.pageX);

  function onMouseMove(event) {
    moveAt(event.pageX);
  }

  // (2) move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (3) drop the ball, remove unneeded handlers
  document.onmouseup = function () {
    const Xpos = parseInt(keyboardBox.style.left, 10);
    const finalX = Math.round(Xpos / 59) * 59;
    keyboardBox.style.left = finalX + "px";
    keyboardBox.pos = Math.round(Xpos / 59);
    document.removeEventListener("mousemove", onMouseMove);
  };

  keyboardBox.ondragstart = function () {
    return false;
  };
};

keyboardBox.pos = 0;
const noteLetters = ["C", "D", "E", "F", "G", "A", "B"];
const sharps = ["", "C#", "D#", "", "F#", "G#", "A#"];
function playTonebyKeyOffset(keyOffset) {
  // odd numbers are white keys. 1 is the leftmost white key in keyboardBox
  // even numbers are black keys. 0 is the black key on the left border of keyboardBox
  let noteLetter = "";
  if (keyOffset % 2 === 1) {
    noteLetter = noteLetters[Math.floor(keyOffset / 2 + keyboardBox.pos) % 7];
  } else {
    noteLetter = sharps[(Math.floor(keyOffset / 2) + keyboardBox.pos) % 7];
    if (noteLetter === "") {
      return;
    }
  }
  let octave =
    Math.floor((Math.floor(keyOffset / 2) + keyboardBox.pos) / 7) + 3;

  playTone(noteLetter + octave);
}

document.onkeydown = function (event) {
  if (event.repeat) {
    return;
  }
  const keys = [
    "q",
    "a",
    "w",
    "s",
    "e",
    "d",
    "r",
    "f",
    "t",
    "g",
    "y",
    "h",
    "u",
    "j",
    "i",
    "k",
    "o",
    "l",
    "p",
  ];
  let keyIndex = keys.findIndex((x) => {
    if (x === event.key) return x;
  });
  if (event.key === "ı") {
    keyIndex = keys.findIndex((x) => {
      if (x === "i") return x;
    });
  }
  if (keyIndex >= 0) {
    playTonebyKeyOffset(keyIndex);
  }
};

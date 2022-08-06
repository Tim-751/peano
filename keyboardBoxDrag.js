("use strict");

const keyboard = document.getElementById("keyboard");
const keyboardBox = document.getElementById("keyboardBox");
keyboardBox.pos = 0;

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

const noteLetters = ["C", "D", "E", "F", "G", "A", "B"];
const sharps = ["", "C#", "D#", "", "F#", "G#", "A#"];
function playNotebyKeyOffset(keyOffset) {
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

  playNote(noteLetter + octave);
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
    playNotebyKeyOffset(keyIndex);
  }
};

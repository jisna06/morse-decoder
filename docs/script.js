// Morse Code Mappings
const morseCodeMap = {
    ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
    "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
    "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
    ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
    "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
    "--..": "Z",
    "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4",
    ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9"
  };
  
  // Reverse mapping for encoding
  const textToMorseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([morse, letter]) => [letter, morse])
  );
  
  // Decode Morse to Text
  function decodeMorse() {
    const input = document.getElementById("morseInput").value.trim();
    const words = input.split(" / ");
    let result = "";
  
    words.forEach(word => {
      const letters = word.split(" ");
      letters.forEach(letter => {
        result += morseCodeMap[letter.toUpperCase()] || "?";
      });
      result += " ";
    });
  
    document.getElementById("decodedText").innerText = result.trim();
  }
  
  // Encode Text to Morse
  function encodeToMorse() {
    const input = document.getElementById("morseInput").value.toUpperCase();
    let result = "";
  
    for (let char of input) {
      if (char === " ") {
        result += "/ ";
      } else {
        result += (textToMorseMap[char] || "?") + " ";
      }
    }
  
    document.getElementById("decodedText").innerText = result.trim();
  }
  
  // Clear the input and output
  function clearFields() {
    document.getElementById("morseInput").value = "";
    document.getElementById("decodedText").innerText = "";
  }
  
  // Toggle dark/light theme
  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
  }
  
  // Play Morse Code as beeps
  function playMorse() {
    const text = document.getElementById("decodedText").innerText;
    const unit = 0.1;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let time = audioCtx.currentTime;
  
    for (let char of text) {
      if (char === ".") {
        beep(audioCtx, time, unit);
        time += unit + 0.05;
      } else if (char === "-") {
        beep(audioCtx, time, unit * 3);
        time += unit * 3 + 0.05;
      } else if (char === "/") {
        time += unit * 7;
      } else {
        time += unit * 3;
      }
    }
  }
  
  function beep(audioCtx, startTime, duration) {
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
  
    oscillator.frequency.value = 600;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

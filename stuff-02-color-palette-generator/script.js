// Copy to clipboard, only with clicking the icon
// Here I add event listener to the entire palette container because if there's creating new color-box mechanism this still works
const paletteContainer = document.querySelector(".palette-container");

paletteContainer.addEventListener("click", handleCopy);

function handleCopy(ev) {
  const copyBtn = ev.target.closest(".copy-btn");

  const hexVal = copyBtn.closest(".color-info").querySelector("#color-hex")
    .textContent;

  navigator.clipboard.writeText(hexVal)
    .then(() => showCopySuccess(copyBtn))
    .catch(console.error);
}

function showCopySuccess(btn) {
  btn.classList.replace("far", "fas");
  btn.classList.replace("fa-copy", "fa-check");
  btn.style.color = "#48bb78";

  setTimeout(() => {
    btn.classList.replace("fas", "far");
    btn.classList.replace("fa-check", "fa-copy");
    btn.style.color = "#555";
  }, 1500);
}

// shuffling palette
const generateBtn = document.getElementById("generate-btn");

generateBtn.addEventListener("click", generateColor);
const colorBoxes = document.querySelectorAll(".color-box");

function generateColor() {
  let colors = [];
  let letters = "0123456789abcdef";
  for(let i = 0; i < colorBoxes.length; i++) {
    let color = "#";
    for(let j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  updateColorPalette(colors);
}

function updateColorPalette(colors) {
  colorBoxes.forEach((box, index) => {
    let hex = colors[index];
    const hexSpan = box.querySelector("#color-hex");
    const colorDiv = box.querySelector(".color");
    hexSpan.textContent = hex;
    colorDiv.style.backgroundColor = hex;
  });
}
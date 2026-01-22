// card and board DOM
const cards = document.querySelectorAll(".card");
const boards = document.querySelectorAll(".board");

// adding all event listener
Array.from(cards).forEach((card) => {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
});

Array.from(boards).forEach((board) => {
  board.addEventListener("dragover", dragOver);
  board.addEventListener("dragenter", dragEnter);
  board.addEventListener("dragleave", dragLeave);
  board.addEventListener("drop", dragDrop);
});

// mechanism
function dragStart(ev) {
  ev.dataTransfer.setData("text/plain", this.id);
}

function dragEnd(ev) {
  console.log(`Card id of ${ev.currentTarget.id} succesfully dragged`);
}

function dragOver(ev) {
  // this line is important because by default, browsers don't allow you to drop elements onto other elements.
  ev.preventDefault();
}

function dragEnter(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.add("over");
}

function dragLeave(ev) {
  ev.currentTarget.classList.remove("over");
}

function dragDrop(ev) {
  const droppedCardId = ev.dataTransfer.getData("text/plain");
  const droppedCardDiv = document.getElementById(droppedCardId);

  ev.currentTarget.appendChild(droppedCardDiv);
  ev.currentTarget.classList.remove("over");
}
const board = document.getElementById("container-board");
const slider = document.getElementById("grid-size");
const color =  document.getElementById("color-picker")

let isDrawing = false;
let PEN_COLOR = "#000000";
let GRID_SIZE = 16;

color.oninput = () => {PEN_COLOR = color.value; }

slider.oninput = function() {
  GRID_SIZE = this.value;
  document.getElementById("grid-size-number").innerHTML = `${GRID_SIZE} X ${GRID_SIZE}`;
  clearBoard(GRID_SIZE);
}
function createBoard(GRID_SIZE) {
  board.style.setProperty('--grid-rows', GRID_SIZE);
  board.style.setProperty('--grid-cols', GRID_SIZE);

  for (let i = 0; i < (GRID_SIZE * GRID_SIZE); i++) {
    let pixel = document.createElement("a");

    pixel.addEventListener("mousedown", function() {
        pixel.style.backgroundColor = PEN_COLOR;
        isDrawing = true;
    });
    
    pixel.addEventListener("mousemove", function(){
        if(isDrawing){
          pixel.style.backgroundColor = PEN_COLOR;
        }
    });

    pixel.addEventListener("mouseup", () => { isDrawing = false; });


    pixel.className = "grid-item";    
    board.appendChild(pixel)
  };
};

function eraseBoard() {
  // if pen color white change black, else change white
  if(PEN_COLOR === "#FFFFFF") {
    PEN_COLOR = "#000000"
  } else {
    PEN_COLOR = "#FFFFFF";  
  }
}

function clearBoard() {
  board.innerHTML = " ";
  createBoard(GRID_SIZE);  
}

createBoard(GRID_SIZE);
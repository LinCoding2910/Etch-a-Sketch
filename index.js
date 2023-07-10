// PHASE 1 : 1)create a heading for the page!
//           2)create a box about 25% of the page in full-size mode
//           3)the box should be slightly right from the middle of the page
//           4)create a even number of grids inside it base on size required (start with 16x16)
let colorOption = 0;

function changeColorOption(option) {
  let buttons = document.querySelectorAll('.color-option-button');

  buttons.forEach(function(button) {
    if (button.id === option) {
      button.classList.toggle('selected');
      if (button.classList.contains('selected')) {
        switch (option) {
          case 'single':
            colorOption = 0;
            break;
          case 'rainbow':
            colorOption = 1;
            break;
          case 'shade':
            colorOption = 2;
            break;
          case 'light':
            colorOption = 3;
            break;
        }
      } else {
        colorOption = 0;
      }
    } else {
      button.classList.remove('selected');
    }
  });
}

function getRandomRGBColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
};

let shadeColor = (box) => {
    let currentColor = getComputedStyle(box).backgroundColor;
    let rgbValues = currentColor.match(/\d+/g);
    let red = parseInt(rgbValues[0]);
    let green = parseInt(rgbValues[1]);
    let blue = parseInt(rgbValues[2]);
    if (red < 4) red = 0;
    if (green < 4) green = 0;
    if (blue < 4) blue = 0;
    let shadeRed = Math.round(red * 0.85);
    let shadeGreen = Math.round(green * 0.85);
    let shadeBlue = Math.round(blue * 0.85);
    let shadedColor = `rgb(${shadeRed}, ${shadeGreen}, ${shadeBlue})`;
    box.style.backgroundColor = shadedColor;
};

let lightenColor = (box) => {
    let currentColor = getComputedStyle(box).backgroundColor;
    let rgbValues = currentColor.match(/\d+/g);
    let red = parseInt(rgbValues[0]);
    let green = parseInt(rgbValues[1]);
    let blue = parseInt(rgbValues[2]);
    if (red === 0) red = 12.25;
    if (green === 0) green = 12.25;
    if (blue === 0) blue = 12.25;
    let lightRed = Math.round(red * 1.1);
    let lightGreen = Math.round(green * 1.1);
    let lightBlue = Math.round(blue * 1.1);
    let lightenedColor = `rgb(${lightRed}, ${lightGreen}, ${lightBlue})`;
    box.style.backgroundColor = lightenedColor;
};

let addMousedownTrigger = (box) => {
    box.addEventListener('mousedown', function () {
        if (colorOption === 0) {
            box.style.backgroundColor = 'black';
        } else if (colorOption === 1) {
            let randomColor = getRandomRGBColor();
            box.style.backgroundColor = randomColor;
        } else if (colorOption === 2) {
            shadeColor(box); 
        } else if (colorOption === 3) {
            lightenColor(box);
        };
    });
};

let addMouseenterTrigger = (box) => {
    box.addEventListener('mouseenter', function (event) {
        if (event.buttons !== 1)
            return;
        if (colorOption === 0) {
            box.style.backgroundColor = 'black';
        } else if (colorOption === 1) {
            let randomColor = getRandomRGBColor();
            box.style.backgroundColor = randomColor;
        } else if (colorOption === 2) {
            shadeColor(box);
        } else if (colorOption === 3) {
            lightenColor(box);
        };
    });
};

function addEventListenersForBox() {
    let boxes = document.querySelectorAll('.boxes');
    boxes.forEach(function(box) {
        addMousedownTrigger(box);
        addMouseenterTrigger(box);
    });
};

let gridMaker = (rows,columns) => {
    let container = document.getElementById('grid-container');
    container.style.setProperty('--grid-rows',rows);
    container.style.setProperty('--grid-cols',columns);
    container.innerHTML = "";
    for (let boxCreated = 0;boxCreated < rows*columns;boxCreated++) {
        let box = document.createElement('div');
        container.appendChild(box).className = "boxes";
    };
    addEventListenersForBox();
};

gridMaker(1,1);

let dropdown = document.getElementById("grids");
dropdown.onchange = function() {
    let selectedOption = dropdown.value;
    gridMaker(selectedOption,selectedOption);
};

let clearGrid = () => {
    let boxes = document.querySelectorAll('.boxes');
    boxes.forEach(function(box) {
        box.style.backgroundColor = 'white';
    });
};
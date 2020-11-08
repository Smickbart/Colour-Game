const boxOne = document.querySelector(".color-box--1");
const boxTwo = document.querySelector(".color-box--2");
const boxThree = document.querySelector(".color-box--3");
const boxFour = document.querySelector(".color-box--4");
const boxFive = document.querySelector(".color-box--5");
const boxSix = document.querySelector(".color-box--6");

const topContainer = document.querySelector(".container--top");
const bottomContainer = document.querySelector(".container--bottom");

let winningColorDisplay = document.querySelector(".header__heading--sub");
let winningColor = "";

const headerBackground = document.querySelector(".header");

const changeColorBtn = document.querySelector(".btn--change");
const difficultyButtonEasy = document.getElementById("easy");
const difficultyButtonNormal = document.getElementById("normal");

let colorBoxes = [boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix];


// Event Listeners
for(let i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].addEventListener("click", function(event) {
        if(checkIfCorrect(event.target)) {
            won(event.target);
        } else {
            lost(event.target);
        }
    });
}

difficultyButtonEasy.addEventListener("change", function() {
    topContainer.classList.add("block");
    bottomContainer.classList.add("hidden");
    newColors();
});

difficultyButtonNormal.addEventListener("change", function() {
    bottomContainer.classList.remove("hidden");
    newColors();
})

changeColorBtn.addEventListener("click", function() {
    newColors();
});

// Functions
function initialize() {
    newColors();
}

function newColors() {
    if(difficultyButtonEasy.checked) {
        bottomContainer.classList.add("hidden");
    }
    assignColor(colorBoxes);
    winningColor = randomBox().style.backgroundColor;
    winningColorDisplay.innerHTML = winningColor;
    headerBackground.style.backgroundColor = "#fff";
    colorBoxes.forEach(function(box) {
        box.removeAttribute("tabindex")
    });
    showBoxes();
}

function randomBox() {
    if(difficultyButtonEasy.checked) {
        return colorBoxes[Math.floor(Math.random() * 3)];
    } else {
        return colorBoxes[Math.floor(Math.random() * 6)];
    }        
}

function assignColor(box) {
    box.forEach(function(box) {
        box.style.backgroundColor = generateColor();
    });
}

function generateColor () {
    function generateHue () {
        return Math.floor(Math.random() * 255 + 1);
    }
    let red = generateHue();
    let green = generateHue();
    let blue = generateHue();

    return "rgb(" + red + ", " + green + ", " + blue + ")"
}

function checkIfCorrect(box) {
    return box.style.backgroundColor === winningColor;
}

function won(winner) {
    for(let i = 0; i < colorBoxes.length; i++) {        
        colorBoxes[i].style.backgroundColor = winner.style.backgroundColor;
        headerBackground.style.backgroundColor = winner.style.backgroundColor;
    }
    showBoxes();
    colorBoxes.forEach(function(box) {
        box.setAttribute("tabindex", "-1");
    });
}

function lost(loser) {
    loser.style.opacity = "0";
    loser.setAttribute("tabindex", "-1");
}

function showBoxes () {
    for(let i = 0; i < colorBoxes.length; i++) {
        if(colorBoxes[i].style.opacity === "0") {
            colorBoxes[i].style.opacity = "1";
        }
    }
}

initialize();
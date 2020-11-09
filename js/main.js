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
for(box of colorBoxes) {
    box.addEventListener("click",
        (e) => {checkIfCorrect(e.target) ? won(e.target) : lost(e.target);})
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
    winningColor = randomBox().style.backgroundColor;

    if(difficultyButtonEasy.checked) {
        bottomContainer.classList.add("hidden");
    }
    assignColor(colorBoxes);
    winningColorDisplay.innerHTML = winningColor;
    headerBackground.style.backgroundColor = "#fff";
    colorBoxes.forEach(function(box) {
        box.removeAttribute("tabindex")
    });
    showBoxes();
}

function randomBox() {
    return (difficultyButtonEasy.checked ?
            colorBoxes[Math.floor(Math.random() * 3)] :
            colorBoxes[Math.floor(Math.random() * 6)]);      
}

function assignColor(boxes) {
    boxes.forEach(function(box) {
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
    headerBackground.style.backgroundColor = winner.style.backgroundColor;
    for(box of colorBoxes) {
        box.style.backgroundColor = winner.style.backgroundColor;
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
    for(box of colorBoxes) {
        if(box.style.opacity === "0") {
            box.style.opacity = "1";
        }
    }
}

initialize();
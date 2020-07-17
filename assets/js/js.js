
/**********************************************************************************
		READY STATE
***********************************************************************************/

document.addEventListener("readystatechange", eventController);
function eventController() {
	if ( document.readyState == "interactive" ) {

		document.body.addEventListener("click", targetClicked, false);

		// document.getElementById('power').addEventListener('click', errorPulse);
		document.getElementById('start').addEventListener('click', addPulse);
		document.getElementById('stop').addEventListener('click', resetGame);
		
		document.getElementById('reset').addEventListener('click', resetGame);


	}
}


//Inutilizar click derecho y la tecla 123 = F12
/*
$(document).bind("contextmenu",function(e) {
 e.preventDefault();
});

$(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
});
*/


/**********************************************************************************
		VARIABLES GLOB
***********************************************************************************/

let actualPulse = 0;
let arrayPulses = [0,1,2,3];
let arrayBtn = ["btn-green","btn-red","btn-yellow","btn-blue"];
let getIndex = {"btn-green":"0", "btn-red":"1", "btn-yellow":"2", "btn-blue":"3"};

let block = false;
let delay = 550;

let r = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
	b = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
	y = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
	g = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
let sounds = [g, r, y, b];
	


/**********************************************************************************
		FUNCTIONS
***********************************************************************************/

let idClicked, classClicked;
const targetClicked = (e) => {
	idClicked = e.target.id;
	classClicked = e.target.className;
	if(idClicked.includes("btn-") && block){
		pulseBtn(idClicked);
		verifyPulse(idClicked);
	}
}

function addPulse() {

	calculateDelay();

	block = false;
	document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) + 1;
	arrayPulses.push(Math.floor(Math.random() * 4));

	arrayPulses.forEach(function (pulse, i) {
		setTimeout(function () {
			sounds[pulse].play();

			pulseBtn(arrayBtn[pulse]);
		}, delay*i);
	});

	setTimeout(function () {
		block = true;
	}, delay*(arrayPulses.length-1));

}


function verifyPulse(id) {
	sounds[getIndex[id]].play();

	if(id == arrayBtn[arrayPulses[actualPulse]] && arrayBtn[arrayPulses[actualPulse]] != undefined){
		actualPulse ++;
	} else {
		resetBlock();
		notifyIncorrect();
	}
	if(actualPulse >= arrayPulses.length && arrayPulses.length != 0){
		resetBlock();
		notifyCorrect();

		setTimeout(function () {
			addPulse();
		}, 2000);
	}
}

function resetBlock() {
	block = false;
	actualPulse = 0;
}

function pulseBtn(id) {

	document.getElementById(id).classList.add("pressed");
	setTimeout(function () {
		document.getElementById(id).classList.remove("pressed");
	}, 150);
}

function calculateDelay() {
	switch (arrayPulses.length) {
		case 4:
			delay = 500;
			break;
		case 10:
			delay = 425;
			break;
		case 15:
			delay = 350;
			break;
		case 20:
			delay = 325;
			break;									
	}
}

function errorPulse() {
	for (var i = 0; i < arrayBtn.length; i++) {
		document.getElementById(arrayBtn[i]).classList.add("pressed");
	}
	setTimeout(function () {
		for (var i = 0; i < arrayBtn.length; i++) {
			document.getElementById(arrayBtn[i]).classList.remove("pressed");
		}
	}, 150);
	setTimeout(function () {
		for (var i = 0; i < arrayBtn.length; i++) {
			document.getElementById(arrayBtn[i]).classList.add("pressed");
		}
	}, 300);
	setTimeout(function () {
		for (var i = 0; i < arrayBtn.length; i++) {
			document.getElementById(arrayBtn[i]).classList.remove("pressed");
		}
	}, 450);
}

function notifyCorrect() {
	document.getElementById('menu').classList.add("correct");
	document.getElementById('correct').style.display = "block";
	document.getElementById('correct').style.opacity = "1";
	setTimeout(function () {
		document.getElementById('correct').style.opacity = "0";
		document.getElementById('menu').classList.remove("correct");
	}, 1000);
}
function notifyIncorrect() {

	document.getElementById('menu').classList.add("incorrect");
	document.getElementById('incorrect').style.display = "block";
	document.getElementById('incorrect').style.opacity = "1";
	setTimeout(function () {
		document.getElementById('incorrect').style.opacity = "0";
		document.getElementById('menu').classList.remove("incorrect");
		errorPulse();
		resetIcon();
	}, 2000);
}
function resetIcon() {
	setTimeout(function () {
		document.getElementById('reset').style.display = "block";
		document.getElementById('reset').style.opacity = "1";
	}, 1000);
}
function resetIconOut() {
	document.getElementById('reset').style.opacity = "0";
}

function resetGame() {
	arrayPulses = [0,1,2,3];
	errorPulse();
	resetIconOut();
	document.getElementById('counter').innerHTML = 0;

	setTimeout(function () {
		addPulse();
	}, 1500);
}

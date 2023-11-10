// https://tsherif.wordpress.com/2013/08/04/constructors-are-bad-for-javascript/

// modules
const gameBoard = (function () {

})();

const displayController = (function () {

})();

// factory
function players(name) {
    var player = Object.create(players.proto);
    player.name = name;
    return player;
}

players.proto = {
    getData: function () {
        return this.name;
    }
}

var o = players("Omar");

// VV

function turnNum() {
    let counter = 0;

    const getCounter = () => counter;

    const increment = () => counter++;

    return { getCounter, increment };
}

const counter = turnNum();

function playerMark(ctr) {
    let mark = (ctr % 2) ? 'X' : 'O';
    return mark;
}

// move from global
const tcells = Array.from(document.getElementsByClassName("cell"));

var x = new Array(3);

for (var i = 0; i < 3; i++) {
    x[i] = new Array(3);
    for (var j = 0; j < 3; j++) {
        x[i][j] = ((i + j) % 2) ? 'X' : 'O';
        x[i][j] = '-';
        tcells[3 * i + j].innerHTML = x[i][j];
    }
}


let xCoords = new Array(5);
let oCoords = new Array(5);

for (var i = 0; i < xCoords.length; i++) {
    xCoords[i] = new Array(2);
    oCoords[i] = new Array(2);
}

let xInc = 0;
let oInc = 0;

for (let cell in tcells) {
    tcells[cell].addEventListener('click', (e) => {
        if (tcells[cell].innerHTML == '-') {
            counter.increment();
            let mark = playerMark(counter.getCounter());
            tcells[cell].innerHTML = mark;
            let coord = tcells[cell].id.toString().slice(4, 5);

            let row = Math.floor(coord / 3);
            let column = coord % 3;
            console.log("r = " + row + ", c = " + column);
            x[row][column] = mark;

            if (mark === 'X') {
                xCoords[xInc] = ([row, column]);
                xInc++;
            }
            else {
                oCoords[oInc] = ([row, column]);
                oInc++;
            }
            if (counter.getCounter() > 4) {      // 5 turns is the minimum for a win
                checkWin(xCoords, oCoords, mark);
            }

            if (counter.getCounter() == 9) {
                // if there is no win
                console.log("tie");
            }

        }

    });
}

// console.log(x);


// 0 1 2
// 3 4 5
// 6 7 8

let [rowWin, colWin] = winConditions();

function winConditions() {
    let vars = [...Array(3)].map(e => Array(3));
    let rowWin = [];
    let colWin = [];
    let rowTemp = [];
    let colTemp = [];
    console.log("winConditions");
    for (var k = 0; k < 3; k++) {
        for (var j = 0; j < 3; j++) {

            rowTemp.push(j + (3 * k));

            colTemp.push(3 * j + k);
        }

        rowWin[k] = [rowTemp[0], rowTemp[1], rowTemp[2]];
        colWin[k] = [colTemp[0], colTemp[1], colTemp[2]];
        rowTemp.splice(0, 3);
        colTemp.splice(0, 3);
    }
    return [rowWin, colWin];
}


function checkWin(xC, oC, mark) {
    let xRows = [];
    let xCols = [];
    let oRows = [];
    let oCols = [];

    function search(coordinates, key) {
        console.log('search function');

        for (let i = 0; i < coordinates.length; i++) {
            if (coordinates[i][0] === key[0] && coordinates[i][1] === key[1]) {
                // console.log('searched');
                return true;
            }
        }
        return false;
    }
    let coords = xC;
    // let len = (mark==='X') ? xC.length : oC.length && coords=oC;
    let len;
    if (mark === 'X') {
        len = xC.length;
    }
    else {
        len = oC.length;
        coords = oC;
    }


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (search(coords, [i, 0]) && search(coords, [i, 1]) && search(coords, [i, 2])) {
                console.log(mark + " has a row match");
                return true;
                // break;
            }
        }
    }

    if (search(coords, [0, 0]) && search(coords, [1, 1]) && search(coords, [2, 2])) {
        console.log(mark + " has a diagonal match");
    }

    if (search(coords, [0, 2]) && search(coords, [1, 1]) && search(coords, [2, 0])) {
        console.log(mark + " has a diagonal match");
    }

    console.log("checkwin");

    xRows = [];
    xCols = [];
    oRows = [];
    oCols = [];
}





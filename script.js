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

let counter = 0;
// let playerMark = 'temp';

function playerMark(ctr) {
    let mark = (ctr % 2) ? 'X' : 'O';
    console.log(mark + "'s turn");
    return mark;
}

// if (counter >= 0) {
//     playerMark = (counter % 2) ? 'X' : 'O';
// }

// function addX {

// }

// function addY {

// }

const tcells = Array.from(document.getElementsByClassName("cell"));

// create table in console
var x = new Array(3);

for (var i = 0; i < x.length; i++) {
    x[i] = new Array(3);
}

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        x[i][j] = ((i + j) % 2) ? 'X' : 'O';
        x[i][j] = '-';
        tcells[3 * i + j].innerHTML = x[i][j];
    }
}


// console.log("tcells = " + tcells);

let xCoords = new Array(5);
let oCoords = new Array(5);

for (var i = 0; i < xCoords.length; i++) {
    xCoords[i] = new Array(2);
    oCoords[i] = new Array(2);
}

let xInc = 0;
let oInc = 0;


// place in a function, make xCoords and oCoords hidden and accessible/modifiable via getter
for (let cell in tcells) {
    // console.log("item = " + cell);
    tcells[cell].addEventListener('click', (e) => {
        console.log(tcells[cell].innerHTML);
        if (counter > 3) {      // 5 turns is the minimum for a win
            checkWin(xCoords, oCoords);
        }
        if (tcells[cell].innerHTML == '-') {
            let mark = playerMark(++counter);
            tcells[cell].innerHTML = mark;
            let coord = tcells[cell].id.toString().slice(4, 5);

            let row = Math.floor(coord / 3);
            let column = coord % 3;
            console.log("r = " + row + ", c = " + column);
            x[row][column] = mark;

            (mark == 'X') ? xCoords[xInc++] = [row, column] : oCoords[oInc++] = ([row, column]);
            // add to gameBoard
            // x[i][j] = mark;
        }
        // console.log("row = " + Math.floor(cell/3) + ", column = " + cell%3);
        console.log(x);
    });
}

// console.log(x);


// 0 1 2
// 3 4 5
// 6 7 8

function winConditions() {
    let vars = [...Array(3)].map(e => Array(3));
    let rows = [];
    let cols = [];
    let rowTemp = [];
    let colTemp = [];
    console.log("checkwin");
    for (var k = 0; k < 3; k++) {
        for (var j = 0; j < 3; j++) {
            console.log("k = " + k + ", j = " + j);

            // rows = j+(3*k)
            console.log("rows = " + (j + (3 * k))); // 0, 1, 2... 7, 8
            // rows.push(j+3*k);
            rowTemp.push(j + (3 * k));
            // cols = 3j + k
            console.log("columns = " + (3 * j + k));  // 0, 3, 6, 1, 4, 7, 2, 5, 8
            colTemp.push(3 * j + k);
        }
        // console.log("rt = " + rowTemp);
        // console.log("ct = " + colTemp);
        rows[k] = [rowTemp[0], rowTemp[1], rowTemp[2]];
        cols[k] = [colTemp[0], colTemp[1], colTemp[2]];
        rowTemp.splice(0, 3);
        colTemp.splice(0, 3);
    }
    return;
}

function checkWin(xC, oC) {
    // for(var k=0; k<3; k++){
    //     for(var l=0; l<3; l++){
    //         if(tcells)
    //     }
    // }
    // cols = 0,3,6 / 1,4,7 / 2,5,8
    // rows = 0,1,2 / 3,4,5 / 6,7,8

    // console.log("gameboard = " + gameBoard);
    // console.log("rows " + rows);
    // console.log("cols " + cols);




    let xRows = [];
    let xCols = [];
    let oRows = [];
    let oCols = [];

    let len = (xC.length > oC.length) ? xC.length : oC.length;
    for (let i = 0; i < len; i++) {
        if (xC[i]) {
            xRows.push(xC[i][0]);
            xCols.push(xC[i][1]);
        }

        if (oC[i]) {
            oRows.push(oC[i][0]);
            oCols.push(oC[i][1]);
        }
    }
    // delete/clear xC and oC after doing this



    console.log("checkwin");

    for (let k = 0; k < 3; k++) {
        // for(let j=0;j<3;j++){

        // }

        // if(board[k] =  rows[k])
        // { return win; }
    }
}


// checkWin();
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

function playerMark(ctr) {
    let mark = (ctr % 2) ? 'X' : 'O';
    return mark;
}


const tcells = Array.from(document.getElementsByClassName("cell"));

// create table in console
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
            let mark = playerMark(++counter);
            tcells[cell].innerHTML = mark;
            let coord = tcells[cell].id.toString().slice(4, 5);

            let row = Math.floor(coord / 3);
            let column = coord % 3;
            console.log("r = " + row + ", c = " + column);
            x[row][column] = mark;

            // console.log("mark = " + mark);
            // console.log("row = " + row + ", column = " + column);
            if (mark === 'X') {
                xCoords[xInc] = ([row, column]);
                xInc++;
            }
            else {
                oCoords[oInc] = ([row, column]);
                oInc++;
            }

            if (counter > 4) {      // 5 turns is the minimum for a win
                // console.log("xCoords = " + xCoords + ", oCoords = " + oCoords);
                checkWin(xCoords, oCoords, mark);
            }

            if(counter==9) {
                // if there is no win
                console.log("tie");
            }
            // add to gameBoard
            // x[i][j] = mark;
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

let xRows = [];
let xCols = [];
let oRows = [];
let oCols = [];

function checkWin(xC, oC, mark) {

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

    // for (let i = 0; i < len; i++) {
    //     if (search(coords, [i, 0]) && search(coords, [i, 1]) && search(coords, [i, 2])) {
    //         console.log(mark + " has a row match");
    //     }
    //     // check rows
    //     // if [i,0] [i,1] [i,2] exists



    //     // check columns

    // }

    // let len = (xC.length > oC.length) ? xC.length : oC.length;
    // console.log("len = " + len + ", xClen = " + xC.length + ", oClen = " + oC.length);

    // for (let i = 0; i < len; i++) {     // separate into row / column coordinates 
    //     if (xC[i]) {
    //         xRows.push(xC[i][0]);
    //         xCols.push(xC[i][1]);
    //     }

    //     if (oC[i]) {
    //         oRows.push(oC[i][0]);
    //         oCols.push(oC[i][1]);
    //     }
    // }

    // console.log("xR = " + xRows + ", xC = " + xCols + ", oR = " + oRows + ", oC = " + oCols);

    // delete/clear xC and oC after doing this (line 240)



    console.log("checkwin");

    for (let k = 0; k < 3; k++) {

    }



    // brute force checking matches, rows
    let match = 0;
    let xcr = 0;
    let xcc = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {   // traverse grid
            // if(tcells[cell].innerHTML!='-'){    // if the row/col/diag contains '-', break inner loop
            //     console.log(tcells[cell].innerHTML);
            // }
        }
        // if 0,0 1,1 and 2,2 exist in xRows, xCols
        for (let k = 0; k < xRows.length; k++) {
            if (xRows[k] == i) {
                xcr++;
            }
            if (xCols[k] == i) {
                xcc++;
            }
        }
    }

    xRows = [];
    xCols = [];
    oRows = [];
    oCols = [];
}





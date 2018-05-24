// To get Element
function el(v,a) {
    if(a){
      return document.querySelectorAll(v)[a];
    } else {
      return document.querySelector(v);}
}
// To get Element Style
function s(e) {
    return e.style;
}
// To get Current Window Width 
function winW() {
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
  }
// To get Current Window Height 
function winH() {
    return window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
  }
// To get Minimum size From width and Height
function minWinSize() {
    if (winW() < winH()) {
        return winW();
    } else {
        return winH();
    }
}
// Set Globle Game Canvas veriable
var gameCanvas = el("#gameCanvas");
// Set Canvas to 2 Dimentional
var ctx = gameCanvas.getContext("2d");
//Set Game canvas Size
canvasSize = minWinSize()-100;
gameCanvas.setAttribute("width", canvasSize);
gameCanvas.setAttribute("height", canvasSize);
// Veriable to store Players
var player = [];
// initilize First Players
player[1] = [];
// Set Player[X]  [0] = size
player[1][0] = 50;
// Set Player[X]  [1] = position X
player[1][1] = (canvasSize/2)-(player[1][0]/2);
// Set Player[X]  [2] = position Y
player[1][2] = (canvasSize/2)-(player[1][0]/2);
// Set Player[X]  [3] = style
player[1][3] = "#FF0000";
// Veriable to store Mouse movement to get difference of change
var previousMouseX,previousMouseY = null;
// Veriables to track mouse movement on canvas
var offset, mouseX, mouseY;
// Mouse move on game canvas
gameCanvas.onmousemove = function(e) {
    offset = gameCanvas.getBoundingClientRect(); 
    // Set mouse position on canavas
    mouseX = e.pageX - offset.left;
    mouseY = e.pageY - offset.top;
}
// on keypress
document.onkeydown = function(e) {
    e = e || window.event;
    // if this key is Up key
    if (e.keyCode == '38') {
        // move player to up
        player[1][2] -= 12;
    }
    // if this key is Left key
    else if (e.keyCode == '37') {
        // move player to left
        player[1][1] -= 12;
    }
    // if this key is Right key
    else if (e.keyCode == '39') {
        // move player to right
        player[1][1] += 12;
    }
    // if this key is Down key
    else if (e.keyCode == '40') {
        // move player to down
        player[1][2] += 12;
    }

    if(player[1][1] <= 0){
        // To stop player at minimum X
        player[1][1] = 0;
    }
    if(player[1][1] > (canvasSize-player[1][0])){
        // To stop player at maximum X
        player[1][1] = canvasSize-player[1][0];
    }
    if(player[1][2] <= 0){
        // To stop player at minimum Y
        player[1][2] = 0;
    }
    if(player[1][2] > (canvasSize-player[1][0])){
        // To stop player at maximum Y
        player[1][2] = canvasSize-player[1][0];
    }
}
// Refresh Game canvas at 60 fps
var gamePlay = setInterval(function(){ 
    // Clear Canvas
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Put player in canvas
    // Get player Style
    ctx.fillStyle = player[1][3];
    // Get radians by Anti Tan of X any Y side from player origin
    radians = Math.atan2(mouseX-player[1][1], mouseY-player[1][2]);
    // Get degree from radians
    degree = (radians * (180 / Math.PI) * -1) + 90;
    // translate ctx to player's XY cordinates
    ctx.translate(player[1][1]+player[1][0]/2,player[1][2]+player[1][0]/2);
    // Rotate ctx
    ctx.rotate((degree* Math.PI) / 180);
    // fill the player at position offset by half its size
    ctx.fillRect(-player[1][0]/2, -player[1][0]/2, player[1][0], player[1][0]);
    // Reset Rotate
    ctx.rotate((-degree * Math.PI) / 180);
    // Reset Traslate
    ctx.translate(-player[1][1]-player[1][0]/2,-player[1][2]-player[1][0]/2);
}, 1000/60);

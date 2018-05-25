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
// Set Player[N][0] = size
player[1][0] = 120;
// Set Player[N][1] = canvas position X
player[1][1] = (canvasSize/2);
// Set Player[N][2] = canvas position Y
player[1][2] = (canvasSize/2);
// Set Player[N][1] = position X
player[1][5] = -(player[1][0]/2);
// Set Player[N][2] = position Y
player[1][6] = -(player[1][0]/2);
// Set Player[N][3] = style
player[1][3] = 0;
// Set Player[N][4] = Rotation
player[1][4] = 0;
//Veriable to Bullets
var bullet = [];
// Veriable to store Mouse movement to get difference of change
var previousMouseX,previousMouseY = null;
// Veriables to track mouse movement on canvas
var offset, mouseX = 0, mouseY = 0;
// Mouse move on game canvas
document.onmousemove = function(e) {
    offset = gameCanvas.getBoundingClientRect(); 
    // Set mouse position on canavas
    mouseX = e.pageX - offset.left;
    mouseY = e.pageY - offset.top;
}
var movePlayer = true;
// on keypress
document.onkeydown = function(e) {
    if(movePlayer){
    e = e || window.event;
    // if this key is Space key
    if (e.keyCode == '32') {
        // Save current Degree
        currentDeg = (player[1][4]* Math.PI) / 180;
        // Prevent player to take next move
        movePlayer = false;
        setTimeout(function(){ 
            // Change Player Style
            player[1][3] = 100;   
            // Change Player canvas in diagonal line of degree
            player[1][2] += (Math.sin(currentDeg))*20;
            player[1][1] += (Math.cos(currentDeg))*20;
            setTimeout(function(){
                // Change Player Style
                player[1][3] = 200;
                // Change Player canvas in diagonal line of degree
                player[1][2] += (Math.sin(currentDeg))*20;
                player[1][1] += (Math.cos(currentDeg))*20;
                setTimeout(function(){
                    // Change Player Style
                    player[1][3] = 0;
                    // Change Player canvas in diagonal line of degree
                    player[1][2] += (Math.sin(currentDeg))*20;
                    player[1][1] += (Math.cos(currentDeg))*20; 
                    movePlayer = true;
                },150);
            },150); 
        },150);
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
}
// on click add new bullet to arrary for fire
document.onclick = function(e){
    //bullet width
    bw = 16;
    //bullet height
    bh = 8;
    //New Bullet number
    i = bullet.length;
    //set 2 dimation bullet array 
    bullet[i] = [];
    //bullet[N][0] is Rotation
    bullet[i][0] = player[1][4]; 
    //bullet[N][1] is canvas translation X
    bullet[i][1] = player[1][1]+player[1][5]+(player[1][0]/2);
    //bullet[N][2] is canvas translation Y
    bullet[i][2] = player[1][2]+player[1][6]+(player[1][0]/2);
    //bullet[N][3] is width
    bullet[i][3] = bw;
    //bullet[N][4] is Height
    bullet[i][4] = bh;
    //bullet[N][5] is Style
    bullet[i][5] = "#FFFF00";
    //bullet[N][6] is X postion of bullet inside of canvas
    bullet[i][6] = 50; 
    //bullet[N][7] is Y postion of bullet inside of canvas
    bullet[i][7] = 20;
}

// Refresh Game canvas at 60 fps
var gamePlay = setInterval(function(){ 
    // Clear Canvas
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasSize, canvasSize);              

    // Put player in canvas
    // Get radians by Anti Tan of X any Y side from player origin
    radians = Math.atan2(mouseX-player[1][1], mouseY-player[1][2]);
    // Change degree of player if movement allowed
    if(movePlayer){
        player[1][4] = Math.round((radians * (180 / Math.PI) * -1)+90);
    }
    // translate ctx to player's XY cordinates
    ctx.translate(player[1][1],player[1][2]);
    // Rotate ctx
    ctx.rotate((player[1][4]* Math.PI) / 180);
    // Player Image
    playerImg = el("#player");
    // Draw Player Image on canvas with offset pixels from player[1][3] and Size from player[1][0]
    ctx.drawImage(playerImg, player[1][3], 0, 100, 100, player[1][5], player[1][6], player[1][0], player[1][0]);
    // Reset Rotate
    ctx.rotate((-player[1][4] * Math.PI) / 180);
    // Reset Traslate
    ctx.translate(-player[1][1],-player[1][2]);

    // Print all bullets thats stored in arrey 
    for(i=0;i<bullet.length;i++){
        // fill Bullet Style
        ctx.fillStyle = bullet[i][5]; 
        // Translate cansvas to bullet position
        ctx.translate(bullet[i][1],bullet[i][2]);
        // rotate canvas 
        ctx.rotate((bullet[i][0] * Math.PI) / 180);
        // Fill bullet in canvas
        ctx.fillRect(bullet[i][6], bullet[i][7], bullet[i][3], bullet[i][4]);
        // reset rotate canvas 
        ctx.rotate((-bullet[i][0] * Math.PI) / 180);
        // reset translate canvas 
        ctx.translate(-bullet[i][1],-bullet[i][2]);
        // get current bullet degree
        currentBulletDeg = (bullet[i][0]* Math.PI) / 180;
        // Travel bullet X and Y axies of canvas on dignal line of dgree
        bullet[i][1] += (Math.cos(currentBulletDeg))*10;
        bullet[i][2] += (Math.sin(currentBulletDeg))*10;
        //delete bullet when it get out of canvas
        if(bullet[i][1] > canvasSize || bullet[i][2] > canvasSize ){
            bullet.splice(i,1);
        }
    }
    // print traget Circle
    tSize = 50;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, tSize/2, 0, 2 * Math.PI);
    ctx.stroke();

}, 1000/60);

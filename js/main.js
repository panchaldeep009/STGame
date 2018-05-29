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
// To generate Random Number 
function getRNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Set Globle Game Canvas veriable
var gameCanvas = el("#gameCanvas");
//Set Game canvas Size
canvasSize = minWinSize()-100;
gameCanvas.setAttribute("width", canvasSize);
gameCanvas.setAttribute("height", canvasSize);
// Veriable to store Players
var player = [];
// Veriable for Bullets
var bullet = [];
//Veriable for Villain
var villain = [];
// Veriable for how many players are playing
var players = 1; 
// Veriable for which player has Controll
var cplayer = 1;
// control allowance Status for player
var movePlayer = true;
// Veriables to store player looking cordinates
var look = [];
// initilize All Player
for(i=1;i<=players;i++){
    // initilize Player i
    player[i] = [];
    // Set Player[i][0] = size
    player[i][0] = 120;
    // Set Player[i][1] = canvas position X
    player[i][1] = (canvasSize/2)+((player[1][0]/2)*(i-1));
    // Set Player[i][2] = canvas position Y 
    player[i][2] = (canvasSize/2);
    // Set Player[i][1] = position X
    player[i][5] = -(player[1][0]/2);
    // Set Player[i][2] = position Y
    player[i][6] = -(player[1][0]/2);
    // Set Player[i][3] = style
    player[i][3] = 0;
    // Set Player[i][4] = Rotation
    player[i][4] = 0;
    //Set Bullets for player i
    bullet[i] = [];
    //Set looking direction for player i
    look[i] = [];
    //Set where player i looking on X axies 
    look[i][1] = canvasSize/2;
    //Set where player i looking on Y axies 
    look[i][2] = 0;
}
// Mouse move on game canvas
document.onmousemove = function(e) {
    offset = gameCanvas.getBoundingClientRect(); 
    // Set controlling player looking on mouse position on canavas
    look[cplayer][1] = e.pageX - offset.left;
    look[cplayer][2] = e.pageY - offset.top;
}
// on keypress
document.onkeydown = function(e) {
    if(movePlayer){
    e = e || window.event;
    // if this key is Space key
    if (e.keyCode == '32') {
        // Save current Degree
        currentDeg = (player[cplayer][4]* Math.PI) / 180;
        // Prevent player to take next move
        movePlayer = false;
        setTimeout(function(){ 
            // Change Player Style
            player[cplayer][3] = 100;   
            // Change Player canvas in diagonal line of degree
            player[cplayer][2] += (Math.sin(currentDeg))*20;
            player[cplayer][1] += (Math.cos(currentDeg))*20;
            setTimeout(function(){
                // Change Player Style
                player[cplayer][3] = 200;
                // Change Player canvas in diagonal line of degree
                player[cplayer][2] += (Math.sin(currentDeg))*20;
                player[cplayer][1] += (Math.cos(currentDeg))*20;
                setTimeout(function(){
                    // Change Player Style
                    player[cplayer][3] = 0;
                    // Change Player canvas in diagonal line of degree
                    player[cplayer][2] += (Math.sin(currentDeg))*20;
                    player[cplayer][1] += (Math.cos(currentDeg))*20; 
                    movePlayer = true;
                },150);
            },150); 
        },150);
    }
    }
}
// on click add new bullet to arrary
document.onclick = function(e){
    //bullet width
    bw = 16;
    //bullet height
    bh = 8;
    //New Bullet array number
    i = bullet[cplayer].length;
    //set 2 dimation bullet array 
    bullet[cplayer][i] = [];
    //bullet[N][0] is Rotation
    bullet[cplayer][i][0] = player[cplayer][4]; 
    //bullet[N][1] is canvas translation X
    bullet[cplayer][i][1] = player[cplayer][1]+player[cplayer][5]+(player[cplayer][0]/2);
    //bullet[N][2] is canvas translation Y
    bullet[cplayer][i][2] = player[cplayer][2]+player[cplayer][6]+(player[cplayer][0]/2);
    //bullet[N][3] is width
    bullet[cplayer][i][3] = bw;
    //bullet[N][4] is Height
    bullet[cplayer][i][4] = bh;
    //bullet[N][5] is Style
    bullet[cplayer][i][5] = "#FFFF00";
    //bullet[N][6] is X postion of bullet inside of canvas
    bullet[cplayer][i][6] = 50; 
    //bullet[N][7] is Y postion of bullet inside of canvas
    bullet[cplayer][i][7] = 20;
}

// Put Villain after each 2 secound
var villainComing = setInterval(function(){ 
    if(villain.length < 50){
        //New Bullet number
        i = villain.length;
        //set 2 dimation villain array 
        villain[i] = [];
        //villain[N][0] is Style                    
        villain[i][0] = 0;
        radomCase = getRNum(1,5);
            if(radomCase==1){
                //villain[N][1] is X position
                villain[i][1] = canvasSize; 
                //villain[N][2] is Y position
                villain[i][2] = getRNum(0,canvasSize);
            } else if(radomCase==2){
                //villain[N][1] is X position
                villain[i][1] = getRNum(0,canvasSize); 
                //villain[N][2] is Y position
                villain[i][2] = canvasSize;
            } else if(radomCase==3){
                //villain[N][1] is X position
                villain[i][1] = 0; 
                //villain[N][2] is Y position
                villain[i][2] = getRNum(0,canvasSize);
            } else {
                //villain[N][1] is X position
                villain[i][1] = getRNum(0,canvasSize); 
                //villain[N][2] is Y position
                villain[i][2] = 0;
            }
        //villain[N][3] is width
        villain[i][3] = 150;
        //villain[N][4] is height
        villain[i][4] = 150;
        //villain[N][5] is Rotattion
        villain[i][5] = 0;  
        //for villain Animation Frame change
        villain[i][6] = 0; 
    }
}, 2000);

 // Refresh Game canvas at 60 fps
var gamePlay = setInterval(function(){ 
    // Clear Canvas             
    clearGameCanvas(gameCanvas,canvasSize,canvasSize);

    // Print all Players and his Bullets 
    for(y=1;y<player.length;y++){
        // Print Player Y and reupdate changes
        player[y] = putPlayer(player[y],movePlayer,look[y][1],look[y][2],gameCanvas,canvasSize,canvasSize);
        // Print all bullets of Player[Y] thats stored in arrey 
        bullet[y] = putBullets(bullet[y],gameCanvas,canvasSize,canvasSize);
    }
    // Print all villain in Game Canvas
    villain = putVillains(villain,player,gameCanvas);

}, 1000/60);

// To clear game canvas : gc = Game Canvas, wC = width of Canvas, hC = Height of Canvas
function clearGameCanvas(gC,wC,hC){
    // Set Canvas to 2 Dimentional
    ctx = gC.getContext("2d");
    // Fill Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, wC, hC); 
}
// To put player in game canvas : ply = Player, mA = Movement allowance, lX = looking X position on canvas, lY = looking Y position on canvas, gc = Game Canvas, wC = width of Canvas, hC = Height of Canvas
function putPlayer(ply,mA,lX,lY,gC,wC,hC){
    // Set Canvas to 2 Dimentional
    ctx = gC.getContext("2d");

    // Get radians by Anti Tan of X any Y side from player origin
    radians = Math.atan2(lX-ply[1], lY-ply[2]);
    // Change degree of player if movement allowed
    if(mA){
        ply[4] = Math.round((radians * (180 / Math.PI) * -1)+90);
    }
    // translate ctx to player's XY cordinates
    ctx.translate(ply[1],ply[2]);
    // Rotate ctx
    ctx.rotate((ply[4]* Math.PI) / 180);
    // Player Image
    playerImg = el("#player");
    // Draw Player Image on canvas with offset pixels from ply[3] and Size from ply[0]
    ctx.drawImage(playerImg, ply[3], 0, 100, 100, ply[5], ply[6], ply[0], ply[0]);
    // Reset Rotate
    ctx.rotate((-ply[4] * Math.PI) / 180);
    // Reset Traslate
    ctx.translate(-ply[1],-ply[2]);

    // Keep Player in Game Canvas 
    if(ply[1] <= 0){
        // To stop player at minimum X
        ply[1] = 0;
    }
    if(ply[1] > wC){
        // To stop player at maximum X
        ply[1] = wC;
    }
    if(ply[2] <= 0){   
        // To stop player at minimum Y
        ply[2] = 0;
    }
    if(ply[2] > hC){
        // To stop player at maximum Y
        ply[2] = hC;
    }
    // to update current player data
    return ply;
}
// To move player where it looking
function movePlayer(ply){
    // Save current Degree
    currentDeg = (ply[4]* Math.PI) / 180;
    // Prevent player to take next move
    setTimeout(function(){ 
        // Change Player Style
        ply[3] = 100;   
        // Change Player canvas in diagonal line of degree
        ply[2] += (Math.sin(currentDeg))*20;
        ply[1] += (Math.cos(currentDeg))*20;
        setTimeout(function(){
            // Change Player Style
            ply[3] = 200;
            // Change Player canvas in diagonal line of degree
            ply[2] += (Math.sin(currentDeg))*20;
            ply[1] += (Math.cos(currentDeg))*20;
            setTimeout(function(){
                // Change Player Style
                ply[3] = 0;
                // Change Player canvas in diagonal line of degree
                ply[2] += (Math.sin(currentDeg))*20;
                ply[1] += (Math.cos(currentDeg))*20;
            },150);
        },150);
    },150);
}
// To put Bullets in game Canvas : bul = bullets, gc = Game Canvas, wC = width of Canvas, hC = Height of Canvas 
function putBullets(bul,gC,wC,hC){
    // Set Canvas to 2 Dimentional
    ctx = gC.getContext("2d");
    // Go throught all bullets
    for(i=0;i<bul.length;i++){
        // fill Bullet Style
        ctx.fillStyle = bul[i][5]; 
        // Translate cansvas to bullet position
        ctx.translate(bul[i][1],bul[i][2]);
        // rotate canvas 
        ctx.rotate((bul[i][0] * Math.PI) / 180);
        // Fill bullet in canvas
        ctx.fillRect(bul[i][6], bul[i][7], bul[i][3], bul[i][4]);
        // reset rotate canvas 
        ctx.rotate((-bul[i][0] * Math.PI) / 180);
        // reset translate canvas 
        ctx.translate(-bul[i][1],-bul[i][2]);
        // get current bullet degree
        currentBulletDeg = (bul[i][0]* Math.PI) / 180;
        // Travel bullet X and Y axies of canvas on dignal line of dgree
        bul[i][1] += (Math.cos(currentBulletDeg))*10;
        bul[i][2] += (Math.sin(currentBulletDeg))*10;
        //delete bullet when it get out of canvas
        if(bul[i][1] > wC || bul[i][2] > hC ){
            bul.splice(i,1);
        }
    }
    // to update current Bullet data
    return bul;
}
// To put Bullets in game Canvas : vil = Villain,  tPly = Target Player, gc = Game Canvas 
function putVillains(vil,tPly,gC){
    // Before Villain 
    // Print all villain
    for(i=0;i<vil.length;i++){
        // get Radian from target player by Anti Tan of that player
        radians = Math.atan2(tPly[1][1]-vil[i][1], tPly[1][2]-vil[i][2]);
        // store degree from Radian
        vil[i][5] = Math.round(radians * (180 / Math.PI) * -1);
        // Translate canvas to villain position
        ctx.translate(vil[i][1],vil[i][2]); 
        // Rotate canvans to villain degree                        
        ctx.rotate((vil[i][5] * Math.PI) / 180);
        // get villain img       
        villainImg = el("#villains");
        // Draw villain
        ctx.drawImage(villainImg, vil[i][0], 0, 150, 150, -vil[i][3]/2, -vil[i][4]/2, vil[i][3], vil[i][4]);
        // Reset Roatation
        ctx.rotate((-vil[i][5] * Math.PI) / 180);
        // Reset translate
        ctx.translate(-vil[i][1],-vil[i][2]);
        // Move Villain in direction of degree to follow target player
        vil[i][2] += (Math.cos(vil[i][5]))*0.5;
        vil[i][1] -= (Math.sin(vil[i][5]))*0.5; 
        
        // increment counter to dectect need of villain animation frame change 
        vil[i][6]++;
        // After +12 change current animation frame
        if(vil[i][6]%12==0){  
            if(vil[i][0] == 150) { vil[i][0] = 0; }
            else { vil[i][0] = 150; }
        }
    }    
    // to update current villain data
    return vil;
}
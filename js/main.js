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
// Set Global Game Canvas variable
var gameCanvas = el("#gameCanvas");
//Set Game canvas Size
canvasSize = minWinSize()-100;
gameCanvas.setAttribute("width", canvasSize);
gameCanvas.setAttribute("height", canvasSize);
// Variable to store Players
var player = [];
// Variable for Bullets
var bullet = [];
// Variable for Villain
var villain = [];
// killed villain counter per player
var killed_villain = [];
// Variable for how many players are playing
var players = 5; 
// Variable for which player has Control
var cplayer = 1;
// control allowance Status for player
var moveA = [];
// Fire allowance of players
var fireA = [];
// Variables to store player looking coordinates
var look = [];

// initialize All Player
for(i=1;i<=players;i++){
    // initialize Player i
    player[i] = [];
    // Set Player[i][0] = size
    player[i][0] = 120;
    // Set Player[i][1] = canvas position X
    player[i][1] = getRNum(0+250,canvasSize-250);
    // Set Player[i][2] = canvas position Y 
    player[i][2] = getRNum(0+250,canvasSize-250);
    // Set Player[i][1] = position X
    player[i][5] = -(player[1][0]/2);
    // Set Player[i][2] = position Y
    player[i][6] = -(player[1][0]/2);
    // Set Player Health 
    player[i][7] = 100;
    // Set Player[i][3] = style
    player[i][3] = 0;
    // Set Player[i][4] = Rotation
    player[i][4] = 0;
    //Set Bullets for player i
    bullet[i] = [];
    //Set looking direction for player i
    look[i] = [];
    //Set where player i looking on X axis 
    look[i][1] = canvasSize/2;
    //Set where player i looking on Y axis 
    look[i][2] = 0;
    fireA[i] = true
    moveA[i-1] = true;

    // Health Status
    el("#status").innerHTML += "<label>Health of Player "+i+" : <div class=\"healthBar\" id=\"health"+i+"\">100%</div></label>";

    // Set killed villain Counter for player i
    killed_villain[i] = 0;
    
    // killed villain Status
    el("#status").innerHTML += "<label>Killed villains by Player "+i+" : <div id=\"kvil"+i+"\">0</div></label><br/>";
}

// total killed villain Status
el("#status").innerHTML += "<label>Total Killed villains : <div id=\"tkvil\">0</div></label><br/>";

// Mouse move on game canvas
document.onmousemove = function(e) {
    offset = gameCanvas.getBoundingClientRect(); 
    // Set controlling player looking on mouse position on canvas
    look[cplayer][1] = e.pageX - offset.left;
    look[cplayer][2] = e.pageY - offset.top;
}
// on keypress
document.onkeydown = function(e) {
    if(moveA[0]){
    e = e || window.event;
    // if this key is Space key
    if (e.keyCode == '32') {
        // Save current Degree
        currentDeg = (player[cplayer][4]* Math.PI) / 180;
        // Prevent player to take next move
        moveA[0] = false;
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
                    moveA[0] = true;
                },150);
            },150); 
        },150);
    }
    }
}
// on click add new bullet to array
document.onclick = function(e){
    // Fire Bullet
    fireBullet(cplayer);
}

// Put Villain after each 2 second
var villainComing = setInterval(function(){ 
    if(totalVillainKilled(killed_villain) < 80*players){
        //New Bullet number
        i = villain.length;
        //set 2 dimensions villain array 
        villain[i] = [];
        //villain[N][0] is Style                    
        villain[i][0] = 0;
        randomCase = getRNum(1,5);
            if(randomCase==1){
                //villain[N][1] is X position
                villain[i][1] = canvasSize; 
                //villain[N][2] is Y position
                villain[i][2] = getRNum(0,canvasSize);
            } else if(randomCase==2){
                //villain[N][1] is X position
                villain[i][1] = getRNum(0,canvasSize); 
                //villain[N][2] is Y position
                villain[i][2] = canvasSize;
            } else if(randomCase==3){
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
        villain[i][3] = 120;
        //villain[N][4] is height
        villain[i][4] = 120;
        //villain[N][5] is Rotation
        villain[i][5] = 0;  
        //for villain Animation Frame change
        villain[i][6] = 0; 
    }
}, (400-totalVillainKilled(killed_villain))/players);

 // Refresh Game canvas at 60 fps
var gamePlay = setInterval(function(){ 
    // Clear Canvas             
    clearGameCanvas(gameCanvas,canvasSize,canvasSize);
    // counter for alive players
    alive_players = 0;
    // Print all Players and his Bullets 
    for(y=1;y<player.length;y++){
        //if player is alive
        if(player[y][7] > 0){
            // increment alive players counter
            alive_players ++;
            // Print Player Y and re-update changes
            player[y] = putPlayer(player[y],moveA[y-1],look[y][1],look[y][2],gameCanvas,canvasSize,canvasSize);
            // Print all bullets of Player[Y] thats stored in array 
            bullet[y] = putBullets(bullet[y],gameCanvas,canvasSize,canvasSize);
            if(y>1){
                autoPlayer(y);
            }
        }
    }
    // if all players alive
    if(alive_players > 0){
        // Print all villain in Game Canvas
        villain = putVillains(villain,player,bullet,gameCanvas,killed_villain);
    } else {
        //Game Over
    }

}, 1000/60);

// To clear game canvas : gc = Game Canvas, wC = width of Canvas, hC = Height of Canvas
function clearGameCanvas(gC,wC,hC){
    // Set Canvas to 2 dimensional
    ctx = gC.getContext("2d");
    // Fill Background
    ctx.fillStyle=ctx.createPattern(el("#background"),"repeat");
    ctx.fillRect(0, 0, wC, hC); 
}
// To put player in game canvas : ply = Player, mA = Movement allowance, lX = looking X position on canvas, lY = looking Y position on canvas, gc = Game Canvas, wC = width of Canvas, hC = Height of Canvas
function putPlayer(ply,mA,lX,lY,gC,wC,hC){
    // Set Canvas to 2 dimensional
    ctx = gC.getContext("2d");

    // Get radians by Anti Tan of X any Y side from player origin
    radians = Math.atan2(lX-ply[1], lY-ply[2]);
    // Change degree of player if movement allowed
    if(mA){
        ply[4] = Math.round((radians * (180 / Math.PI) * -1)+90);
    }
    // translate ctx to player's XY coordinates
    ctx.translate(ply[1],ply[2]);
    // Rotate ctx
    ctx.rotate((ply[4]* Math.PI) / 180);
    // Player Image
    playerImg = el("#player");
    // Draw Player Image on canvas with offset pixels from ply[3] and Size from ply[0]
    ctx.drawImage(playerImg, ply[3], 0, 100, 100, ply[5], ply[6], ply[0], ply[0]);
    // Reset Rotate
    ctx.rotate((-ply[4] * Math.PI) / 180);
    // Reset Translate
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
// To move player in looking direction
function movePly(p){
    if(moveA[p-1]){
        // Save current Degree
        currentDeg = (player[p][4]* Math.PI) / 180;
        // Prevent player to take next move
        moveA[p-1] = false;
        setTimeout(function(){ 
            // Change Player Style
            player[p][3] = 100;   
            // Change Player canvas in diagonal line of degree
            player[p][2] += (Math.sin(currentDeg))*20;
            player[p][1] += (Math.cos(currentDeg))*20;
            setTimeout(function(){
                // Change Player Style
                player[p][3] = 200;
                // Change Player canvas in diagonal line of degree
                player[p][2] += (Math.sin(currentDeg))*20;
                player[p][1] += (Math.cos(currentDeg))*20;
                setTimeout(function(){
                    // Change Player Style
                    player[p][3] = 0;
                    // Change Player canvas in diagonal line of degree
                    player[p][2] += (Math.sin(currentDeg))*20;
                    player[p][1] += (Math.cos(currentDeg))*20; 
                    moveA[p-1] = true;
                },150);
            },150); 
        },150);
    }
}
// To play auto player
function autoPlayer(p){
    // Set first Villain as target Villain if exist
    if(villain[p-1]){
        tempTgVill = villain[p-1];
        // Check Nearest Villain
        for(i=0;i<villain.length;i++){
            if((Math.sqrt((Math.abs(tempTgVill[1]-player[p][1])^2)+(Math.abs(tempTgVill[2]-player[p][2])^2)) > Math.sqrt(((Math.abs(villain[i][1]-player[p][1])^2)+(Math.abs(villain[i][2]-player[p][2])^2))))){
                tempTgVill = villain[i];
            }
        }
        look[y][1] = tempTgVill[1];
        look[y][2] = tempTgVill[2];
        if(Math.sqrt((Math.abs(tempTgVill[1]-player[p][1])^2)+(Math.abs(tempTgVill[1]-player[p][1])^2)) < 20){
            fireBullet(p);
        } else {
            movePly(p);
        }
    }
}
// To add Bullets of ply Player
function fireBullet(p){
    if(fireA[p]){
        fireA[p] = false;
        //bullet width
        bw = 16;
        //bullet height
        bh = 8;
        //New Bullet array number
        i = bullet[p].length;
        //set 2 dimensions bullet array 
        bullet[p][i] = [];
        //bullet[N][0] is Rotation
        bullet[p][i][0] = player[p][4]; 
        //bullet[N][1] is canvas translation X
        bullet[p][i][1] = player[p][1]+player[p][5]+(player[p][0]/2);
        //bullet[N][2] is canvas translation Y
        bullet[p][i][2] = player[p][2]+player[p][6]+(player[p][0]/2);
        //bullet[N][3] is width
        bullet[p][i][3] = bw;
        //bullet[N][4] is Height
        bullet[p][i][4] = bh;
        //bullet[N][5] is Style
        bullet[p][i][5] = "#FFFF00";
        //bullet[N][6] is X position of bullet inside of canvas
        bullet[p][i][6] = 50; 
        //bullet[N][7] is Y position of bullet inside of canvas
        bullet[p][i][7] = 20;
        new Audio('../sounds/bullet.wav').play();
        setTimeout(function(){ 
            fireA[p]  = true;
        }, 300);
    }
}
// To put Bullets in game Canvas : bul = bullets, gc = Game Canvas, wC = width of Canvas, hC = Height of Canvas 
function putBullets(bul,gC,wC,hC){
    // Set Canvas to 2 dimensional
    ctx = gC.getContext("2d");
    // Go through all bullets
    for(i=0;i<bul.length;i++){
        // Translate canvas to bullet position
        ctx.translate(bul[i][1],bul[i][2]);
        // rotate canvas 
        ctx.rotate((bul[i][0] * Math.PI) / 180);
        // get bullet img       
        bulletImg = el("#bullet");
        // Draw bullet
        ctx.drawImage(bulletImg, bul[i][6], bul[i][7], bul[i][3], bul[i][4]);
        // reset rotate canvas 
        ctx.rotate((-bul[i][0] * Math.PI) / 180);
        // reset translate canvas 
        ctx.translate(-bul[i][1],-bul[i][2]);
        // get current bullet degree
        currentBulletDeg = (bul[i][0]* Math.PI) / 180;
        // Travel bullet X and Y axis of canvas on diagonal line of degree
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
// To put Bullets in game Canvas : vil = Villain,  Ply = Players, bull = Bullets , gc = Game Canvas, kvil = killed villain
function putVillains(vil,Ply,bul,gC,kvil){
    // Print all villain
    for(i=0;i<vil.length;i++){
        // Before Print Villain, kill them if they catch bullet
        // Check each Bullets by players
        for(p=1;p<Ply.length;p++){
            //each bullets of Player P
            for(y=0;y<bul[p].length;y++){
                
                if(vil[i]){
                    // if bullet on the villain then kill it
                    if(near(vil[i][1],vil[i][2],bul[p][y][1],bul[p][y][2],vil[i][3]/2)){
                        // Delete Bullet
                        bul[p].splice(y,1);
                        // Kill Villain update villain array
                        vil = killVillain(vil,i);
                        // Increment Killed Villain counter for player p and Update status
                        el("#kvil"+p).innerHTML = ++kvil[p];
                        el("#tkvil").innerHTML = totalVillainKilled(kvil);
                    }
                }
            }
            // check if villain is near to player
            if(vil[i]){
                // if player is near to villain then get hurt
                if(near(vil[i][1],vil[i][2],Ply[p][1],Ply[p][2],vil[i][3]/2)){
                    //if Health is more then 0 then update status
                    if(Ply[p][7] > 0){
                        updateHealth(p, --Ply[p][7]);
                    } else {
                        //Kill Player if it's health get zero
                        el("#health"+p).innerHTML = "Player Killed";
                    }
                }
            }
        }
        // Set first player as target player
        tgPly = Ply[1];
        // Find nearest target player using pythagoras 
        for(p=1;p<Ply.length;p++){
            // if player is alive 
            if(Ply[p][7] > 0){
                if(vil[i]){
                    if(Math.sqrt((Math.abs(tgPly[1]-vil[i][1])^2)+(Math.abs(tgPly[1]-vil[i][1])^2)) > Math.sqrt(((Math.abs(Ply[p][1]-vil[i][1])^2)+(Math.abs(Ply[p][1]-vil[i][1])^2)))){
                        tgPly = Ply[p];
                    }
                }
            }
        }
        
        if(vil[i]){
            // get Radian from target player by Anti Tan of that player
            radians = Math.atan2(tgPly[1]-vil[i][1], tgPly[2]-vil[i][2]);
            // store degree from Radian
            vil[i][5] = Math.round(radians * (180 / Math.PI) * -1);
            // Translate canvas to villain position
            ctx.translate(vil[i][1],vil[i][2]); 
            // Rotate canvas to villain degree                        
            ctx.rotate((vil[i][5] * Math.PI) / 180);
            // get villain img       
            villainImg = el("#villains");
            // Draw villain
            ctx.drawImage(villainImg, vil[i][0], 0, 150, 150, -vil[i][3]/2, -vil[i][4]/2, vil[i][3], vil[i][4]);
            // Reset Rotation
            ctx.rotate((-vil[i][5] * Math.PI) / 180);
            // Reset translate
            ctx.translate(-vil[i][1],-vil[i][2]);
            // Move Villain in direction of degree to follow target player
            vil[i][2] += (Math.cos(vil[i][5]))*0.5;
            vil[i][1] -= (Math.sin(vil[i][5]))*0.5; 
            
            // increment counter to detect need of villain animation frame change 
            vil[i][6]++;
            // After +12 change current animation frame
            if(vil[i][6]%12==0){  
                if(vil[i][0] == 150) { vil[i][0] = 0; }
                else { vil[i][0] = 150; }
            }
        }
    }    
    // to update current villain data
    return vil;
}
// To Kill Villain : vill = Villain Array, n = number of that array
function killVillain(vil,n){
    //Delete Villain from array
    vil.splice(n,1);
    // to update current villain data
    return vil;
}
// Return total killed Villain
function totalVillainKilled(kvil){
    total = 0;
    for(i=1;i<kvil.length;i++){
        total += kvil[i];
    }
    return total;
}
//Chnage Health
function updateHealth(i,v){
    el("#health"+i).innerHTML = v+"%";
    el("#health"+i).style.width = (v*2)+"px";
    if(v > 66){
        el("#health"+i).style.backgroundColor = "green";
        el("#health"+i).style.color = "white";
    } else if(v < 66 && v > 33){
        el("#health"+i).style.backgroundColor = "yellow";
        el("#health"+i).style.color = "black";
    } else if(v < 33){
        el("#health"+i).style.backgroundColor = "red";
        el("#health"+i).style.color = "white";
    }
    if(v == 0){
        el("#health"+i).style.width = "200px";
    }
}
// To Check if this near to each other then return true 
function near(x1,y1,x2,y2,diff){
    if(Math.abs(x1-x2)<=diff
        && Math.abs(y1-y2)<=diff){
            return true;
        } else {
            return false;
        }
}
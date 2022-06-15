let message = ["Welcome  to  TicTacToe Game", "Want to play this game", "Select the mode and", "enter your names"]
let rules=[ "Now You Can Start Playing","Your name will be ", "highlighted when it's your turn.","click in any section to mark","it by either X or O",];

let messageEle = document.getElementById("message");
let i = 0, n = 4;
let welcome=true,displayRules=false;
let player1="SHADOW",player2="KING";

// hidding the initial setup so that it can be displayed according to user action
let Player1=document.getElementById("Player1");
let Player2=document.getElementById("Player2");
let enterName=document.getElementById("enter-name");
let headerOfGame=document.getElementById("header");
let boxlist=document.querySelectorAll(".box");
let gameController=document.getElementById("game-controller");
let mode=document.getElementById("Mode");

Player1.classList.add("hidden");
Player2.classList.add("hidden");
enterName.classList.add("hidden");
headerOfGame.classList.add("hidden");
gameController.classList.add("invisible");

for(let i=0;i<boxlist.length;i++){
    boxlist[i].classList.add("invisible");
}

//for displaying the message
let welMess=setInterval(() => {
    if(welcome){
        displayPara(message[i % n]);
        i++;
    }
}, 3500);

// for displaying any para with writing effect 
let paraDisplayer;
function displayPara(s){
    messageEle.textContent="~  ";
    let i=0,n;
    n=s.length;
    paraDisplayer=setInterval(() => {
        if(i<n){
            messageEle.textContent+=s[i];
            i++;
        }
    }, 80);
    // console.log("displayPara is called");
}

//this is for mode selector
function modeSelector(){
    welcome=false;
    clearInterval(paraDisplayer);
    clearInterval(welMess);
    playBgMusic();
    if(mode.value==="computer"){
        displayPara("So you want to play ALONE");
        Player1.classList.remove("hidden");
        Player1.classList.add("resetDisplay");
        document.getElementById("enter-name").classList.add("resetDisplay");
        document.getElementById("modeSection").innerHTML=`
        <div class="theme4">MODE: COMPUTER</div>
        `;
    }
    else if(mode.value==="friend"){
        displayPara("So you have GAME PARTNER!"); 
        Player1.classList.remove("hidden");
        Player1.classList.add("resetDisplay");
        Player2.classList.remove("hidden");
        Player2.classList.add("resetDisplay");
        document.getElementById("enter-name").classList.add("resetDisplay");
        document.getElementById("modeSection").innerHTML=`
        <div class="theme4">MODE: Multiplayer</div>
        `;
    }
}

// this is for saving the name of player 
let x,y;
function saveName(){
    headerOfGame.classList.remove("hidden");
    headerOfGame.classList.add("resetDisplay");

    // input taker of names should be hidden 
    Player1.classList.add("hidden");
    Player1.classList.remove("resetDisplay");
    Player2.classList.add("hidden");
    Player2.classList.remove("resetDisplay");
    document.getElementById("enter-name").classList.remove("resetDisplay");
    document.getElementById("enter-name").classList.add("hidden");    

    x=document.getElementById("player1").value
    y=document.getElementById("player2").value
    if(x){
        document.getElementById("name1").textContent+=" "+x;
    }
    else{
        x="King";
        document.getElementById("name1").textContent+=" "+x;
    }
    if(y){
        document.getElementById("name2").textContent+=" "+y;
    }
    else{
        y="Shadow";
        document.getElementById("name2").textContent+=" "+y;
    }
    renderGame();
}

let gameRules;
function renderGame(){
    // want to display the instruction to the user
    let j=0;
    clearInterval(paraDisplayer);
    gameRules=setInterval(() => {
        displayPara(rules[j%5]);
        j++;
    }, 3000);

    //game container restoring 
    for(let i=0;i<boxlist.length;i++){
        boxlist[i].classList.remove("invisible");
        boxlist[i].classList.add("resetDisplay");
    }
    gameController.classList.remove("invisible");
    gameController.classList.add("resetDisplay");
}

//game logic
//   in one move player can mark only one block. so that means if he hasclicked then he cannot change it . and he can only mark at empty place. if all blocks gets fulled then he can only restart the game and result should be displayed in message.
let prevMarked=0,count=0,won=false,isTie=false;
let marked=[0,1,1,1,1,1,1,1,1,1];
let arr=[[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
function mark(x){
    playMusic(clickMusic);
    if(!won && !isTie){        
        let mrk;
        if(count%2===0){mrk="X"}
        else mrk="O";
        if(marked[x]==1){
            let str="box-"+x;
            document.getElementById(str).textContent=mrk;
            highlightCurrnetPlayer(count%2);
            marked[x]=mrk;
            count++;
            won=hasWon();    
        }
    } 
}

function highlightCurrnetPlayer(num){
    let ind=2-num;
    document.getElementById("name"+ind).classList.add("active");
    if(num==1){
        document.getElementById("name2").classList.remove("active");        
    }
    else{
        document.getElementById("name1").classList.remove("active");
    }
}
let clearHighlighter;
function winnerHightlighter(i1,i2,i3){
    let ctr=0;
    let highly=setInterval(() => {
        if(ctr%2==0){
            let st="box-"+i1;
            document.getElementById(st).classList.add("winner");
            st="box-"+i2;
            document.getElementById(st).classList.add("winner");
            st="box-"+i3;
            document.getElementById(st).classList.add("winner");
        }
        else{
            st="box-"+i1;
            document.getElementById(st).classList.remove("winner");
            st="box-"+i2;
            document.getElementById(st).classList.remove("winner");
            st="box-"+i3;
            document.getElementById(st).classList.remove("winner");
        }
        ctr++; 
    }, 200);

    // for removing the blinking effect 
    clearHighlighter=setTimeout(() => {
        clearInterval(highly);
        st="box-"+i1;
        document.getElementById(st).classList.remove("winner");
        st="box-"+i2;
        document.getElementById(st).classList.remove("winner");
        st="box-"+i3;
        document.getElementById(st).classList.remove("winner");
    }, 3000);
}

function hasWon(){
    for (let i = 0; i < arr.length; i++) {
        const com= arr[i];
        if(marked[com[0]]==='X' || marked[com[0]]==='O'){
            if(marked[com[0]]===marked[com[1]] && marked[com[0]]===marked[com[2]]){
                let winner;
                if(marked[com[0]]==="X"){
                    winner=x;
                }
                else{
                    winner=y;
                }
                winnerHightlighter(com[0],com[1],com[2]);
                clearInterval(gameRules);
                clearInterval(paraDisplayer);
                displayPara(`Wohoo! ${winner} is winner`);
                playMusic(victoryMusic);
                pauseMusic(bgMusic);
                setTimeout(() => {
                    playBgMusic();
                    pauseMusic(victoryMusic);
                }, 11000);
                return true;
            }
        }
    }
    if(count===9){
        isTie=true;
        clearInterval(gameRules);
        clearInterval(paraDisplayer);
        playMusic(drawMusic);
        pauseMusic(bgMusic);
        setTimeout(() => {
            playBgMusic();
            pauseMusic(drawMusic);
        }, 8000);
        displayPara(`This match is tied!`);
        return true;
    }
    return false;
}

function restart(){
   count=0;
   marked=[0,1,1,1,1,1,1,1,1,1];
   isTie=false;
   won=false;
   highlightCurrnetPlayer(1);
   for(let i=1;i<=9;i++){
        document.getElementById("box-"+i).textContent=""; 
   }
   pauseMusic(victoryMusic);
   pauseMusic(drawMusic)
   playBgMusic();

   let j=0;
   clearInterval(paraDisplayer);
   gameRules=setInterval(() => {
       displayPara(rules[j%5]);
       j++;
   }, 3000);
}



// this is for background music and sound on click 
let bgMusic = new Audio("bg.mp3");
let clickMusic=new Audio("btnClickSound2.mp3");
let victoryMusic=new Audio("victorySound.wav");
let drawMusic=new Audio("drawSound.mp3")
let bg="enabled";
function playBgMusic(){
    if(bg==="enabled")
    bgMusic.play();
    bgMusic.loop = true;
}

function playMusic(muZik){
    muZik.play();
}
function pauseMusic(muzic){
    muzic.pause();
}
function stopbg(){
    if(bg==="enabled"){
        bg="disabled";
        pauseMusic(bgMusic);
        document.getElementById("startGame").innerText="Play Music";
    }
    else{
        bg="enabled";
        playBgMusic();
        document.getElementById("startGame").innerText="Stop Music";
    }
}
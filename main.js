const TicTac=function(playerName,playerSign,currentPlayer,color,combination=[]){
    this.playerName=playerName;
    this.playerSign=playerSign;
    this.currentPlayer=currentPlayer;
    this.combination=combination;
    this.color=color;
}

let gameOver=true;
const resetGame= document.getElementById('reset');
const gameStatus = document.querySelector('.game-status');
const player1=new TicTac('Player 1','X',true,'red');
const player2 = new TicTac('Player 2','O',false,'blue');
console.log(player1.playerSign);
// Winner Combinations 
const winnerCombinations=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

// Push every id to array to checked has player win the game
let playedComb=[];

// Created add event Listener for div 
const boxes= document.querySelectorAll('.box');

if(gameOver==true){

boxes.forEach(box=>{
    box.addEventListener('click',(e)=>{
        // get id of div
        const dot =Number(e.target.id.slice(4));
        // to prevent clone same value;
        console.log(isPlayed(dot));
        if(isPlayed(dot)){
            idAdder(dot);
            console.log(player1,player2);
            console.log(playedComb);
            divColorChange(e);
            playerChanger();
        };
        //  is game over?
         isGameOver(player1);
         isGameOver(player2);
        }
    )
    });
}
// Game over check function
const isGameOver=function(player){
    winnerCombinations.forEach(comb=>{
        if(comb.every(item=>player.combination.includes(item))){   
            gameStatus.innerHTML=`${player.playerName} won the game!`  
            gameOver=false;  
        };
    })
}

// To prevent pushing same number
const isPlayed = function(value){
    if(playedComb.includes(value)){
       return false;
    }else{
        return true;
    }
}

// Push value to user arrays
const idAdder=function(id){
    if(player1.currentPlayer){
        console.log(player1.combination);
        player1.combination.push(id);
        playedComb.push(id);
        
    }
    else{
        console.log('player 2 played');
        
        player2.combination.push(id);
        playedComb.push(id);
        console.log(player2.combination);
        


    }
}

// To change active player;
const playerChanger = function(){
    if(player1.currentPlayer==true){
        player1.currentPlayer=false;
        player2.currentPlayer=true;
    }else{
        player1.currentPlayer=true;
        player2.currentPlayer=false;
    }
}

resetGame.addEventListener('click',()=>{
    player1.currentPlayer=true;
    player2.currentPlayer=false;
    player1.combination=[];
    player2.combination=[];
    console.log(player1.currentPlayer,player2.currentPlayer,player1.combination,player2.combination)
    boxes.forEach(box=>{
        box.innerHTML='';
        box.classList.remove('red');
        box.classList.remove('blue');
        playedComb=[];
        
    })
    gameStatus.innerHTML='';
    gameOver=true;
})


const divColorChange = function(e){
   if(gameOver){
    if(player1.currentPlayer){
        document.getElementById(`${e.target.id}`).classList.add(`red`);
        document.getElementById(`${e.target.id}`).innerHTML=`${player1.playerSign}`;

    }else{

        document.getElementById(`${e.target.id}`).classList.add(`blue`);
        document.getElementById(`${e.target.id}`).innerHTML=`${player2.playerSign}`;


    }
   }
    
}
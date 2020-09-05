var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);



function ageDay(){
    var birthyear = prompt('Yo! Whats your birth year nigga?' );
    var num = (2020-birthyear)*365;
    var h1 = document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+num+' days old...');
   // textAnswer.style.color= 'blue';
    h1.setAttribute('id','ageDay');
    h1.appendChild(textAnswer);
    document.getElementById('box-result').appendChild(h1);
    console.log(num);
    
}
function reset(){
    document.getElementById('ageDay').remove();
}

function generateClone(){
    var image = document.createElement('img');
    var div = document.getElementById('cloneGen');
    image.src="https://media4.giphy.com/media/29CAO4euTSe9q/giphy.gif?cid=ecf05e47707e14428e9dab97e045c86c406c237ba5e93ea4&rid=giphy.gif";
    image.style.height = '200px';
    image.style.width = '320px';
    div.appendChild(image);
}
function resetEnd(){
    document.getElementById('cloneGen').remove();
    var image = document.createElement('img');
    var div = document.getElementById('ResetcloneGen');
    image.src="https://media2.giphy.com/media/4NuAILyDbmD16/giphy.gif?cid=ecf05e47db89e2d8a5d1ffc3b5ffdd1f12264573572c2e5d&rid=giphy.gif";
    image.style.height = '200px';
    image.style.width = '320px';
    div.appendChild(image);
    
}

//Challange 3:
function rpsGame(yourChoice){
    console.log(yourChoice)
    var humanCh,botCh;
    humanCh=yourChoice.id;
    
    botCh=numberToChoice(randtoRpsInt());
    console.log('Computer choice',botCh);
    
    results=decideWinner(humanCh,botCh);
    console.log(results);

    message = finalMessage(results);
    console.log(message);

    rpsFrontEnd(yourChoice.id,botCh,message);


}
function randtoRpsInt(){
    return Math.floor(Math.random()*3);
}
function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}
function decideWinner(yourChoice,computerChoice){
    var rpsData={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    };
    var yourScore= rpsData[yourChoice][computerChoice];
    var computerScore= rpsData[computerChoice][yourChoice];
    return [yourScore,computerScore];
}
function finalMessage([yourScore,computerScore]){
    if(yourScore==0){
        return{'message':'You Lost!!','color':'red'}
    }else if(yourScore==0.5){
        return{'message':'You Tied!!','color':'yellow'}
    }else{
        return{'message':'You WON!!','color':'green'}
    }
}
function rpsFrontEnd(humanImgChoice,botImageChoice,finalMessage){
var imageDatabase={
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src
    };
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv= document.createElement('div');
    var botDiv= document.createElement('div');
    var msgDiv= document.createElement('div');


    humanDiv.innerHTML="<img src='" +imageDatabase[humanImgChoice] +"' height=150 width=150 style='box-shadow: 1px 10px 30px rgb(63, 26, 197);'>"
    msgDiv.innerHTML="<h1 style ='color: "+ finalMessage['color']+ "; font-size: 60px; padding 30px;'>"+finalMessage['message']+ "</h1>"
    botDiv.innerHTML="<img src='" +imageDatabase[botImageChoice] +"' height=150 width=150 style='box-shadow: 1px 10px 30px rgb(243, 33, 24);'>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(msgDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
function reset() {
    location.reload();
  }
//Challange 4:
var allButtons=document.getElementsByTagName('button');

var copyallButton=[];
for(let i=0;i<allButtons.length;i++){
    copyallButton.push(allButtons[i].classList[1]);
}
console.log(copyallButton);
function buttonColorChange(buttColor){
    if(buttColor.value=='red'){
        buttonsRed();
    }else if(buttColor.value=='green'){
        buttonsGreen();
    }else if(buttColor.value=='reset'){
        buttonsReset();
    }else if(buttColor.value=='random'){
        buttonsRandom();
    }

}

function buttonsRed(){
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-danger');
    }
}
function buttonsGreen(){
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-success');
    }
}
function buttonsReset(){
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(copyallButton[i]);
    }
}
function buttonsRandom(){
    let pick=['btn-primary','btn-danger','btn-success','btn-warning','btn-info','btn-link'];

    for(let i=0;i<allButtons.length;i++){
        let randNo= Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(pick[randNo]);
    }
}
//challange 5

let blackjackGame={
    'you':{'scoreSpan':'#your-black-jack-result','div': '#yourbox','score':0},
    'dealer':{'scoreSpan':'#dealer-black-jack-result','div': '#dealerbox','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,10]},
    'wins' : 0,
    'losses': 0,
    'draws' : 0,
    'isStand': false,
    'turnOver': false,
    'hitStand': false,

};
const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']

const hitSound= new Audio('DemoPro/sounds/swish.m4a');
const winSound= new Audio('DemoPro/sounds/cash.mp3');
const lossSound= new Audio('DemoPro/sounds/aww.mp3');

document.querySelector('#blackjack-hit-btn').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-btn').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-btn').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand']===false){
        let card=randCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
    
}

function randCard(){
    let randCard= Math.floor(Math.random()*13);
    return blackjackGame['cards'][randCard];
}

function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src=`DemoPro/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function blackjackDeal(){
    if(blackjackGame['turnOver']===true){

        blackjackGame['hitStand']=false;
        blackjackGame['isStand']=false;

        let yourImages=document.querySelector('#yourbox').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealerbox').querySelectorAll('img');
        
        for(let i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(let i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
    
        YOU['score']=0;
        DEALER['score']=0;
    
        document.querySelector('#your-black-jack-result').textContent=0;
        document.querySelector('#dealer-black-jack-result').textContent=0;
        
        document.querySelector('#your-black-jack-result').style.color='#ffffff';
        document.querySelector('#dealer-black-jack-result').style.color='#ffffff';
    
        document.querySelector('#blackjack-result').textContent = "PLAY Again!";
        document.querySelector('#blackjack-result').style.color = 'black';
        
        blackjackGame['turnOver']=true;
    
    }
    

}

function updateScore(card,activePlayer) {
    if(card==='A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score']+=blackjackGame['cardsMap'][card];
    }
}
   
function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUSTED!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
    
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    if(blackjackGame['hitStand']===false){

        blackjackGame['isStand'] = true;
        blackjackGame['hitStand']=true;

        while(DEALER['score'] < 16 && blackjackGame['isStand']===true){
            let card = randCard();
            showCard(card, DEALER);
            updateScore(card,DEALER);
            showScore(DEALER);
            await sleep(1000);
      
    }   
        blackjackGame['turnOver']=true;
        let winner=computeWinner();
        showResult(winner);
    
    }
    
      

}

//BOT FINDS OUT WHO IS THE WINNER!?

function computeWinner(){
    let winner;
    //YOU win or Dealer BUST
    if(YOU['score'] <= 21){
        if((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner=YOU;
        }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
        //YOU BUST bt DEALER doesnt
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21 ){
        blackjackGame['losses']++;
        winner=DEALER;

    //YOU BUST & DEALER BUST
    }else if(YOU['score'] >21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message,messageColor;

    if(blackjackGame['turnOver']===true){
       
        if(winner===YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Win!';
            messageColor = 'violet';
            winSound.play();
        }else if(winner===DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        
    }
    
}
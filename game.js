

//ARRAY OF USER COLOUR PATTERN
var userChosenPattern = [];

//ARRAY OF RANDOM GAME PATTERN
var gamePattern = [] ;

//ARRAY COLOUR
var buttonColours = ["red","green","blue","yellow"];

//GAME LEVEL
var level = 0;
var started = false;

//FOR ADDING NEW COLOUR, BLINK AND SOUND TO THE EXISTING COLOUR PATTERN
//GAME LEVEL INCREMENTED
function nextSequence()
{
  var randomNumber = (Math.floor(Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  colourSound(randomChosenColour);
  level++;
  $("h1").text("LEVEL " + level); 
}

//EXCUTE nextsequence() WHEN ANY KEY ID PRESSED
$(document).keypress(function(){
    if(!started)
    nextSequence();   
});

// TO STORE , MAKE SOUND AND ANIMATE THE BUTTON THAT USER PRESSED
$(".btn").click(clickFunction);


function clickFunction(){
    var currentColour = this.id;
    userChosenPattern.push(currentColour);
    colourSound(currentColour);
    animatePress(currentColour);
    checkAnswer(userChosenPattern.length - 1);
   
} 
// PRESSED BUTTON ANIMATE FUNCTION
function animatePress(currentColourPressed)
{
    $("#" + currentColourPressed).addClass("pressed");
    setTimeout(function(){$("#" + currentColourPressed).removeClass("pressed");},100);
}

function checkAnswer(currentLevel)
 {
    
   if(userChosenPattern[currentLevel]  != gamePattern[currentLevel])
    {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();   
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");});
        $("h1").text("Game Over,Press Any Key to restart");
        gameOver();
    }
    
   else if(userChosenPattern.length === gamePattern.length)
       {
           while(userChosenPattern.length > 0) userChosenPattern.pop();
           var temp = setTimeout(nextSequence,1000);
       }    
 }

 function gameOver(){
    level = 0;
    while(userChosenPattern.length > 0) userChosenPattern.pop();
    while(gamePattern.length > 0) gamePattern.pop();
    started = false;
 }

// TO PLAY THE SOUND W.R.T. NEW COLOUR
function colourSound(colour){
       switch(colour)
       {
            case "red":
                var redSound = new Audio("sounds/red.mp3");
                redSound.play();
            break;
            
            case "green":
                var greenSound = new Audio("sounds/green.mp3");
                greenSound.play();
            break;

            case "blue":
                var blueSound = new Audio("sounds/blue.mp3");
                blueSound.play();
            break;

            case "yellow":
                var yellowSound = new Audio("sounds/yellow.mp3");
                yellowSound.play();
            break;
       }
}

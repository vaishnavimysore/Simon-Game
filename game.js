var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;

$(document).keypress(function(){

if(startGame === false){
  $("#level-title").text("Level "+ level);
  nextSequence();
  startGame = true;
}

});


$(".btn").click(function(){
var userChosenColor = this.id;
userClickedPattern.push(userChosenColor);
checkAnswer(userClickedPattern.length-1);
playSound(userChosenColor);
animatePress(userChosenColor);
});


/*Function creating the next color sequence*/
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(25).fadeIn();
  playSound(randomChosenColor);


}

function playSound(name){
var audioLoc = 'sounds/' + name + '.mp3';
var buttonSound = new Audio(audioLoc);
buttonSound.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
$("#"+currentColor).removeClass("pressed");},50);
}

function checkAnswer(currentLevel){

if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
{
  console.log("Success");
  if(userClickedPattern.length === gamePattern.length)
  {
  setTimeout(function(){
    nextSequence();
  },1000);

  }
}
else
{
  console.log("Wrong");
  var wrongSound = new Audio('sounds/wrong.mp3');
  wrongSound.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

function startOver()
{
  level = 0;
  gamePattern = [];
  startGame = false;
}

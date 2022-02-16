const buttonColours = ["red", "blue","green","yellow"];
var gamePattern = [];
var userClickedPattern= [];
var started = false;
var level= 0;
//Genertating Seq
function nextSequence(){
  userClickedPattern = [];
  var randomNumber= Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);

}

//User clicks button
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  //console.log(userClickedPattern);
})

// Function for playing sound
function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

//Animation to user clicks
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
  checkAnswer(userClickedPattern.length-1);
}

// Starting the game
$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);// Changes title from Default to level 0
    nextSequence();
    started = true;
  }
})

//core logic
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      var wrong = new Audio("sounds/wrong.mp3"); wrong.play();
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      },150);
      startOver();
      console.log("wrong");
    }
}

//restarting
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

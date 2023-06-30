var colors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPatern = [];

var started = false;
var level = 0;

$(document).on("keypress",function(){
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPatern.push(userChosenColor);
    console.log(userClickedPatern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPatern.length-1);

})

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function nextSequence(){
    level++;
    userClickedPatern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3)+1;
    var randomColor = colors[randomNumber]
    gamePattern.push(randomColor);


    $("#"+randomColor).fadeOut(250).fadeIn(250);
    console.log(randomColor);
    playSound(randomColor);
  


    
}
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPatern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPatern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over"); }, 200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
  
      }



}
function startOver() {
    console.log("Game-Over");
    setTimeout(function(){console.clear();},1000)

    level = 0;
    gamePattern = [];
    started = false;
}

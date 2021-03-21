// Global letiables---//
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let clicks = 0;
//----//

document.addEventListener('keydown', function(event) {
  if (started == false && event.code == 'KeyA') {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * Math.floor(4));
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  //
  $('#level-title').text("level " + level);
  level = level + 1;
};

$(".btn").click(function() {
  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //
  clicks++;
  checker();
});

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
};

function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}

function checker() {
  if (clicks == gamePattern.length && gamePattern[clicks - 1] == userClickedPattern[clicks - 1]) {
    clicks = 0;
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence()
    }, 1000);
  } else if (gamePattern[clicks - 1] !== userClickedPattern[clicks - 1]) {
    gamePattern = [];
    //
    $('body').addClass("game-over");
    setTimeout(function() {
      $('body').removeClass("game-over");
    }, 200);
    //
    playSound('wrong')
    //
    userClickedPattern = [];
    started = false;
    level = 0;
    clicks = 0;
    $('#level-title').text('Game Over, Press A Key to Restart');
  } else {
    console.log(clicks);
  }
}

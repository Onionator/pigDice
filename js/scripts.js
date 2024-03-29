function Game() {
  this.players = [],
  this.currentPlayer = 0;
  this.id = 0;
}

function Player(name) {
  this.name = name,
  this.score = 0,
  this.unbankedScore = 0,
  this.currentDieRoll = 0,
  this.playerId = currentGame.id,
  currentGame.id += 1;
}

//this function was brought to you in part by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber() {
  //returns a random number between 1 and 7 including 1 but not 7
  return parseInt(Math.random() * (7 - 1) + 1);
}

// this adds the random number to the unbanked score of the current player or
// resets unbanked score if its a 1

Player.prototype.rollDie = function () {
  var num = getRandomNumber();
  if (num !== 1) {
    currentGame.players[currentGame.currentPlayer].unbankedScore += num;
  } else {
    currentGame.players[currentGame.currentPlayer].unbankedScore = 0;
    currentGame.players[currentGame.currentPlayer].passDie();
  }

  this.currentDieRoll = num;
};

//makes it the other player's turn
Player.prototype.passDie = function () {
  var x = this.playerId;

  this.score += this.unbankedScore;

  //  If the id + 1 is equivalent to the length of the array then we are at the
  // end of the array and need to go to the beginning

  this.unbankedScore = 0;
  if (this.score >= 100) {
    console.log(this.name + ' WINS all the FISH!');
    $('#winner').text(this.name + ' WINS all the FISH!');
  } else if (x + 1 === currentGame.players.length) {
    currentGame.currentPlayer = 0;
  } else {
    currentGame.currentPlayer = this.playerId + 1;
  }

  $('#winner').text('It is now player' + (x + 1) + '\'s turn.');
};

Player.prototype.output = function () {
  $('#playerName').text(this.name);
  $('#numberRolled').text(this.currentDieRoll);
  $('#totalUnbanked').text(this.unbankedScore);
  $('#gameScore').text(this.score);

};

var currentGame = new Game();

//Begins User Interface Logic Section

$(document).ready(function () {
  $('#formNewPlayer').submit(function (event) {
    event.preventDefault();
    var newPlayerName = $('#userName').val();
    var player = new Player(newPlayerName);
    currentGame.players.push(player);
    $('h2').append(' ' + newPlayerName);
    $('#userName').val('');
  });

  $('#rolly').click(function () {
    currentGame.players[currentGame.currentPlayer].rollDie();
    currentGame.players[currentGame.currentPlayer].output();
  });

  $('#pass').click(function () {
    currentGame.players[currentGame.currentPlayer].passDie();
    currentGame.players[currentGame.currentPlayer].output();
  });
});

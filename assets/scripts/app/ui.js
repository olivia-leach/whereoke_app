'use strict';

const app = require('./app-data.js');
const tic = require('./game.js');

const newGameSuccess = (data) => {
  console.log("new game created");
  console.log(data);
  app.game = data.game;
  let board = app.game.cells;
  tic.gameSetUp(board);
};

const updateGameSuccess = (data) => {
  console.log(data);
  console.log("game successfully updated");
  app.game = data.game;
  console.log(app.game.cells);
};

const indexGameSuccess = (data) => {
  console.log("game history synced");
  app.gameHistory = data;
  console.log(app.gameHistory);

  let gamesPlayed = app.gameHistory.games.length;

  $("#gamesPlayed").text(app.gameHistory.games.length);
  $("#game-history-table").show();
  let winCount = 0;
  for (let i = 0; i < app.gameHistory.games.length; i++) {

    let playedAs = "o";
    if (app.gameHistory.games[i].player_x.id === app.user.id) {
      playedAs = "x";
    }

    let over = "Yes";
    if (app.gameHistory.games[i].over === false) {
      over = "No";
    }

    let board = app.gameHistory.games[i].cells;

    if (over === "No") {
      app.gameHistory.games[i].winner = "---";
    } else if (board[0] === board[1] && board[0] === board[2] && board[0] !== '') {
      app.gameHistory.games[i].winner = board[0];
    } else if (board[3] === board[4] && board[3] === board[5] && board[3] !== '') {
      app.gameHistory.games[i].winner = board[3];
    } else if (board[6] === board[7] && board[6] === board[8] && board[6] !== '') {
      app.gameHistory.games[i].winner = board[6];
    } else if (board[0] === board[3] && board[0] === board[6] && board[0] !== '') {
      app.gameHistory.games[i].winner = board[0];
    } else if (board[1] === board[4] && board[1] === board[7] && board[1] !== '') {
      app.gameHistory.games[i].winner = board[1];
    } else if (board[2] === board[5] && board[2] === board[8] && board[2] !== '') {
      app.gameHistory.games[i].winner = board[2];
    } else if (board[0] === board[4] && board[0] === board[8] && board[0] !== '') {
      app.gameHistory.games[i].winner = board[0];
    } else if (board[2] === board[4] && board[2] === board[6] && board[2] !== '') {
      app.gameHistory.games[i].winner = board[2];
    } else {
      app.gameHistory.games[i].winner = "Cat";
    }

    let winnerClass;
    if (app.gameHistory.games[i].winner === playedAs) {
      winCount += 1;
      winnerClass = "success";
    } else if (app.gameHistory.games[i].winner === "Cat"){
      winnerClass = "warning";
    } else if (app.gameHistory.games[i].winner === "---"){
      winnerClass = "";
    } else {
      winnerClass = "danger";
    }

    $("#game-history-table").find('tbody')
      .append($('<tr class=' + winnerClass + '>')
        .append($('<td>').text(i + 1))
        .append($('<td>').text(playedAs))
        .append($('<td>').text(over))
        .append($('<td>').text(app.gameHistory.games[i].winner))
      );

  }

  $("#gamesWon").text(winCount);

  let percent = Math.round(100 * (winCount/app.gameHistory.games.length),0) + "%";

  if (gamesPlayed === 0) {
    percent = "-";
  }

  $("#percent").text(percent);

};

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
  newGameSuccess,
  updateGameSuccess,
  indexGameSuccess
};

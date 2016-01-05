if (Meteor.isClient) {
  let gameCanvas = game = null;

  window.onload = function() {
    gameCanvas = document.getElementById('gameCanvas');
    context = gameCanvas.getContext('2d');
    init();
    setInterval(update, 1000/30);
  }

  function init() {
    let ball = new Ball(50, 50, 4, 4)
    let paddle1 = new Paddle(0, 40, 10, 100);
    let paddle2 = new Paddle(gameCanvas.width-10, 40, 10, 100);
    game = new Game(ball, paddle1, paddle2);
    gameCanvas.addEventListener('mousemove', function(e) {
      paddle1.Y = e.clientY - paddle1.height/2;
    });
  }

  function update() {
    game.update(gameCanvas);
    drawCanvas(context);
  }

  function drawCanvas(context) {
    // static elements
    context.fillStyle = 'black';
    context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    context.fillStyle = 'white';
    context.font = 'bold 28pt Calibri';
    context.textAlign = 'center';
    context.fillText(game.score1, 100, 100);
    context.fillText(game.score2, gameCanvas.width-100, 100);

    context.beginPath();
    context.setLineDash([4, 4]);
    context.moveTo(gameCanvas.width/2, 0);
    context.lineTo(gameCanvas.width/2, gameCanvas.height);
    context.strokeStyle = 'white';
    context.stroke();

    // dynamic elements
    game.draw();
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

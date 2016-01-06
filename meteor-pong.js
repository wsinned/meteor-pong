if (Meteor.isClient) {
  let gameCanvas = game = null;

  window.onload = function() {
    gameCanvas = document.getElementById('gameCanvas');
    init();
  }

  function init() {
    let ball = new Ball(50, 50, 4, 4)
    let paddle1 = new Paddle(0, 40, 10, 100);
    let paddle2 = new Paddle(gameCanvas.width-10, 40, 10, 100);
    game = new Game(ball, paddle1, paddle2);

    gameCanvas.addEventListener('mousemove', function(e) {
      paddle1.Y = e.clientY - paddle1.height/2;
    });

    setInterval(update, 1000/30);
  }

  function update() {
    game.move(gameCanvas);
    context = gameCanvas.getContext('2d');
    game.draw(context, gameCanvas);
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

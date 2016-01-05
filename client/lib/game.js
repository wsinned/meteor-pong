Game = class Game {
  constructor(ball, paddle1, paddle2) {
    this.ball = ball;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.aiSpeed = 2.2;
    this.score1 = 0;
    this.score2 = 0;
  }

  update(canvas) {
    this.ball.move();
    this.hitDetection(canvas);
    this.moveAI();
  }

  draw() {
    this.paddle1.draw(context);
    this.paddle2.draw(context);
    this.ball.draw(context);
  }

  hitDetection(canvas) {
    if (this.isHittingTop()) { this.ball.reverseY(); }
    if (this.isHittingBottom(canvas)) { this.ball.reverseY(); }

    if (this.isHittingLeft()) {
      if (this.isHittingPaddle(this.paddle1)) {
        this.ball.bounce(this.paddle1, 0.3);
      } else {
        this.score2++;
        this.reset(canvas);
      }
    }
    if (this.isHittingRight(canvas)) {
      if (this.isHittingPaddle(this.paddle2)) {
        this.ball.bounce(this.paddle2, 0.3);
      } else {
        this.score1++;
        this.reset(canvas);
      }
    }
  }

  moveAI() {
    if (this.paddle2.Y + this.paddle2.height/2 < this.ball.Y) {
      this.paddle2.Y += this.aiSpeed;
    } else {
      this.paddle2.Y -= this.aiSpeed;
    }
  }

  isHittingTop() {
    return (this.ball.Y < 0 && this.ball.velocityY < 0);
  }

  isHittingBottom(canvas) {
    return (this.ball.Y > canvas.height && this.ball.velocityY > 0);
  }

  isHittingLeft() {
    return (this.ball.X < 0);
  }

  isHittingRight(canvas) {
    return (this.ball.X > canvas.width);
  }

  isHittingPaddle(paddle) {
    return (this.ball.Y > paddle.Y && this.ball.Y < paddle.Y + paddle.height);
  }

  reset(canvas) {
    this.ball.reset(canvas);
  }
}

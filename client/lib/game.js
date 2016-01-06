Game = class Game {
  constructor(ball, paddle1, paddle2) {
    this.ball = ball;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.aiSpeed = 2.2;
    this.score1 = 0;
    this.score2 = 0;
    this.dynamicFactor = 0.3;
  }

  move(canvas) {
    this.ball.move();
    this.hitDetection(canvas);
    this.moveAI();
  }

  draw(context, canvas) {
    this.drawStaticElements(context, canvas);
    this.drawDynamicElements(context);
  }

  drawDynamicElements(context) {
    this.paddle1.draw(context);
    this.paddle2.draw(context);
    this.ball.draw(context);
  }

  drawStaticElements(context, canvas) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.font = 'bold 28pt Calibri';
    context.textAlign = 'center';
    context.fillText(this.score1, 100, 100);
    context.fillText(this.score2, canvas.width-100, 100);

    context.beginPath();
    context.setLineDash([4, 4]);
    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2, canvas.height);
    context.strokeStyle = 'white';
    context.stroke();
  }

  hitDetection(canvas) {
    if (this.isHittingTop()) { this.ball.reverseY(); }
    if (this.isHittingBottom(canvas)) { this.ball.reverseY(); }

    if (this.isHittingLeft()) {
      if (this.isHittingPaddle(this.paddle1)) {
        this.ball.bounce(this.paddle1, dynamicFactor);
      } else {
        this.score2++;
        this.reset(canvas);
      }
    }
    if (this.isHittingRight(canvas)) {
      if (this.isHittingPaddle(this.paddle2)) {
        this.ball.bounce(this.paddle2, dynamicFactor);
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

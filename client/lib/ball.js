Ball = class Ball {
  constructor(x, y, velocityX, velocityY) {
    this.X = x;
    this.Y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.size = 6;
  }

  draw(context) {
    context.fillRect(this.X - this.size/2, this.Y - this.size/2,
      this.size, this.size);
  }

  reverseY() { this.velocityY = -this.velocityY; }
  reverseX() { this.velocityX = -this.velocityX; }

  bounce(paddle, factor) {
        this.reverseX();
        dy = this.Y - (paddle.Y + paddle.height/2);
        this.velocityY = dy*factor;
  }

  move() {
    this.X += this.velocityX;
    this.Y += this.velocityY;
  }

  reset(canvas) {
    this.X = canvas.width/2;
    this.Y = canvas.height/2;
    this.reverseX();
    this.velocityY = 3;
  }
}

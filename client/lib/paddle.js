Paddle = class Paddle {
  constructor(x, y, width, height) {
    this.X = x;
    this.Y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.fillRect(this.X, this.Y, this.width, this.height);
  }
}

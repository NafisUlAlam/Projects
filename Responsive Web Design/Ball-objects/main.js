const para = document.querySelector("p");
let cnt = 0;
// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape
{
  constructor(x, y, velX, velY)
  {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class EvilCircle extends Shape
{
  constructor(x, y)
  {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
    window.addEventListener("keydown", (e) =>
    {
      switch(e.key)
      {
        case "a" : 
        this.x -= this.velX;
        break;
        case "d" :
        this.x += this.velX;
        break;
        case "w" :
        this.y -= this.velY;
        break;
        case "s" :
        this.y += this.velY;
        break; 
      } 
    });
  }

  draw()
  {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds()
  {
    if(this.x >= width) this.x = 10;
    else if(this.x < 0) this.x = width - 10;
    if(this.y >= height) this.y = 10;
    else if(this.y <= 0) this.y = height - 10;
  }

  collisionDetect()
  {
    for(const ball of balls)
    {
      if(ball.exists)
      {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < this.size + ball.size)
        {
          ball.exists = false;
          cnt--;
          para.textContent = "Ball count: " + cnt;
        }
      }
    }
  }
}

class Ball extends Shape
{
  constructor(x, y, velX, velY, color, size, exists)
  {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw()
  {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update()
  {
    if(this.x + this.size >= width) this.velX *= -1;
    if(this.x <= this.size) this.velX *= -1;
    if(this.y + this.size >= height) this.velY *= -1;
    if(this.y <= this.size) this.velY *= -1;
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect()
  {
    for(const ball of balls)
    {
      if(this !== ball && ball.exists)
      {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < this.size + ball.size)
        {
          ball.color = this.color = randomRGB();
          let temp = this. velX;
          this.velX = ball.velX;
          ball.velX = temp;
          temp = this. velY;
          this.velY = ball.velY;
          ball.velY = temp;

        }
      }
    }
  }
}


const evil = new EvilCircle(random(0 + 10, width - 10), random(0 + 10, height - 10));
const balls = [];
while(balls.length < 25)
{
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
    );
  balls.push(ball);
  cnt++;
  para.textContent = "Ball count: " + cnt;
}

function loop()
{
  ctx.fillStyle = "rgba(0, 0, 0, .25)";
  ctx.fillRect(0, 0, width, height);
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  for(const ball of balls)
  {
    if(ball.exists)
    {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }
  requestAnimationFrame(loop);
}

loop();


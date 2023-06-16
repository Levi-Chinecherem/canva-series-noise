// part One (declarations)
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

// part Two (load window and HTML objects)
window.onload = function() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
  console.log("Window loaded correctly");
};

// part Three (window resize event)
window.addEventListener('resize', function() {
  cancelAnimationFrame(flowFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
  console.log("Window resized correctly");
});

// part Four (mouse event)
const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log("Mouse moved correctly");
  console.log(mouse.x, mouse.y);
});

// part Five (the OOP: the FlowField class)
class FlowFieldEffect {
  // the # symbol makes the variable/property private to the class
  // such that it can't be called in the global scope
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    // this.#ctx.strokeStyle = "white";
    this.#ctx.lineWidth = 0-3;
    this.angle = 0;
    this.lastTime = 0;
    this.interval = 1000/60;
    this.timer = 0;
    this.cellSize = 15;
    this.radius = 3; // Added the missing radius property
    this.vr = 0; // Added the missing vr property
    this.gradient;
    this.#createGradient();
    this.#ctx.strokeStyle = this.gradient;
  }

  // part Six (Gradient)
  #createGradient() {
    this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
    this.gradient.addColorStop(0.1, "#ff5c33");
    this.gradient.addColorStop(0.2, "#ff66b3");
    this.gradient.addColorStop(0.4, "#ccccff");
    this.gradient.addColorStop(0.6, "#b3ffff");
    this.gradient.addColorStop(0.8, "#80ff80");
    this.gradient.addColorStop(0.9, "#ffff33");
    console.log("Gradient created correctly");
  }

  // part Seven (Draw line)
  #drawLine(angle, x, y) {
    let positionX = x;
    let positionY = y;
    let dx = mouse.x - positionX;
    let dy = mouse.y - positionY;
    let distance = dx * dx + dy * dy;
    let length = distance / 3500; // Corrected the typo in "length"
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    this.#ctx.stroke();
    console.log("Line drawn correctly");
  }

  // part Eight (the main animation)
  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      this.radius += this.vr;
      if (this.radius > 5 || this.radius < -5) this.vr *= -1;

      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          const angle = (Math.cos(x * 0.007) + Math.sin(y * 0.007)) * this.radius;
          this.#drawLine(angle, x, y);
        }
      }
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    console.log("animation loaded correctly")
  }
}

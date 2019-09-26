let div = document.getElementById('div');
let p = document.createElement('p')
p.innerHTML = 'Hello World!';
div.appendChild(p)

let engine;
let world;
let ground;
let boxes = [];
let boxes2 = [];
let bird;
let mConstraint;
class Box {
    constructor(x, y, w, h) {
        this.body = Matter.Bodies.rectangle(x, y, w, h);
        Matter.World.add(world, this.body)
        this.w = w;
        this.h = h;
    }
    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push()
        translate(pos.x, pos.y)
        rotate(angle)
        fill(255)
        rectMode(CENTER)
        rect(0, 0, this.w, this.h)
        pop()
    }
}
class Bird {
    constructor(x, y, r) {
        this.body = Matter.Bodies.circle(x, y, r)
        Matter.World.add(world, this.body)
        this.r = r;
    }
    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push()
        translate(pos.x, pos.y)
        rotate(angle)
        fill(150, 100, 50)
        rectMode(CENTER)
        circle(0, 0, this.r)
        pop()
    }
}
class Ground extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.body.isStatic = true;
    }
}

function setup() {
    const canvas = createCanvas(600, 400);
    engine = Matter.Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height - 20, width, 40);
    for (let i = 0; i < 3; i++) {
        boxes[i] = new Box(450, 300 - i * 75, 50, 75);
    }
    for (let i = 0; i < 3; i++) {
        boxes2[i] = new Box(500, 300 - i * 75, 50, 75);
    }
    bird = new Bird(50, 300, 50)
    const mouse = Matter.Mouse.create(canvas.elt)
    const options = {
        mouse: mouse
    }
    mConstraint = Matter.MouseConstraint.create(engine, options)
    Matter.World.add(world, mConstraint)
}
let x = 0;
let y = 0;
function draw() {
    background(0)
    Matter.Engine.update(engine);
    ground.show()
    for (let box of boxes) {
        box.show()
    }
    for (let box of boxes2) {
        box.show()
    }
    bird.show()

    // stroke(255)
    // rect(x, y, 100, 50)

    // if(keyIsDown(RIGHT_ARROW)){
    //     x += 5;
    // }
    // if(keyIsDown(LEFT_ARROW)){
    //     x -= 5;
    // }
    // if(keyIsDown(UP_ARROW)){
    //     y -= 5;
    // }
    // if(keyIsDown(DOWN_ARROW)){
    //     y += 5;
    // }
}

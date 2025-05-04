const engine = Matter.Engine.create();
const world = engine.world;
engine.gravity.y = 1;

const width = window.innerWidth;
const height = window.innerHeight;

const render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: { width, height, wireframes: false }
});

// Création des murs
const ground = Matter.Bodies.rectangle(width / 2, height - 100, width, 40, { isStatic: true });
const leftWall = Matter.Bodies.rectangle(0, height / 2, 40, height, { isStatic: true });
const rightWall = Matter.Bodies.rectangle(width, height / 2, 40, height, { isStatic: true });

Matter.World.add(world, [ground, leftWall, rightWall]);

let groundActive = true;

function newObstacle() {
    const obstacle = Matter.Bodies.rectangle(Math.random() * width - 90, Math.random() * height - 150, 50, 50, { isStatic: true, render: { fillStyle: 'purple' }});
    Matter.World.add(world, obstacle);
}

export { engine, world, render, ground, groundActive, width, height, newObstacle };
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

export { engine, world, render, ground, groundActive, width, height };
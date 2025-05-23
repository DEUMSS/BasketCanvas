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

// Création des murs et du sol
const ground = Matter.Bodies.rectangle(width / 2, height - 100, width, 40, { isStatic: true });
const leftWall = Matter.Bodies.rectangle(0, height / 2, 40, height, { isStatic: true });
const rightWall = Matter.Bodies.rectangle(width, height / 2, 40, height, { isStatic: true });

Matter.World.add(world, [ground, leftWall, rightWall]);

let groundActive = true;

let obstacles = [];
//Création de nouveaux obstacles
function newObstacle() {
    const obstacle = Matter.Bodies.rectangle(Math.random() * width - 90, Math.random() * height - 150, 50, 50, { isStatic: true, render: { fillStyle: 'purple' }});
    Matter.World.add(world, obstacle);
    obstacles.push(obstacle);
    console.log("Creating new obstacles...");
}

function removeObstacle() {
    obstacles.forEach((obstacle) => {
        Matter.World.remove(world, obstacle);
    });
    obstacles = []; // Réinitialise le tableau des obstacles
}

export { engine, world, render, ground, groundActive, width, height, newObstacle, removeObstacle };
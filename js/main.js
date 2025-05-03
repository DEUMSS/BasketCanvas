import { engine, world, ground, width, height } from './core/engine.js';
import { drawBasket, phiscalLeftHoopX, phiscalRightHoopX, hoopY } from './models/basket.js';
import { drawVector, drawBall, ball, updateGround } from './models/ball.js';

const { Engine, World, Events, Render, Runner } = Matter;

let groundActive = true;
let needsReset = false;
let ballLaunched = false;

// Création du renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
    }
});

// Mise à jour du jeu au passage dans le panier
let ballInHoopArea = false;

Events.on(engine, "afterUpdate", () => {
    const isInHoopArea =
        ball.position.x > phiscalLeftHoopX &&
        ball.position.x < phiscalRightHoopX &&
        ball.position.y > hoopY + 40 &&
        ball.position.y < hoopY + 60;

    if (isInHoopArea && !ballInHoopArea) {
        console.log("Ball entered the hoop area");
        ballInHoopArea = true;

        // Déclenche la réinitialisation dans renderLoop
        needsReset = true;
    } else if (!isInHoopArea && ballInHoopArea) {
        console.log("Ball left the hoop area");
        ballInHoopArea = false;
    }

});

Runner.run(engine);

(function renderLoop() {
    const context = render.context;

    // Si une réinitialisation est nécessaire
    if (needsReset) {
        console.log("Resetting world and all elements...");

        Matter.World.clear(world, false); 

        const newGround = Matter.Bodies.rectangle(width / 2, height - 100, width, 40, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(0, height / 2, 40, height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width, height / 2, 40, height, { isStatic: true });

        Matter.Body.setPosition(ball, { x: width / 2, y: height - 110 });
        Matter.Body.setVelocity(ball, { x: 0, y: 0 });

        Matter.World.add(world, [newGround, leftWall, rightWall, ball]);

        updateGround(newGround);

        console.log("World reset complete.");

        needsReset = false;
        groundActive = true;
        ballLaunched = false;
    }

    // Dessine les éléments du jeu
    Render.world(render);
    drawBasket(context);
    drawVector(context);
    drawBall(context);

    requestAnimationFrame(renderLoop);
})();
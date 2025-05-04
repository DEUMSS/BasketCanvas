import { engine, world, ground, width, height, newObstacle } from './core/engine.js';
import { drawBasket, phiscalLeftHoopX, phiscalRightHoopX, hoopY, moveBasket } from './models/basket.js';
import { drawVector, drawBall, ball/*, updateGround*/ } from './models/ball.js';

const { Engine, World, Events, Render, Runner } = Matter;

let needsReset = false;
let ballLaunched = false;
let level = 1;

// Création du render
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

//Passage au niveau suivant et ajout d'obstacles
function nextLevel(){
    console.log("Next level!");
    level ++;
    console.log("Current level: " + level);
    if(level = 2){
        moveBasket(level); // Déplace le panier
    }else if(level > 2 && level < 5){
        console.log("Creating new obstacles...");
        newObstacle(); // Crée un nouvel obstacle
    }else if(level >= 5 && level < 10){
        moveBasket(level); // Déplace le panier
        newObstacle(); // Crée un nouvel obstacle
    }
};

//Détéction de l'entrée de la balle dans le panier et de la chute de la balle
Events.on(engine, "afterUpdate", () => {
    const isInHoopArea =
        ball.position.x > phiscalLeftHoopX &&
        ball.position.x < phiscalRightHoopX &&
        ball.position.y > hoopY + 40 &&
        ball.position.y < hoopY + 60;

    if (isInHoopArea && !ballInHoopArea) {
        console.log("Ball entered the hoop area");
        ballInHoopArea = true;
        Matter.World.add(world, ground); // Ajoute le sol au monde
        nextLevel(); // Passe au niveau suivant

    } else if (!isInHoopArea && ballInHoopArea) {
        console.log("Ball left the hoop area");
        ballInHoopArea = false;

    } else if (ball.position.y > height){
        console.log("Ball fell off the screen");
        needsReset = true; // Indique qu'une réinitialisation est nécessaire
    }

});

Runner.run(engine);

(function renderLoop() {
    const context = render.context;

    // Si une réinitialisation est nécessaire
    if (needsReset) {
        console.log("Resetting world and all elements...");

        //Matter.World.clear(world, false); Plus utilisée

        //const newGround = Matter.Bodies.rectangle(width / 2, height - 100, width, 40, { isStatic: true }); Plus utilisée
        //const leftWall = Matter.Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }); Plus utilisée
        //const rightWall = Matter.Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }); Plus utilisée

        Matter.Body.setPosition(ball, { x: width / 2, y: height - 110 });
        Matter.Body.setVelocity(ball, { x: 0, y: 0 });

        Matter.World.add(world, ground); // Ajoute le sol au monde

        //Matter.World.add(world, [newGround, leftWall, rightWall, ball]); Plus utilisée

        //updateGround(newGround); Plus utilisée

        console.log("World reset complete.");

        //level = 1; // Réinitialise le niveau
        needsReset = false;
        ballLaunched = false;
    }

    // Dessine les éléments du jeu
    Render.world(render);
    drawBasket(context);
    drawVector(context);
    drawBall(context);

    requestAnimationFrame(renderLoop);
})();


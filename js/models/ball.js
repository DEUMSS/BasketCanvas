import { world, width, height, ground } from '../core/engine.js';

//Création de la balle
const ball = Matter.Bodies.circle(width / 2, height - 110, 20, { restitution: 0.7 });
Matter.World.add(world, ball);

let startX, startY;
let dragging = false;
let currentX, currentY;

//Détection de la souris pour charger le tir
window.addEventListener("mousedown", (event) => {
    const mousePos = { x: event.clientX, y: event.clientY };
    if (Matter.Bounds.contains(ball.bounds, mousePos)) {
        startX = event.clientX;
        startY = event.clientY;
        dragging = true;
    }
});

//Détéction de la souris pour charger le tir
window.addEventListener("mousemove", (event) => {
    if (dragging) {
        currentX = event.clientX;
        currentY = event.clientY;
    }
});

let currentGround = ground; 

/*function updateGround(newGround) {
    currentGround = newGround;
} Plus utilisée */

//Détection de la souris pour lancer la balle
window.addEventListener("mouseup", (event) => {
    if (!dragging) return;
    dragging = false;
    const endX = event.clientX;
    const endY = event.clientY;

    const dx = startX - endX;
    const dy = startY - endY;
    let magnitude = Math.sqrt(dx * dx + dy * dy) * 0.02;
    magnitude = Math.min(magnitude, 5);

    const force = Matter.Vector.normalise({ x: dx, y: dy });
    Matter.Body.applyForce(ball, ball.position, { x: force.x * magnitude * 0.025, y: force.y * magnitude * 0.025 });

    if (currentGround.isStatic) {
        Matter.World.remove(world, currentGround);
    }
});


//Dessine le vecteur de force
function drawVector(context) {
    if (dragging) {
        context.save();
        context.beginPath();
        context.moveTo(ball.position.x, ball.position.y);
        context.lineTo(ball.position.x + (ball.position.x - currentX), ball.position.y - (currentY - ball.position.y));
        context.setLineDash([5, 5]);
        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.stroke();
        context.restore();
    }
}

//Dessine la balle
function drawBall(context) {
    context.save();
    context.fillStyle = "red";
    context.translate(ball.position.x, ball.position.y);
    context.beginPath();
    context.arc(0, 0, 20, 0, Math.PI * 2);
    context.fill();
    context.restore();
}

export { ball, drawVector, drawBall };//, updateGround
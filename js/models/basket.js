import { world } from '../core/engine.js';

const { Engine, World, Events, Render, Runner } = Matter;

const hoopWidth = 60;
const hoopHeight = 10;
const netWidth = 80;
const netHeight = 60;
const hoopX = window.innerWidth - 600;
const hoopY = window.innerHeight / 3;

// Positions des bords du panier
const phiscalLeftHoopX = hoopX - 40;
const phiscalRightHoopX = hoopX + 40;

// Création du panier physique
const rimLeft = Matter.Bodies.circle(phiscalLeftHoopX, hoopY + 50, 5, { isStatic: true });
const rimRight = Matter.Bodies.circle(phiscalRightHoopX, hoopY + 50, 5, { isStatic: true });

Matter.World.add(world, [rimLeft, rimRight]);

//Fonction pour que le panier soit en mouvement
function moveBasket(level) {
    const slowSpeed = 1;
    const fastSpeed = 2;
    const speed = level < 5 ? slowSpeed : (level >= 5 && level < 10 ? fastSpeed : 0);

    if (speed > 0) {
        if (rimLeft.position.x <= 40) {
            // Déplacement vers la droite
            Matter.Body.setPosition(rimLeft, { x: rimLeft.position.x + speed, y: rimLeft.position.y });
            Matter.Body.setPosition(rimRight, { x: rimRight.position.x + speed, y: rimRight.position.y });
            hoopX += speed;
        } else if (rimRight.position.x >= window.innerWidth - 40) {
            // Déplacement vers la gauche
            Matter.Body.setPosition(rimLeft, { x: rimLeft.position.x - speed, y: rimLeft.position.y });
            Matter.Body.setPosition(rimRight, { x: rimRight.position.x - speed, y: rimRight.position.y });
            hoopX -= speed;
        }
    }
}

//Création du dessin du panier
function drawBasket(context) {
    context.save();
    context.strokeStyle = "white";
    context.lineWidth = 2;

    // Dessin du filet
    const netRows = 5;
    const netCols = 7;
    const spacingX = netWidth / netCols;
    const spacingY = netHeight / netRows;

    for (let row = 0; row < netRows; row++) {
        for (let col = 0; col < netCols; col++) {
            const startX = hoopX - netWidth / 2 + col * spacingX;
            const startY = hoopY + 40 + row * spacingY;
            const endX = startX + spacingX;
            const endY = startY + spacingY;

            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke(); 
        }
    }

    for (let row = 0; row < netRows; row++) {
        for (let col = 0; col < netCols; col++) {
            const startX = (hoopX - netWidth / 2 + (col + 1) * spacingX) ;
            const startY = hoopY + 40 + row * spacingY;
            const endX = startX - spacingX ;
            const endY = startY + spacingY;

            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke();
        }
    }

    context.restore();

    // Dessin de l'anneau
    context.save();
    context.strokeStyle = "#D1441C";
    context.lineWidth = 10;
    context.beginPath();
    context.ellipse(hoopX, hoopY + 50, hoopWidth / 1.5, 15, 0, 0, Math.PI * 2);
    context.stroke();
    context.restore();
}

export { drawBasket, phiscalLeftHoopX, phiscalRightHoopX, hoopY, moveBasket };
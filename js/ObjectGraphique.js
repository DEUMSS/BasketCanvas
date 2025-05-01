export default class ObjectGraphique {
    constructor(x, y, w, h, couleur) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        if(couleur !== undefined) {
            this.couleur = couleur;
        }
    }

    draw(ctx) {
        // pour debug,juste une croix en 0, 0
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(10, 0);
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 10);
        ctx.stroke();
    }
}
import { c } from './game.js';
import Boundary from './boundary.js';

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 13;
        this.radians = 0.75;
        this.openRate = .04;
        this.rotation = 0;
        this.lives = 3;
    }

    loseLife() {
        this.lives--;
   document.getElementById('livesCount').innerHTML = this.lives;
        console.log("testtt")
        if (this.lives === 0) {
            gameOver();
        } else {
            this.position.x = Boundary.width + Boundary.width / 2;
            this.position.y = Boundary.height + Boundary.height / 2;
        }
    }

    draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation);
    c.translate(-this.position.x, -this.position.y);
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians);
    c.lineTo(this.position.x, this.position.y);
    c.fillStyle = 'yellow';
    c.fill();
    c.closePath();
    c.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
       if (this.radians < 0 || this.radians > 0.75) this.openRate = -this.openRate;
        this.radians += this.openRate;
    }
}
export default Player;
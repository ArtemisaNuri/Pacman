import { c } from './game.js';

class Pellet {
    constructor({ position }) {
        this.position = position;
        this.radius = 5;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'white';
        c.fill();
       c.closePath();
    }
}

class PowerUp {
    constructor({ position }) {
        this.position = position;
        this.radius = 10;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }
}

export  {PowerUp}
export default Pellet

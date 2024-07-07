
import { c } from './game.js';
import {player} from './game.js';
import { boundaries } from './game.js';
import { circleCollidesWithRectangle } from './game.js';

export  class Ghost {
    constructor({ position, velocity, color = 'red', image }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 13;
       // this.color = color;
        this.pervCollisions = [];
        this.speed = 1.3;
        this.image = image;
        this.direction = this.getRandomDirection();
        this.setVelocity();
        this.scared = false;
    }

    draw() {
       c.beginPath();
       c.drawImage(this.image, this.position.x, this.position.y);
      c.closePath();
    }

        update() {
        this.draw();
        this.chasePacman(player)
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

        chasePacman(player) {
            const target = player.position;
            const dx = target.x - this.position.x;
            const dy = target.y - this.position.y;
            const angle = Math.atan2(dy, dx);
            this.velocity.x = Math.cos(angle) * this.speed;
            this.velocity.y = Math.sin(angle) * this.speed;
        
        let newVelocity = { x: 0, y: 0 };
        if (dx > dy) {
            newVelocity.x = this.position.x > target.x ? -this.speed : this.speed;
            newVelocity.y = 0; 
        } else {
            newVelocity.y = this.position.y > target.y ? -this.speed : this.speed;
            newVelocity.x = 0; 
        }
    
        const testCircle = { ...this, velocity: newVelocity };
        let collisionDetected = false;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (circleCollidesWithRectangle({ circle: testCircle, rectangle: boundary })) {
                collisionDetected = true;
                break;
            }
        }
    
        if (collisionDetected) {
            this.position.x += this.velocity.x * -1;
            this.position.y += this.velocity.y * -1;
        } else {
            this.velocity = newVelocity;
        }
    }
    

        getRandomDirection() {
        const directions = ['up', 'down', 'left', 'right'];
        return directions[Math.floor(Math.random() * directions.length)];

        
    }
    

    setVelocity() {
        switch (this.direction) {
            case 'up':
                this.velocity = { x: 0, y: -this.speed };
                break;
            case 'down':
                this.velocity = { x: 0, y: this.speed };
                break;
            case 'left':
                this.velocity = { x: -this.speed, y: 0 };
                break;
            case 'right':
                this.velocity = { x: this.speed, y: 0 };
                break;
        }
    }
    

    handleCollision(boundary) {
        if (circleCollidesWithRectangle({ circle: this, rectangle: boundary })) {
            this.changeDirection();
        }
    }

    changeDirection() {
        this.direction = this.getRandomDirection();
        this.setVelocity();
    }
}

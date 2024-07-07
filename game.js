
import Player from "./player.js";
import { Ghost}  from './ghosts.js';
import Boundary from './boundary.js';
import Pellet , {PowerUp}  from "./pellet.js";


export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
export const scoreEl = document.querySelector('#scoreEl');
export const livesEl = document.querySelector('#livesCount');
export const startButton = document.querySelector('#start');
export const gameOverScreen = document.querySelector('#gameOver');
export const restartButton = document.querySelector('#restart');
export const finalScoreEl = document.querySelector('#finalScore');

canvas.width = innerWidth;
canvas.height = innerHeight;

export let animationId;
export let score = 0;

export const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
});

function updateLivesDisplay() {
    livesEl.innerText = player.lives;
}

function startGame() {
    animate();
    score = 0;
    startButton.style.display = "none";
    gameOverScreen.style.display = "none";
    canvas.style.display = "block";
}

function gameOver() {
    cancelAnimationFrame(animationId);
    canvas.style.display = "none";
    gameOverScreen.style.display = "flex";
    finalScoreEl.textContent = score;
    document.getElementById("livesCount").innerHTML =0
}

function restartGame() {
    window.location.reload();
    
}

function checkWin() {
    if (score >= 1380) {
        document.getElementById('winModal').style.display = 'flex';
        canvas.style.display = 'none';
    }
}

//function distance(x1, y1, x2, y2) {
  //  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);}

startButton.addEventListener('click', () => {
    startGame();
});

restartButton.addEventListener('click', () => {
    restartGame();
});




export const pellets = [];
export const boundaries = [];
export const powerUps = [];


export const keys = {
    w: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
    s: { pressed: false }
};

export let lastKey = " "
export const map = [
    ['1', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '2'],
    ['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', '.', 'b', '.', '.', '.', '.', 'b', '.', '.', '.', '.', 'b', '.', '.', '|'],
    ['|', '.', '.', '.', '.', 'b', '.', '.', '.', '.', '.', 'b', '.', '.', '.', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', '1', '2', '.', '1', '_', '2', '.', '1', '_', '2', '.', '1', '2', '.', '|'],
    ['|', '.', '|', '.', '.', '|', ' ', '|', '.', '|', ' ', '|', '.', '|', '.', '.', '|'],
    ['|', '.', '|', '.', '.', '|', ' ', '|', '.', '|', ' ', '|', 'p', '|', '_', '.', '|'],
    ['|', '.', '|', '.', '.', '|', ' ', '|', '.', '|', ' ', '|', '.', '|', '.', '.', '|'],
    ['|', '.', '4', '3', '.', '4', '_', '3', '.', '4', '_', '3', '.', '4', '3', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', '.', '.', '.', '.', 'b', '.', '.', '.', '.', 'b', '.', '.', '.', '.', '|'],
    ['|', '.', '.', 'b', '.', '.', '.', '.', 'b', '.', '.', '.', '.', 'b', '.', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['4', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '3']
];

export const imageSources = {
    pipeHorizontal: './img/pipeHorizontal.png',
    pipeVertical: './img/pipeVertical.png',
    pipeCorner1: './img/pipeCorner1.png',
    pipeCorner2: './img/pipeCorner2.png',
    pipeCorner3: './img/pipeCorner3.png',
    pipeCorner4: './img/pipeCorner4.png',
    pacman: './img/pacman.png',
    whiteGhost: './img/whiteG.png',
    pinkGhost: './img/pinkG.png',
    greenGhost: './img/greenG.png',
    blueGhost: './img/blueG.png',
    pipeConnectorTop: './img/pipeConnectorTop.png',
    pipeConnectorDown: './img/pipeConnectorDown.png',
    pipeConnectorRight: './img/pipeConnectorRight.png',
    favicon: './img/favicon-16x16.png',
    block: './img/block.png'

    
};

export const loadImage = src => {
    const img = new Image();
    img.src = src;
    return img;
};

export const images = {};
for (const [key, src] of Object.entries(imageSources)) {
    images[key] = loadImage(src);
}

export const createMap = () => {
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch (symbol) {
                case '_':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: images.pipeHorizontal
                        })
                    );
                    break;
                case '|':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: images.pipeVertical
                        })
                    );
                    break;
                case '1':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: images.pipeCorner1
                        })
                    );
                    break;
                case '2':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: images.pipeCorner2
                        })
                    );
                    break;
                case '3':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: images.pipeCorner3
                        })
                    );
                    break;
                case '4':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: images.pipeCorner4
                        })
                    );
                    break;
                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: j * Boundary.width + Boundary.width / 2,
                                y: i * Boundary.height + Boundary.height / 2
                            }
                        })
                    );
                    break;
                case 'p':
                    powerUps.push(
                        new PowerUp({
                            position: {
                                x: j * Boundary.width + Boundary.width / 2,
                                y: i * Boundary.height + Boundary.height / 2
                            }
                        })
                    );
                    break;
                    case 'b':
                        boundaries.push(
                            new Boundary({
                                position: {
                                    x: Boundary.width * j,
                                    y: Boundary.height * i
                                },
                                image: images.block
                            })
                        );
            }
        });
    });
};

export const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 3 + Boundary.height / 2
        },
        velocity: {
            x: 0,
            y: -0.8
        },
        image: images.pinkGhost
    }),
    new Ghost({
        position: {
            x: Boundary.width * 8 + Boundary.width / 2,
            y: Boundary.height * 10 + Boundary.height / 2
        },
        velocity: {
            x: 0,
            y: 0.8
        },
        image: images.greenGhost,
        color: 'green', 
         
    }),
    new Ghost({
        position: {
            x: Boundary.width * 3 + Boundary.width / 2,
            y: Boundary.height * 6 + Boundary.height / 2
        },
        velocity: {
            x: 0,
            y: -0.8
        },
        image: images.blueGhost,
        
    })
 
]

export const circleCollidesWithRectangle = ({ circle, rectangle }) => {
    const padding = Boundary.width / 2 - circle.radius - 1;
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
    );
};

export const animate = () => {
    animationId = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: { ...player, velocity: { x: 0, y: -5 } },
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = -5;
            }
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: { ...player, velocity: { x: -5, y: 0 } },
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = -5;
            }
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: { ...player, velocity: { x: 5, y: 0 } },
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = 5;
            }
        }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: { ...player, velocity: { x: 0, y: 5 } },
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = 5;
            }
        }
    }

    ghosts.forEach((ghost) => {
        ghost.update();
        boundaries.forEach((boundary) => {
            if (circleCollidesWithRectangle({ circle: ghost, rectangle: boundary })) {
                ghost.chasePacman(player);
               ghost.handleCollision(boundary);


            }
        });

       

        if (Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y) < ghost.radius + player.radius) {
            if (ghost.scared) {
                ghosts.splice(ghosts.indexOf(ghost), 1);
            } else {
                player.loseLife();
            }
        }

      /*  if (ghost.scared) {
            ghost.color = 'blue';
        } else {
            ghost.color = ghost.originalColor;
        }*/
    });

    if (pellets.length === 0) {
        console.log('You win!');
        checkWin()
        return;
    }

    for (let i = powerUps.length - 1; 0 <= i; i--) {
        const powerUp = powerUps[i];
        powerUp.draw();
        if (
            Math.hypot(
                powerUp.position.x - player.position.x,
                powerUp.position.y - player.position.y
            ) < powerUp.radius + player.radius
        ) {
            powerUps.splice(i, 1);
            ghosts.forEach(ghost => {
                ghost.scared = true;
                setTimeout(() => {
                    ghost.scared = false;
                }, 10000);
            });
        }
    }

    for (let i = pellets.length - 1; 0 <= i; i--) {
        const pellet = pellets[i];
        pellet.draw();

        if (
            Math.hypot(
                pellet.position.x - player.position.x,
                pellet.position.y - player.position.y
            ) < pellet.radius + player.radius
        ) {
            pellets.splice(i, 1);
            score += 10;
            scoreEl.innerText = score;
        }
    }

    boundaries.forEach(boundary => {
        boundary.draw();
        if (
            circleCollidesWithRectangle({
                circle: player,
                rectangle: boundary
            })
        ) {
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    });

    player.update();

    if (player.velocity.x > 0) player.rotation = 0;
    else if (player.velocity.x < 0) player.rotation = Math.PI;
    else if (player.velocity.y > 0) player.rotation = Math.PI / 2;
    else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5;

    
};

createMap();


window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
    }
});

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            if (lastKey === 'w') lastKey = '';
            break;
        case 'a':
            keys.a.pressed = false;
            if (lastKey === 'a') lastKey = '';
            break;
        case 'd':
            keys.d.pressed = false;
            if (lastKey === 'd') lastKey = '';
            break;
        case 's':
            keys.s.pressed = false;
            if (lastKey === 's') lastKey = '';
            break;
    }
});
export {startGame}
export {restartGame}
export {gameOver}
export {updateLivesDisplay}
export {checkWin}

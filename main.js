class Player {
    x;
    y;
    aov;
    speed;
};

var canva;
var ctx;
var width;
var height;
var player = new Player();
player.x = 104;
player.y = 104;
player.aov = 0;
player.speed = 8;

function draw_line(startX, startY, endX, endY, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function clear_screen() {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, width, height);
}


const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

function draw_rect(x, y, scale) {
    ctx.fillRect(x, y, 8 * scale, 8 * scale);
}

function draw_minimap(map) {
    const rows = map.length;
    const cols = map[0].length;
    const scale = 1;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === 1) {
                ctx.fillStyle = 'black';
            } else {
                ctx.fillStyle = 'white';
            }
            draw_rect(j * 8 * scale, i * 8 * scale, 1 * scale);
        }
    }
}

function draw_player(p) {
    ctx.fillStyle = 'blue';
    draw_rect(p.x, p.y, 1);
}

function move_player(p, dx, dy) {
    p.x += dx;
    p.y += dy;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    const dx = Math.cos(player.aov) * player.speed;
    const dy = Math.sin(player.aov) * player.speed;
    if (key === 'ArrowUp') {
        move_player(player, dx, dy);
    } else if (key === 'ArrowDown') {
        move_player(player, -dx, -dy);
    } else if (key === 'ArrowLeft') {
        player.aov -= 0.1;
    } else if (key === 'ArrowRight') {
        player.aov += 0.1;
    }
});

const CELL_SIZE = 8;

function outOfMapBounds(x, y) {
    return y < 0 || y >= map.length || x < 0 || x >= map[0].length;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getIntersectH(angle) {
    //Check if the player’s view is UP or DOWN
    const isUp = Math.abs(Math.floor(angle / Math.PI) % 2);
    const intersecY = isUp ?
    Math.floor(player.y / CELL_SIZE) * CELL_SIZE :
    Math.floor(player.y / CELL_SIZE) * CELL_SIZE + CELL_SIZE;
    const intersecX = player.x + (intersecY - player.y) / Math.tan(angle);
    const y = isUp ? - CELL_SIZE : CELL_SIZE;
    const x = y / Math.tan(angle);
    let wall;
    let nextX = intersecX;
    let nextY = intersecY;
    while (!wall) {
        const cellX = Math . floor ( nextX / CELL_SIZE ) ;
        const cellY = isUp ? Math . floor ( nextY / CELL_SIZE ) - 1 : Math . floor ( nextY /
        CELL_SIZE) ;
        if (outOfMapBounds(cellX, cellY)) {
            break;
        }
        wall = map[cellY][cellX];
        if (!wall) {
            nextX += x;
            nextY += y;
        }
    }
    return {angle : angle, distance : getDistance (player.x , player.y, nextX, nextY ),
    vertical : false};
}

function getIntersectV(angle) {
    const isLeft = Math.abs(Math.floor(angle / Math.PI) % 2);
    const intersecX = isLeft ?
    Math.floor(player.x / CELL_SIZE) * CELL_SIZE :
    Math.floor(player.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE;
    const intersecY = player.y + (intersecX - player.x) * Math.tan(angle);
    const x = isLeft ? -CELL_SIZE : CELL_SIZE;
    const y = x * Math.tan(angle);
    let wall;
    let nextX = intersecX;
    let nextY = intersecY;
    while (!wall) {
        const cellX = isLeft ? Math.floor(nextX / CELL_SIZE) - 1 : Math.floor(nextX /
        CELL_SIZE);
        const cellY = Math.floor(nextY / CELL_SIZE);
        if (outOfMapBounds(cellX, cellY)) {
            break;
        }
        wall = map[cellY][cellX];
        if (!wall) {
            nextX += x;
            nextY += y;
        }
    }
    return {angle : angle, distance : getDistance (player.x , player.y, nextX, nextY ),
    vertical : true};
}

function castRay(angle) {
    var collisionV = getIntersectV(angle);
    var collisionH = getIntersectH(angle);
    return collisionH.distance >= collisionV.distance ? collisionV : collisionH;
}

function getRays(p) {
    var rays = [];
    for (var i = 0; i < 30; i += 0.1) {
        rays.push(castRay(p.aov - i));
        rays.push(castRay(p.aov + i));
    }
    return rays;
}

function castRays(p, fov) {
    var rays = getRays(p);
    for (var i = 0; i < 10; i++) {
        var ray = rays[i];
        for (var j = 0; j < 1; j += 0.1) {
            draw_line(p.x + 4, p.y + 4, p.x + 4 + Math.cos(ray.angle) * ray.distance, p.y + 4 + Math.sin(ray.angle) * ray.distance, 'yellow');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    canva = document.getElementById('my-canva');
    ctx = canva.getContext('2d');
    width = 380;
    height = 280;
    ctx.lineWidth = 2;

    setInterval(() => {
        clear_screen();
        draw_minimap(map);
        castRays(player, 60);
        draw_player(player);
    }, 1000 / 30);
});


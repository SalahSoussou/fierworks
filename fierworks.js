/**@type {HTMLCanvasElement}*/
const ctx = cnv.getContext("2d");
cnv.width = innerWidth;
cnv.height = innerHeight;

let mouse = {
    x: cnv.width / 2,
    y: cnv.height / 2
}

addEventListener('resize', () => {
    cnv.width = innerWidth;
    cnv.height = innerHeight;
});
function ranRang(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)
}
const gravity = 0.05;
const frictin = 0.99;
class Particle {
    constructor(x, y, radius, color, vl) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vl = vl;
        this.alpha = 1;
    };
    update() {
        this.draw();
        this.vl.x *= frictin;
        this.vl.y *= frictin;
        this.vl.y += gravity;
        this.x += this.vl.x;
        this.y += this.vl.y;
        this.alpha -= 0.005
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore()
    };
}

let particles;
let rdians = 0;
function init() {
    particles = []
}
addEventListener('click', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const particleCount = 400;
    const angleIncrement = (Math.PI * 2) / particleCount
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(mouse.x, mouse.y,
            Math.random() * 3,
            `hsl(${Math.random() * 360},70%,50%)`,
            {
                x: Math.cos(particleCount * i) * Math.random() * 6,
                y: Math.sin(particleCount * i) * Math.random() * 6
            }))
    }
})

function animate() {
    // ctx.fillStyle = `rgba(255, 255, 255, 0.07)`;
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update();
        } else {
            particles.splice(i, 1)
        }
    });
    requestAnimationFrame(animate)
}
init();
animate();
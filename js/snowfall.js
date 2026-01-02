/**
 * Snowfall Animation
 * Renders a festive snowfall effect using HTML5 Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('snow-container');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Snowflake particles
    const snowflakes = [];
    const maxSnowflakes = 100; // Limit for performance

    class Snowflake {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 3 + 1; // Size between 1 and 4
            this.speed = Math.random() * 1 + 0.5; // Speed between 0.5 and 1.5
            this.wind = Math.random() * 0.5 - 0.25; // Slight horizontal drift
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;

            // Reset if out of bounds
            if (this.y > height) {
                this.y = -5;
                this.x = Math.random() * width;
            }
            if (this.x > width) {
                this.x = 0;
            } else if (this.x < 0) {
                this.x = width; // Wrap around
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize
    for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes.push(new Snowflake());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
});

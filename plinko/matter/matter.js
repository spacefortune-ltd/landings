const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

// Setup constants
const worldWidth = 650;
const startPins = 2;
const pinLines = 8;
const pinSize = 7;
const pinGap = 63;
const ballSize = 17;

// Create the physics engine
var engine = Engine.create();

// Setup rendering
var render = Render.create({
    element: document.querySelector('.canvas'),
    engine: engine,
    options: {
        width: 580,
        height: 630,
        wireframes: false,
        background: null,
    },
});

// Create pins
const pins = [];
for (let l = 0; l < pinLines; l++) {
    const linePins = startPins + l;
    const lineWidth = linePins * pinGap;

    for (let i = 0; i < linePins; i++) {
        const pin = Bodies.circle(
            worldWidth / 2 - lineWidth / 2 + i * pinGap,
            150 + l * pinGap,
            pinSize,
            {
                isStatic: true,
                render: {
                    fillStyle: "white", // Initial pin color is white
                },
            }
        );
        pins.push(pin);
    }
}
Composite.add(engine.world, pins);

// Add a visual hole at the top
const holeX = 294; // Center of the hole
const holeY = 100; // Vertical position of the hole
const holeRadius = 20;

// Static body for the hole (purely decorative)
const hole = Bodies.circle(holeX, holeY, holeRadius, {
    isStatic: true,
    render: {
        sprite: {
            texture: "content-img/hall.png",
            xScale: 1,
            yScale: 1,
        },
    },
});

hole.collisionFilter = {
    'group': -1,
    'category': 2,
    'mask': 0,
};

Composite.add(engine.world, hole);

// Track balls
const balls = [];

// Drop balls from the center of the hole
document.querySelector("button").addEventListener("click", function clickHandler() {
    document.querySelector("button").disabled = true;

    for (let t = 0; t < 5; t++) {
        setTimeout(() => {
            const delta = [0.4, -0.4, 0.8, -0.8 , 1.1];
            // Position ball at the exact center of the hole (start straight down)
            const ball = Bodies.circle(holeX + delta[t], holeY, ballSize, {
                restitution: 0.53, // Slight bounce
                render: {
                    sprite: {
                        texture: "content-img/ball.png",
                        xScale: 0.07,
                        yScale: 0.07,
                    },
                },
            });

            Matter.Body.setVelocity(ball, { x: 0, y: 0.1 });

            // Add ball to the world
            balls.push(ball);
            Composite.add(engine.world, ball);

        }, t * 1800); // Delay each ball drop
    }
});

// Add collision event to change pin color when hit by a ball, but exclude the hole
Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        const ball = balls.find((b) => b === bodyA || b === bodyB);
        if (ball) {
            const pin = bodyA === ball ? bodyB : bodyA;

            // Ensure that the pin is not the hole (hole is static but does not change color)
            if (pin.isStatic && pin !== hole) {
                // Temporarily change the pin color to pink
                pin.render.fillStyle = "#E0319C"; // Pink color

                // Reset the pin color back to white after 300ms
                setTimeout(() => {
                    pin.render.fillStyle = "white"; // Change back to white after collision
                }, 300);
            }
        }
    });
});
Events.on(engine, "afterUpdate", () => {
    const ballsInField = balls.filter(
        (ball) => ball.position.y < render.options.height + ballSize
    );

    // If all balls have left the field
    if (ballsInField.length === 0 && balls.length > 0) {
        setTimeout(() => {
            // Smooth scroll to the top
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            // Add 'modal' class to body
            document.body.classList.add("modal");
        }, 1000);
    }
});

const index = [6, 7, 5, 3, 8];

// Function to activate the corresponding span based on the current index
let currentIndex = 0;

function activateNext() {
    if (currentIndex < index.length) {
        const targetIndex = index[currentIndex];
        if (targetIndex === 3 && pins[25]) {
            Matter.Body.setPosition(pins[25], { x: 419, y: pins[25].position.y });
        }
        const targetSpan = document.querySelector(`.bowls .bowl:nth-child(${targetIndex}) span.x`);
        if (targetSpan) {
            targetSpan.classList.add("active");
        }
        currentIndex++;
    }
}

// Listener to check when a ball leaves the field
Events.on(engine, "afterUpdate", () => {
    // Filter out balls still in the field
    const ballsInField = balls.filter((ball) => ball.position.y < render.options.height + 2*ballSize);

    // If a ball has left the field
    if (balls.length > ballsInField.length) {
        balls.splice(0, balls.length - ballsInField.length); // Remove the exited balls from tracking

        setTimeout(() => {
            activateNext(); // Activate the next span
        }, 100); // 1-second delay
    }
});

// Run rendering
Render.run(render);

// Use a fixed interval for updates
const fixedDeltaTime = 1000 / 60; // 60 FPS
setInterval(() => {
    Engine.update(engine, fixedDeltaTime);
}, fixedDeltaTime);

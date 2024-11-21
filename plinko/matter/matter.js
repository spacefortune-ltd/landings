const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

const worldWidth = 650;
const startPins = 2;
const pinLines = 8;
const pinSize = 7;
const pinGap = 63;
const ballSize = 17;

var engine = Engine.create();

var render = Render.create({
    element: document.querySelector('.canvas'),
    engine: engine,
    options: {
        width: 600,
        height: 580,
        wireframes: false,
        background: null,
    },
});

const pins = [];
for (let l = 0; l < pinLines; l++) {
    const linePins = startPins + l;
    const lineWidth = linePins * pinGap;
    for (let i = 0; i < linePins; i++) {
        const pin = Bodies.circle(
            worldWidth / 2 - lineWidth / 2 + i * pinGap,
            100 + l * pinGap,
            pinSize,
            {
                isStatic: true,
                render: {
                    fillStyle: "white",
                },
            }
        );
        pins.push(pin);
    }
}
Composite.add(engine.world, pins);

const balls = [];

Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        const ball = balls.find((b) => b === bodyA || b === bodyB);
        if (ball) {
            const pin = bodyA === ball ? bodyB : bodyA;

            if (pin.render.fillStyle === "white") {
                pin.render.fillStyle = "#E0319C";

                setTimeout(() => {
                    pin.render.fillStyle = "white";
                }, 300);
            }
        }
    });
});

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

document.querySelector("button").addEventListener("click", function clickHandler() {
    document.querySelector("button").removeEventListener("click", clickHandler);
    document.querySelector("button").disabled = true;
    for (let t = 0; t < 5; t++) {
        setTimeout(() => {
            const delta = [2, -2, 1, -1, 0];
            const ball = Bodies.circle(292.5 + (delta[t] * 1), 50, ballSize, {
                restitution: 0.52,
                render: {
                    sprite: {
                        texture: "content-img/ball.png",
                        xScale: 0.07,
                        yScale: 0.07,
                    },
                },
            });
            balls.push(ball);
            Composite.add(engine.world, ball);
        }, t * 1200);
    }

    setTimeout(() => {
        document.querySelector("button").addEventListener("click", clickHandler);
        document.querySelector("button").disabled = false;
    }, 5000);
});
const {Engine, Render, Runner, Bodies, Composite, Events} = Matter;

const worldWidth = 500;
const startPins = 3;
const pinLines = 7;
const pinSize = 5;
const pinGap = 50;
const ballSize = 10;

var engine = Engine.create();

var render = Render.create({
    element: document.querySelector('.canvas'),
    engine: engine,
    options: {
        width: 500,
        height: 500,
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
                    fillStyle: "red",
                },
            }
        );
        pins.push(pin);
    }
}
Composite.add(engine.world, pins);

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);

document.querySelector("button").addEventListener("click", function clickHandler() {
    document.querySelector("button").removeEventListener("click", clickHandler);

    for (let t = 0; t < 5; t++) {
        setTimeout(() => {
            const ball = Bodies.circle(370 + (t * 0.5), 0, ballSize, {
                restitution: 0.75,
                render: { fillStyle: "blue" },
            });
            Composite.add(engine.world, ball);
        }, t * 1000);
    }

    setTimeout(() => {
        document.body.addEventListener("click", clickHandler);
    }, 5000);
});
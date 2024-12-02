const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

let isSound = false;
let isPlay = false;

// Web Audio API setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const bufferCache = {};

// Preload audio buffers
const loadAudio = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
};

// Load all audio files
const preloadSounds = async () => {
    bufferCache.music = await loadAudio('./sounds/music.wav');
    bufferCache.touch = await loadAudio('./sounds/touch.wav');
    bufferCache.popup = await loadAudio('./sounds/popup.wav');
    bufferCache.clickS = await loadAudio('./sounds/click.mp3');
    bufferCache.out = await loadAudio('./sounds/out.wav');
};

// Play a sound
const playSound = (buffer, volume = 1, loop = false) => {
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();

    source.buffer = buffer;
    source.loop = loop;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = volume;
    source.start(0);
    return source; // Return the source if you want to stop looping later
};

let musicSource;

// Preload all sounds
preloadSounds();

// UI sound toggling
document.querySelectorAll(".tabs .tab").forEach(tab => {
    tab.addEventListener("click", function clickHandler() {
        const tabs = document.querySelectorAll('.tabs .tab');
        tabs.forEach(tab => tab.classList.remove('active'));

        this.classList.add('active');
        isSound = this.classList.contains('sound');

        if (isSound) {
            if (!musicSource) {
                musicSource = playSound(bufferCache.music, 0.2, true);
            }
        } else if (musicSource) {
            musicSource.stop();
            musicSource = null;
        }
    });
});

document.querySelectorAll("button, a").forEach(b => {
    b.addEventListener("click", function clickHandler() {
        if (isSound) {
            playSound(bufferCache.clickS, 0.4);
        }
    });
});

// Physics engine setup
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
        width: 580,
        height: 630,
        wireframes: false,
        background: null,
        pixelRatio: 1,
    },
});

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
                render: { fillStyle: "white" },
            }
        );
        pins.push(pin);
    }
}
Composite.add(engine.world, pins);

const holeX = 294;
const holeY = 100;
const holeRadius = 20;

const hole = Bodies.circle(holeX, holeY, holeRadius, {
    isStatic: true,
    render: {
        sprite: { texture: "content-img/hall.png", xScale: 1, yScale: 1 },
    },
});
hole.collisionFilter = { 'group': -1, 'category': 2, 'mask': 0 };
Composite.add(engine.world, hole);

const balls = [];
document.querySelector(".play-btn").addEventListener("click", function clickHandler() {
    document.querySelector(".play-btn").disabled = true;
    document.querySelectorAll('.tabs .tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector('.tabs .tab.sound')?.classList.add('active');
    isPlay = true;
    isSound = true;

    if (!musicSource) {
        musicSource = playSound(bufferCache.music, 0.2, true);
    }


    for (let t = 0; t < 5; t++) {
        setTimeout(() => {
            const delta = [0.4, -0.4, 0.8, -0.8, 1.1];
            const ball = Bodies.circle(holeX + delta[t], holeY, ballSize, {
                restitution: 0.53,
                render: { sprite: { texture: "content-img/ball.png", xScale: 0.07, yScale: 0.07 } },
            });

            Matter.Body.setVelocity(ball, { x: 0, y: 0.1 });
            balls.push(ball);
            Composite.add(engine.world, ball);
        }, t * 1800);
    }
});

Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;

    pairs.forEach(({ bodyA, bodyB }) => {
        const ball = balls.find((b) => b === bodyA || b === bodyB);
        if (ball) {
            const pin = bodyA === ball ? bodyB : bodyA;

            if (pin.isStatic && pin !== hole) {
                pin.render.fillStyle = "#E0319C";

                if (isSound) {
                    playSound(bufferCache.touch, 0.16);
                }

                setTimeout(() => {
                    pin.render.fillStyle = "white";
                }, 300);
            }
        }
    });
});

Events.on(engine, "afterUpdate", () => {
    const ballsInField = balls.filter((ball) => ball.position.y < render.options.height + ballSize);
    if (ballsInField.length === 0 && balls.length > 0) {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (isSound) playSound(bufferCache.popup, 0.4);
            document.body.classList.add("modal");
        }, 1000);
    }
});

// Activate spans logic
const index = [6, 7, 5, 3, 8];
let currentIndex = 0;

function activateNext() {
    if (currentIndex < index.length) {
        const targetIndex = index[currentIndex];
        if (targetIndex === 3 && pins[25]) {
            Matter.Body.setPosition(pins[25], { x: 419, y: pins[25].position.y });
        }
        const targetSpan = document.querySelector(`.bowls .bowl:nth-child(${targetIndex}) span.x`);
        if (targetSpan) targetSpan.classList.add("active");
        currentIndex++;
    }
}

Events.on(engine, "afterUpdate", () => {
    const ballsInField = balls.filter((ball) => ball.position.y < render.options.height + 2 * ballSize);
    if (balls.length > ballsInField.length) {
        balls.splice(0, balls.length - ballsInField.length);
        if (isSound) playSound(bufferCache.out, 0.4);
        setTimeout(() => activateNext(), 100);
    }
});

Render.run(render);

const fixedDeltaTime = 1000 / 60;
setInterval(() => {
    Engine.update(engine, fixedDeltaTime);
}, fixedDeltaTime);

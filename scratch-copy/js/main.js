let click = 0;

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
    bufferCache.music = await loadAudio('./sounds/music.mp3');
    bufferCache.scratch = await loadAudio('./sounds/scratch.mp3');
    bufferCache.scratch1 = await loadAudio('./sounds/scratch1bonus.mp3');
    bufferCache.scratch2 = await loadAudio('./sounds/scratch2bonus.mp3');
    bufferCache.scratch3 = await loadAudio('./sounds/scratch3bonus.mp3');
    bufferCache.cong = await loadAudio('./sounds/cong.mp3');
    bufferCache.click = await loadAudio('./sounds/click.mp3');
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
    return source;
};

// Preload sounds and update the UI
const initApp = async () => {
    try {
        await preloadSounds();
        document.querySelectorAll(".card").forEach((w) => w.classList.remove('disable'));
    } catch (error) {
        console.error("Error preloading sounds:", error);
    }
};

let musicSource;

// Start the initialization process
initApp();

jQuery(function() {

    document.getElementById('currentYear').textContent = "\u00A0" + new Date().getFullYear().toString() + "\u00A0";

    window.addEventListener("load", () => {
        document.querySelector(".tabs").classList.remove('hidden');
    });

    jQuery('.cards').on('click', '.card', function () {
        var card = jQuery(this);

        if (card.hasClass('scratched') || card.hasClass('scratching') || card.hasClass('disable')) {
            return
        }
        card.addClass('scratching');
        card.find('.start-img').addClass('img-hidden');
        card.find('.play-img').removeClass('img-hidden');

        if (jQuery('.tab.sound').hasClass('active')) {
            playSound(bufferCache.scratch, 0.4);
        }

        if (click === 0) {
            playSound(bufferCache.scratch, 0.4);
            if (!musicSource) {
                musicSource = playSound(bufferCache.music, 0.2, true);
            }
            jQuery('.tabs .tab').removeClass('active');
            jQuery('.tab.sound').addClass('active');
        }

        ++click;


        setTimeout(function () {
            if (jQuery('.tab.sound').hasClass('active')) {
                playSound(bufferCache[`scratch${click}`], 0.4);
            }
            card.removeClass('scratching');
            card.addClass("scratched");

            card.find('.play-img').addClass('img-hidden');
            card.find('.last-img').removeClass('img-hidden');

            const cards = [...document.querySelectorAll(".card")];
            if (cards.length > 0 && cards.every((w) => w.classList.contains('scratched'))) {
                setTimeout(function () {

                    if (jQuery('.tab.sound').hasClass('active')) {
                        playSound(bufferCache.cong, 0.4);
                    }

                    document.querySelector('body').classList.add('show');
                }, 1000);
            }
        }, 1500);

    });

    jQuery('.tabs').on('click', '.tab', function () {
        jQuery('.tabs .tab').removeClass('active');
        jQuery(this).addClass('active');

        if (jQuery(this).hasClass('sound')) {
            if (!musicSource) {
                musicSource = playSound(bufferCache.music, 0.2, true);
            }
        } else {
            if (musicSource) {
                musicSource.stop();
                musicSource = null;
            }
        }
    });

    jQuery('a').on('click', function(e) {

        e.preventDefault();

        localStorage.setItem("play", "true");

        const checkInterval = setInterval(() => {
            if (localStorage.getItem("play") === "true") {
                clearInterval(checkInterval);
            }
        }, 50);

        if (jQuery('.tab.sound').hasClass('active')) {
            playSound(bufferCache.click, 0.4);
        }
        musicSource.stop();
        musicSource = null;

        window.location.href = '/go';
    });
    

});
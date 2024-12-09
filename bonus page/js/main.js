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
    bufferCache.clickS = await loadAudio('./sounds/click.mp3');
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

let musicSource;

// Preload all sounds
preloadSounds();

jQuery(function() {

    window.addEventListener("load", () => {
        document.querySelector(".tabs").classList.remove('hidden');
    });

    jQuery('.tabs').on('click', '.tab', function() {
        jQuery('.tabs .tab').removeClass('active');
        jQuery(this).addClass('active');

        if(jQuery(this).hasClass('sound')) {
            if (!musicSource) {
                musicSource = playSound(bufferCache.music, 0.1, true);
            }
        } else if (musicSource) {
            musicSource.stop();
            musicSource = null;
        }

    });

    jQuery('a').on('click', function(e) {

        localStorage.setItem("play", "true");

        const checkInterval = setInterval(() => {
            if (localStorage.getItem("play") === "true") {
                clearInterval(checkInterval);
            }
        }, 50);

        if (jQuery('.tab.active').hasClass('sound')) {
                playSound(bufferCache.clickS, 0.5);
                musicSource.stop();
                musicSource = null;
        }

        window.location.href = '/go';
    });

});


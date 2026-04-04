export const keys = {};

export const input = {
    latestKey: null
};

window.addEventListener('keydown', (e) =>  {
    keys[e.code] = true;
    input.latestKey = e.code;
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
    if (input.latestKey === e.code) {
        if (keys['ArrowLeft']) input.latestKey = 'ArrowLeft';
        else if (keys['ArrowRight']) input.latestKey = 'ArrowRight';
        else input.latestKey = null;
    }
});

window.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0]; // ← senast tillagda fingret
    if (touch.clientX < window.innerWidth / 2) {
        input.latestKey = 'ArrowLeft';
    } else {
        input.latestKey = 'ArrowRight';
    }
});

window.addEventListener('touchend', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch.clientX < window.innerWidth / 2) {
            input.latestKey = 'ArrowLeft';
        } else {
            input.latestKey = 'ArrowRight';
        }
    } else {
        input.latestKey = null;
    }
});
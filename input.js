export const keys = {};

export let latestKey = null;

window.addEventListener('keydown', (e) =>  {
    keys[e.code] = true;
    latestKey = e.code;
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
    if (latestKey === e.code) {
        if (keys['ArrowLeft']) latestKey = 'ArrowLeft';
        else if (keys['ArrowRight']) latestKey = 'ArrowRight';
        else latestKey = null;
    }
});

window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch.clientX < window.innerWidth / 2) {
            keys['ArrowLeft'] = true;
        } else {
            keys['ArrowRight'] = true;
        }
});
    
    window.addEventListener('touchend', () => {
        keys['ArrowLeft'] = false;
        keys['ArrowRight'] = false;
});
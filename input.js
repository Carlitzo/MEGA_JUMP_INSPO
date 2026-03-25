export const keys = {};

window.addEventListener('keydown', (e) => keys[e.code] = true );
window.addEventListener('keyup', (e) => keys[e.code] = false );

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
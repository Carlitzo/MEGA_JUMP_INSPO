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

// window.addEventListener('touchstart', (e) => {
//         const touch = e.touches[0];
//         if (touch.clientX < window.innerWidth / 2) {
//             keys['ArrowLeft'] = true;
//             input.latestKey = 'ArrowLeft';
//         } else {
//             keys['ArrowRight'] = true;
//             input.latestKey = 'ArrowRight';
//         }
// });

window.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0]; // ← senast tillagda fingret
    if (touch.clientX < window.innerWidth / 2) {
        input.latestKey = 'ArrowLeft';
    } else {
        input.latestKey = 'ArrowRight';
    }
});
    
// window.addEventListener('touchend', () => {
//         keys['ArrowLeft'] = false;
//         keys['ArrowRight'] = false;
//         input.latestKey = null;
// });
window.addEventListener('touchend', (e) => {
    // Om det fortfarande finns fingrar på skärmen, uppdatera till det kvarvarande fingret
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch.clientX < window.innerWidth / 2) {
            input.latestKey = 'ArrowLeft';
        } else {
            input.latestKey = 'ArrowRight';
        }
    } else {
        // Inga fingrar kvar på skärmen
        input.latestKey = null;
    }
});
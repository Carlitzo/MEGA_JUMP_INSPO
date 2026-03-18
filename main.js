import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { preloadAssets } from './preloadAssets.js';
import { renderInitialAssets } from './renderInitialAssets.js';

export const gameAssets = {
        intialBackground: '',
        backgrounds: [],
        collectibles: [],
        player: null
};

const app = new Application();
export let gameStarted = false;

(async () => {

   	await app.init({ resizeTo: window, backgroundColor: 0x87ceeb});

        document.body.appendChild(app.canvas);
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
        app.canvas.style.objectFit = 'cover';

        await preloadAssets(app);
        renderInitialAssets(app);
        
})();

// rendera bakgrunden, skapa bober, 

// funktion som startar själva spelet när bober hoppar
// gameStarted = true, continuallyRenderBackgrounds(app), renderLogs(app)
function startGame() {

}

// rendera alla bakgrunder som inte har bottenplan
// inuti denna finns en app.ticker som körs så fort som startGame() har anropats (startGame anropar denna funktionen)
// app.ticker kontrollerar vilken bakgrundsbild som just nu syns och hanterar loopandet av bakgrundsbilder.
export function continuallyRenderBackgrounds(app) {

}
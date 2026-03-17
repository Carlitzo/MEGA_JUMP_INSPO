import { Application, Sprite, Container, Assets } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { preloadAssets } from './preloadAssets.js';

export const gameAssets = {
        intialBackground: '',
        backgrounds: [],
        character: {
                flying: [],
                idle: [],
                jumping: [],
                moving: []
        },
        collectibles: []
};

const app = new Application();
let gameStarted = false;

(async () => {

   	await app.init({ resizeTo: window, backgroundColor: 0x87ceeb});

        document.body.appendChild(app.canvas);

        await preloadAssets(app);

        console.log(gameAssets);

})();

// rendera bakgrunden, skapa bober, 

// funktion som intierar spelet genom att en gång anropa renderInitialAssets, renderLogs
function initializeGame() {

}

// funktion som startar själva spelet när bober hoppar
// gameStarted = true, continuallyRenderBackgrounds(app), renderLogs(app)
function startGame() {

}

// funktion som renderar alla initiala assets (bakgrund, bober, logs(via anrop till renderLogs));
// render bober kan göras inuti denna
// render background med startpad inuti denna
export function renderInitialAssets(app) {

}

// rendera alla bakgrunder som inte har bottenplan
// inuti denna finns en app.ticker som körs så fort som startGame() har anropats (startGame anropar denna funktionen)
// app.ticker kontrollerar vilken bakgrundsbild som just nu syns och hanterar loopandet av bakgrundsbilder.
export function continuallyRenderBackgrounds(app) {

}

// rendera alla logs i spelet, om gameStarted = false rendera de första logsen på nuvarande skärmen
// om gameStarted är true så rendera alla logs på nästakommande bakgrundsbild istället
export function renderLogs(app) {

        if (!gameStarted) {
        // Rendera logs i start-vyn (dvs samma bakgrundsbild som bober befinner sig i);
        } else {
        // Rendera logs i nästkommande vy så att spelet kontinuerligt renderas
                app.ticker.add((time) => {
                        const dx = time.deltaTime * 0.2;
                        
                });
        };
}
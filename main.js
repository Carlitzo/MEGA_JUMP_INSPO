import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { preloadAssets } from './preloadAssets.js';
import { renderInitialAssets } from './renderInitialAssets.js';
import { keys } from './input.js';

export const gameAssets = {
        intialBackground: '',
        backgrounds: [],
        collectibles: [],
        player: null
};

const app = new Application();
export const world = new Container();
export let gameStarted = false;

(async () => {

   	await app.init({ resizeTo: window, backgroundColor: 0x87ceeb});

        document.body.appendChild(app.canvas);
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
        app.canvas.style.objectFit = 'cover';
        app.stage.addChild(world);

        await preloadAssets(app);
        renderInitialAssets(app);

        app.ticker.add((time) => {
                const dt = 4 * time.deltaTime;
                if (keys['ArrowLeft']) {
                        gameAssets.player.container.x -= dt;
                        gameAssets.player.setState('walking');
                        gameAssets.player.container.scale.x = -0.38;
                } else if (keys['ArrowRight']) {
                        gameAssets.player.container.x += dt;
                        gameAssets.player.setState('walking');
                        gameAssets.player.container.scale.x = 0.38;
                } else {
                        gameAssets.player.setState('idle');
                }
                if (keys['ArrowUp'] && !gameStarted) {
                        startGame();
                }

                const halfWidth = gameAssets.player.container.width / 6;
                gameAssets.player.container.x = Math.max(halfWidth, Math.min(app.screen.width - halfWidth, gameAssets.player.container.x));
        })

})();

// rendera bakgrunden, skapa bober, 

// funktion som startar själva spelet när bober hoppar
// gameStarted = true, continuallyRenderBackgrounds(app), renderLogs(app)
function startGame() {

        app.ticker.add((time) => {
                // Här vill vi uppdatera bakgrundsbilder;

        })
}

let chunks = [];

export function updateChunks() {
        // Kod för att hitta chunken som är högst upp och längst ner
        const topChunk = chunks.reduce((a, b) => a.y < b.y ? a : b);
        const bottomChunk = chunks.reduce((a, b) => a.y > b.y ? a : b);
        console.log(topChunk.y);
        console.log(bottomChunk.y);
}

export function createChunk(worldY, app, bgAlias) {
        const background = Sprite.from(bgAlias);
        background.width = app.screen.width;
        background.height = app.screen.height;
        background.y = worldY;
        world.addChild(background);
        chunks.push(background);

        return background;
}
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
const chunks = [];
let currentHighest = 0;
let lowestAllowed = 0;

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
                        startGame(app);
                }

                const halfWidth = gameAssets.player.container.width / 8;
                gameAssets.player.container.x = Math.max(halfWidth, Math.min(app.screen.width - halfWidth, gameAssets.player.container.x));
        })

})();

// funktion som startar själva spelet när bober hoppar
// gameStarted = true, continuallyRenderBackgrounds(app), renderLogs(app)
async function startGame(app) {
        
        gameStarted = true;

        await launchCharacter(app);
        let playerScreenY = (app.screen.height / 2) + (gameAssets.player.container.height / 2);

        const onTick = (time) => {
                const dx = time.deltaTime;
                gameAssets.player.setState('flying');
                // Decay the vertical speed by decayrate every tick
                gameAssets.player.velocityY -= gameAssets.player.decayRate;
                // Move world down by velocityY * dx every tick
                world.y += (gameAssets.player.velocityY * dx);
                // Center bober on the screen :)
                gameAssets.player.container.y = playerScreenY;
                // Shift the out of view chunks up
                updateChunks();

                // Check if bober.y > app.screen.height + (app.screen.height * 0.01) 
                // to check if bober has fallen, if he has, lose game and camera doesnt follow

                if (currentHighest < world.y) currentHighest = world.y;

                lowestAllowed = currentHighest + (gameAssets.player.container.height * 4);
                
                if (Math.abs(world.y) > Math.abs(lowestAllowed)) {
                        terminateGame(app, onTick);
                }
        };
        app.ticker.add(onTick);
}

async function launchCharacter(app) {
        
        return new Promise((resolve) => {
                const onTick = (time) => {
                        const dx = time.deltaTime;
                        //world.y += gameAssets.player.velocityY * dx;
                        gameAssets.player.container.y -= (gameAssets.player.velocityY * 1.2);                        

                        if (gameAssets.player.container.y <= (app.screen.height / 2) + (gameAssets.player.container.height / 2)) {
                                app.ticker.remove(onTick);
                                resolve();
                        }
                };

                app.ticker.add(onTick);
        });
}

export function updateChunks() {
        // Kod för att hitta chunken som är högst upp och längst ner
        const topChunk = chunks.reduce((a, b) => a.y < b.y ? a : b);
        const bottomChunk = chunks.reduce((a, b) => a.y > b.y ? a : b);

        if ( bottomChunk.y + world.y > (app.screen.height * 3) ) {
                bottomChunk.y = topChunk.y - (app.screen.height * 2);
        }
}

function terminateGame(app, ticker) {
        app.ticker.remove(ticker);

        app.ticker.add( (time) => {
                let dx = time.deltaTime;
                gameAssets.player.container.y -= gameAssets.player.velocityY * dx;
        });
        console.log("TERMINATE");
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
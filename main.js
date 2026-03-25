import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { preloadAssets } from './preloadAssets.js';
import { renderInitialAssets } from './renderInitialAssets.js';
import { keys } from './input.js';
import { renderLogs } from './renderLogs.js';

export const gameAssets = {
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
                const dt = 8 * time.deltaTime;
                if (keys['ArrowLeft']) {
                        gameAssets.player.container.x -= dt;
                        gameAssets.player.setState('walking');
                        gameAssets.player.container.scale.x = -0.22;
                } else if (keys['ArrowRight']) {
                        gameAssets.player.container.x += dt;
                        gameAssets.player.setState('walking');
                        gameAssets.player.container.scale.x = 0.22;
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

async function startGame(app) {
        
        gameStarted = true;

        await launchCharacter(app);
        let playerScreenY = (app.screen.height / 2) + (gameAssets.player.container.height / 2);

        const onTick = (time) => {
                const dx = time.deltaTime;
                gameAssets.player.setState('flying');
                gameAssets.player.velocityY -= gameAssets.player.decayRate * dx;
                world.y += (gameAssets.player.velocityY * dx);
                gameAssets.player.container.y = playerScreenY;
                updateChunks();

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
                        
                        gameAssets.player.container.y -= (gameAssets.player.velocityY * 2);                        

                        if (gameAssets.player.container.y <= (app.screen.height / 2) + (gameAssets.player.container.height / 2)) {
                                app.ticker.remove(onTick);
                                resolve();
                        }
                };

                app.ticker.add(onTick);
        });
}

export async function updateChunks() {
        const topChunk = chunks.reduce((a, b) => a.y < b.y ? a : b);
        const bottomChunk = chunks.reduce((a, b) => a.y > b.y ? a : b);
        
        if ( bottomChunk.y + world.y > (app.screen.height * 3) ) {
                let newY = topChunk.y - app.screen.height;
                console.log("här")

                bottomChunk.children
                        .filter(child => {child instanceof Container})
                        .forEach(child => {child.destroy({children: true})});

                bottomChunk.y = newY;
                await renderLogs(app, bottomChunk, false);
                
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

export async function createChunk(worldY, app, bgAlias, addLogs = false, initialChunk = false) {
        const bgContainer = new Container();
        const texture = Assets.get(bgAlias);
        const background = new Sprite(texture);

        background.anchor.set(0.5, 1);

        background.width = app.screen.width;
        background.height = app.screen.height;

        bgContainer.width = app.screen.width;
        bgContainer.height = app.screen.height;

        bgContainer.x = app.screen.width / 2;
        bgContainer.y = worldY;

        bgContainer.addChild(background);
        world.addChild(bgContainer);
        chunks.push(bgContainer);

        if (addLogs) {
                await renderLogs(app, bgContainer, initialChunk);
        }
        return background;
}
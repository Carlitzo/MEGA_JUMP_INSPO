import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { animationObj } from './preloadAssets.js';
import { preloadAssets } from './preloadAssets.js';
import { renderInitialAssets } from './renderInitialAssets.js';
import { keys } from './input.js';
import { renderLogs } from './renderLogs.js';
import { Bober } from './bober.js';
import { renderScore } from './renderScore.js';
import { score } from './renderScore.js';
import { determineEffect } from './determineEffect.js';

export const gameAssets = {
        collectibles: [],
        player: null
};

// const isJuicy = await fetchGameMode(); // hämta flagga från server
const versionObj = await (await fetch("/getVersion")).json();
// const isJuicy = versionObj.versionFlag;
export const isJuicy = true;
const version = versionObj.version;

const module = isJuicy
    ? await import('./effectsJuicy.js')
    : await import('./effects.js');

export const effects = module.default;

const app = new Application();
export const world = new Container();
export let gameStarted = false;
export let chunkCounter = 0;
let chunks = [];
let startTime = null;
let currentHighest = 0;
let lowestAllowed = 0;

(async () => {
        const localID = localStorage.getItem("id");

        localStorage.setItem("version", version);

        if (!localID) {
                const newID = await (await (await fetch("/getID")).json()).userID;
                localStorage.setItem("id", newID);
                console.log(newID);
        }

   	await app.init({ resizeTo: window, backgroundColor: 0x87ceeb});

        document.body.appendChild(app.canvas);
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
        app.canvas.style.objectFit = 'cover';
        app.stage.addChild(world);

        await preloadAssets(app);

        // TODO: Ta bort efter varje spel och re-attacha genom att flytta tickern till renderStartScreen()
        // Ska vi bara ha en global variabel som innehåller alla tickerfunktioner? Så vi kan accessa alla där och ta bort dem?
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
                };

                const halfWidth = gameAssets.player.container.width / 8;
                gameAssets.player.container.x = Math.max(halfWidth, Math.min(app.screen.width - halfWidth, gameAssets.player.container.x));
        });

        renderStartScreen(app);
})();

function renderStartScreen(app) {
        renderInitialAssets(app);
        renderScore(app);

        const img = document.createElement("img");
        document.body.appendChild(img);
        img.src = './Assets/UI_Assets/Play.png';
        img.id = 'startGameBtn';

        img.addEventListener("click", startGameButton);
}

function startGameButton(event) {
        function clickedButton(image) {
                image.style.transform = 'scale(0.9)';
                image.style.filter = 'drop-shadow(0 0 0.4rem white)';
        }

        let img = event.currentTarget;
        
        clickedButton(img);
        setTimeout(() => {
                img.remove();
                startGame(app);
        }, 150);
}

async function startGame(app) {
        
        startTime = Date.now();
        gameStarted = true;

        await launchCharacter(app);
        let playerScreenY = (app.screen.height / 2) + (gameAssets.player.container.height / 2);

        const onTick = (time) => {
                const dx = time.deltaTime;
                gameAssets.player.setState('flying');
                gameAssets.player.velocityY -= gameAssets.player.decayRate * dx;
                world.y += (gameAssets.player.velocityY * dx);
                gameAssets.player.container.y = playerScreenY;
                updateChunks(app);

                if (world.y > currentHighest) {
                        currentHighest = world.y;
                        lowestAllowed = currentHighest - (gameAssets.player.container.height * 4);
                }

                
                if (world.y < lowestAllowed) {
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

export async function updateChunks(app) {
        const topChunk = chunks.reduce((a, b) => a.y < b.y ? a : b);
        const bottomChunk = chunks.reduce((a, b) => a.y > b.y ? a : b);
        
        const newTexture = Assets.get('backgroundWithoutStart_03');
        const oldTexture = Assets.get('backgroundWithStart');
        let sprite = bottomChunk.children[0];

        if (sprite.texture == oldTexture) {
                sprite.texture = newTexture;
        }
        
        if ( bottomChunk.y + world.y > (app.screen.height * 3) ) {
                let newY = topChunk.y - app.screen.height;
                console.log(chunkCounter);

                bottomChunk.children
                        .filter(child => child.label === "logContainer")
                        .forEach(child => {child.destroy({children: true})});

                bottomChunk.children
                        .filter(child => child.label === 'luckyCharm')
                        .forEach(child => child.destroy({children: true}));

                bottomChunk.children
                        .filter(child => child.label === 'magnet')
                        .forEach(child => child.destroy({children: true}));

                bottomChunk.y = newY;

                if (chunkCounter === 2) {
                        determineEffect(bottomChunk, app);
                        chunkCounter = 0;
                } else chunkCounter++;

                await renderLogs(app, bottomChunk, false);
        }
}

function terminateGame(app, ticker) {
        const elapsed = Date.now() - startTime;
        const seconds = (elapsed / 1000).toFixed(2);
        console.log(`Game lasted ${seconds} seconds`);
        app.ticker.remove(ticker);
        gameStarted = false;

        const onTick = async (time) => {
                let dx = time.deltaTime;
                gameAssets.player.container.y -= gameAssets.player.velocityY * dx;

                if (gameAssets.player.velocityY > 0) gameAssets.player.velocityY = -15;

                if (gameAssets.player.container.y > app.screen.height + (app.screen.height * 0.25)) {
                        await resetGame(app, onTick);
                }
        };
        app.ticker.add(onTick);
}

async function sendGameToDB() {
        const gameUserID = localStorage.getItem("id");
        const gameScore = score;
        const gameStartTime = startTime;
        const gameEndTime = Date.now();
        const gameVersion = localStorage.getItem("version");

        const data = JSON.stringify({
                userID: gameUserID,
                startTime: gameStartTime,
                endTime: gameEndTime,
                version: gameVersion,
                score: gameScore
        });

        await fetch("/finish", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data
        });
}

async function resetGame(app, ticker) {
        
        app.ticker.remove(ticker);
        await sendGameToDB();
        world.removeChildren();
        
        chunks = [];
        startTime = null;
        currentHighest = 0;
        lowestAllowed = 0;
        world.y = 0;
        document.getElementById("scoreBG").remove();

        const luckyBorder = app.stage.getChildByName('luckyBorder');
        if (luckyBorder) luckyBorder.destroy();

        const magnetBorder = app.stage.getChildByName('magnetBorder');
        if (magnetBorder) magnetBorder.destroy();

        gameAssets.player = new Bober(app, animationObj);

        renderStartScreen(app);
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
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
export const world = new Container();
export let gameStarted = false;
let chunks = [];

(async () => {
        
        await app.init({ resizeTo: window, backgroundColor: 0x87ceeb});
        
        document.body.appendChild(app.canvas);
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
        app.canvas.style.objectFit = 'cover';
        
        await preloadAssets(app);
        app.stage.addChild(world);
        await renderInitialAssets(app);
        
})();

// rendera bakgrunden, skapa bober, 

// funktion som startar själva spelet när bober hoppar
// gameStarted = true, continuallyRenderBackgrounds(app), renderLogs(app)
function startGame() {
        gameStarted = true;

        app.ticker.add((time) => {
                if (!gameAssets.player) return;

                world.y += gameAssets.player.velocityY * time.deltaTime;

                updateChunks(app);
        })
}

// Detta värdet hade egentligen varit bättre i ett game-state men har det här sålänge. 
// Kommer höjas/sänkas varje gång en spelaren typ tar en boost eller ett log osv.
// Används i vår ticker så att vi vet hur mycket vi ska röra världen vid varje tick

// Denna funktionen ska ha hand om att sortera om alla chunksen vid spelande
// Problem -> Kan inte kolla chunk.y för att bestämma positionen då chunk.y alltid kommer att vara densamma
// Kanske bättre att wrappa alla backgrounds i en större container, typ "world" och sen kolla vart allt ligger på y-axeln relativt till world?
export function updateChunks() {
        // Kod för att hitta chunken som är högst upp och längst ner
        chunks.forEach((chunk) => {
                const globalY = chunk.getGlobalPosition().y;

                if (globalY > app.screen.height) {
                        const topChunk = chunk.reduce((a, b) => a.y < b.y ? a : b);
                };

                chunk.y = topChunk.y - app.screen.height;

                if (chunk.logContainer) {
                        chunk.logContainer.destroy({children: true});
                        chunk.logContainer = null;
                }

                renderLogs(app, chunk);
        })
}

// Skapar och populate:ar arrayen 'chunks' med bakgrunds-sprites som kan återanvändas.
// Måste bara komma på något sätt att ta bort start-chunkens bild och ersätta den med rätt sprite
export async function createChunk(worldY, app) {
        const background = Sprite.from('backgroundWithoutStart_03');
        background.width = app.screen.width;
        background.height = app.screen.height;

        background.logContainer = null;

        world.addChild(background);
        chunks.push(background);
        
        return background;
}
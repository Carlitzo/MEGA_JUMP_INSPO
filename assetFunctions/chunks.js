import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { world } from '../variables/variables.js';
import { renderLogs } from '../renderFunctions/renderLogs.js';
import { determineEffect } from '../effectFunctions/determineEffect.js';

export let chunks = [];
export let chunkCounter = 0;

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

                bottomChunk.children
                        .filter(child => child.label === "logContainer")
                        .forEach(child => {child.destroy({children: true})});

                bottomChunk.children
                        .filter(child => child.label === 'luckyCharm')
                        .forEach(child => child.destroy({children: true}));
                
                bottomChunk.children
                        .filter(child => child.label === 'fireball')
                        .forEach(child => child.destroy({children: true}));

                bottomChunk.children
                        .filter(child => child.label === 'magnet')
                        .forEach(child => child.destroy({children: true}));

                bottomChunk.children
                        .filter(child => child.label === 'computer')
                        .forEach(child => child.destroy({children: true}));

                bottomChunk.y = newY;

                if (chunkCounter === 3) {
                        determineEffect(bottomChunk, app);
                        chunkCounter = 0;
                } else chunkCounter++;

                await renderLogs(app, bottomChunk, false);
        }
}

export function resetChunks() {
        chunks = [];
        return;
}
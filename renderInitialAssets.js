import { Sprite, Container, Assets, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { renderLogs } from './renderLogs.js';
import { gameAssets, createChunk, updateChunks, world } from './main.js';

export async function renderInitialAssets(app) {
        const bgContainer = new Container();
        const texture = Assets.get('backgroundWithStart');
        const backgroundSprite = new Sprite(texture);

        bgContainer.width = app.screen.width;
        bgContainer.height = app.screen.height;

        backgroundSprite.anchor.set(0.5, 1);
        backgroundSprite.width = app.screen.width;
        backgroundSprite.height = app.screen.height;
        backgroundSprite.x = app.screen.width / 2;
        backgroundSprite.y = app.screen.height;

        bgContainer.addChild(backgroundSprite);
        world.addChild(bgContainer);
        app.stage.addChild(gameAssets.player.container);

        createChunk(0, app, 'backgroundWithoutStart_03');
        createChunk(-app.screen.height, app, 'backgroundWithoutStart_03');
        createChunk(app.screen.height * 2, app, 'backgroundWithoutStart_03');
        createChunk(app.screen.height * 3, app, 'backgroundWithoutStart_03');
        
        await renderLogs(app, bgContainer);
        
}
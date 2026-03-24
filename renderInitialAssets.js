import { Sprite, Container, Assets, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { renderLogs } from './renderLogs.js';
import { gameAssets, createChunk, updateChunks, world } from './main.js';

export async function renderInitialAssets(app) {
        const texture = Assets.get('backgroundWithStart');
        const backgroundSprite = new Sprite(texture);

        backgroundSprite.anchor.set(0.5, 1);

        backgroundSprite.height = app.screen.height;
        backgroundSprite.width = app.screen.width;

        // const scaleX = app.screen.width / backgroundSprite.texture.width;
        // const scaleY = app.screen.height / backgroundSprite.texture.height;
        // const scale = Math.max(scaleX, scaleY);

        // backgroundSprite.scale.set(scale * 1.1);
        backgroundSprite.x = app.screen.width / 2;
        backgroundSprite.y = app.screen.height;

        world.addChild(backgroundSprite);
        app.stage.addChild(gameAssets.player.container);

        await renderLogs(app);

        createChunk(0, app, 'backgroundWithoutStart_03');
        createChunk(-app.screen.height, app, 'backgroundWithoutStart_03');
        createChunk(app.screen.height * 2, app, 'backgroundWithoutStart_03');
        
}
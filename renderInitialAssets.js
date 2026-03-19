import { Sprite, Container, Assets, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { renderLogs } from './renderLogs.js';
import { gameAssets } from './main.js';

// funktion som renderar alla initiala assets (bakgrund, bober, logs(via anrop till renderLogs));
// render bober kan göras inuti denna
// render background med startpad inuti denna
export async function renderInitialAssets(app) {
        const backgroundWithStart = await Assets.load(gameAssets.intialBackground);
        const backgroundSprite = new Sprite(backgroundWithStart);

        backgroundSprite.anchor.set(0.5, 1);

        const scaleX = app.screen.width / backgroundSprite.texture.width;
        const scaleY = app.screen.height / backgroundSprite.texture.height;
        const scale = Math.max(scaleX, scaleY);

        backgroundSprite.scale.set(scale);
        backgroundSprite.x = app.screen.width / 2;
        backgroundSprite.y = app.screen.height;

        app.stage.addChild(backgroundSprite, gameAssets.player.container);

        await renderLogs(app);
}
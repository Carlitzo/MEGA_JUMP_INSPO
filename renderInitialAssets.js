import { Sprite, Container, Assets, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { renderLogs } from './renderLogs.js';
import { gameAssets } from './main.js';

// funktion som renderar alla initiala assets (bakgrund, bober, logs(via anrop till renderLogs));
// render bober kan göras inuti denna
// render background med startpad inuti denna
export async function renderInitialAssets(app) {
        const backgroundWithStart = await Sprite.from(gameAssets.intialBackground);

        app.stage.addChild(gameAssets.player, backgroundWithStart);
}
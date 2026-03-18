import { Sprite, Container, Assets, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { renderLogs } from './renderLogs.js';

// funktion som renderar alla initiala assets (bakgrund, bober, logs(via anrop till renderLogs));
// render bober kan göras inuti denna
// render background med startpad inuti denna
export function renderInitialAssets(app) {
        const backgroundWithStart = Sprite.from();
        const bober = renderBober(app); // new Bober() (klass);

        app.addChild(bober, backgroundWithStart);

        return bober;
}
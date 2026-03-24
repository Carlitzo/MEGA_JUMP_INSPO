import { Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameStarted, gameAssets, world } from './main.js';

export async function renderLogs(app, chunk, initial = null) {
        const logContainer = new Container();
        const widthPadding = app.screen.width * 0.1;
        const heightPadding = -app.screen.height * 0.05;
        let logCount = 10;
        let logY = Math.random() * (chunk.height - heightPadding);

        logContainer.width = app.screen.width;
        logContainer.height = app.screen.height / 2;
        logContainer.interactiveChildren = true;
        logContainer.x = app.screen.width / 2;
        
        if (initial) logCount = 20;

        for (let i = 0; i < logCount; i++) {
                let logSprite = null;
                logSprite = Sprite.from('correctLog');
                
                const logX = (Math.random() * 2 - 1) * (app.screen.width / 2 - widthPadding);
                if (!initial) {
                        logY = Math.random() * (chunk.height / 2 - heightPadding);
                };

                logSprite.anchor.set(0.5, 0.5);
                logSprite.x = logX;
                logSprite.y = logY;
                logSprite.scale.set(0.04);
                logSprite.roundPixels = true;

                logContainer.addChild(logSprite);

                app.ticker.add((time) => {
                        const dx = time.deltaTime * 0.03;
        
                        logSprite.rotation += dx;
                });
        };

        chunk.addChild(logContainer);
}
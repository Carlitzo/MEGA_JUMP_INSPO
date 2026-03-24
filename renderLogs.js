import { Sprite, Container, Assets, Graphics, BlurFilter, ColorMatrixFilter } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameStarted, gameAssets, world } from './main.js';

export async function renderLogs(app) {
        const logContainer = new Container();
        const widthPadding = app.screen.width * 0.1;
        const heightPadding = -app.screen.height * 0.05;
        let logCount = 10;
        let logY = Math.random() * (app.screen.height - heightPadding);

        logContainer.width = app.screen.width;
        logContainer.height = app.screen.height / 2;
        logContainer.interactiveChildren = true;
        logContainer.x = app.screen.width / 2;
        
        if (gameStarted) logCount = 20;

        for (let i = 0; i < logCount; i++) {
                let logSprite = null;
                logSprite = Sprite.from('correctLog');
                
                const logX = (Math.random() * 2 - 1) * (app.screen.width / 2 - widthPadding);
                if (!gameStarted) {
                        logY = Math.random() * (app.screen.height / 2 - heightPadding);
                }

                logSprite.anchor.set(0.5, 0.5);
                logSprite.x = logX;
                logSprite.y = logY;
                logSprite.scale.set(0.04);
                logSprite.roundPixels = true;

                const colorMatrix = new ColorMatrixFilter();
                colorMatrix.matrix = [
                        1.5, 0, 0, 0, 1.5,    // röd kanal → max
                        0, 1.8, 0, 0, 1.8, // grön kanal → lite
                        0, 0, 0, 0, 0,    // blå kanal → ingen
                        0, 0, 0, 1, 0     // alpha
                ];
                
                
                const glowSprite = Sprite.from('correctLog');
                glowSprite.anchor.set(0.5, 0.5);
                glowSprite.x = logX;
                glowSprite.y = logY;
                glowSprite.roundPixels = true;
                glowSprite.tint = 0xFFD700;
                glowSprite.alpha = 1;
                glowSprite.scale.set(0.04);

                const blurFilter = new BlurFilter({strength: 15, quality: 5, });
                glowSprite.filters = [blurFilter, colorMatrix];

                logContainer.addChild(glowSprite);
                logContainer.addChild(logSprite);

                app.ticker.add((time) => {
                        const dx = time.deltaTime * 0.03;
        
                        logSprite.rotation += dx;
                        glowSprite.rotation += dx;
                });
        }

        world.addChild(logContainer);
}
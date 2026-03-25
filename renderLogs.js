import { Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameStarted, gameAssets, world } from './main.js';

export async function renderLogs(app, chunk, initial = true) {
        const logContainer = new Container();
        const widthPadding = app.screen.width * 0.2;
        const heightPadding = app.screen.height * 0.02;
        let logCount = 8;
        
        if (!initial) logCount = 20;

        logContainer.x = -app.screen.width / 2;
        logContainer.y = 0;
        
        for (let i = 0; i < logCount; i++) {
                const logSprite = Sprite.from('correctLog');
                
                const logX = widthPadding / 2 + Math.random() * (app.screen.width - widthPadding);

                const logY = initial ?
                        -(app.screen.height / 2) - Math.random() * (app.screen.height / 2)
                        :
                        -(heightPadding) - Math.random() * (app.screen.height + heightPadding * 2);

                logSprite.anchor.set(0.5, 0.5);
                logSprite.x = logX;
                logSprite.y = logY;
                logSprite.scale.set(0.04);
                logSprite.roundPixels = true;

                logContainer.addChild(logSprite);

                let hit = false;

                const onTick = (time) => {
                        const dx = time.deltaTime * 0.03;
                        
                        if (hit) return;

                        logSprite.rotation += dx;

                        const logBounds = logSprite.getBounds();
                        const playerBounds = gameAssets.player.container.getBounds();

                        if (
                                logBounds.x < playerBounds.x + playerBounds.width &&
                                logBounds.x + logBounds.width > playerBounds.x &&
                                logBounds.y < playerBounds.y + playerBounds.height &&
                                logBounds.y + logBounds.height > playerBounds.y
                        ) {
                                hit = true;
                                if (gameAssets.player.velocityY > 15) {
                                        gameAssets.player.velocityY + 8;
                                } else {
                                        gameAssets.player.velocityY = 15;
                                }
                                logSprite.destroy();
                        };
                };
                app.ticker.add(onTick);
                logSprite.on('destroyed', () => app.ticker.remove(onTick));
        };

        chunk.addChild(logContainer);
}
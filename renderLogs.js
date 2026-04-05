import { Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameAssets, effects } from './main.js';
import { getRandomInt } from './getRandomInt.js';
import { fireballActive } from './gamePlayEffects.js';


export async function renderLogs(app, chunk, initial = true) {
        
        let logCount = 5;
        const logContainer = new Container();
        const widthPadding = app.screen.width * 0.2;
        const heightPadding = app.screen.height * 0.02;
        const chainPosition = getRandomInt(logCount - 1);
        
        if (!initial) logCount = 6;

        logContainer.x = -app.screen.width / 2;
        logContainer.y = 0;

        const chunkTop = -app.screen.height + heightPadding;
        const chunkBottom = initial ?
                                -(app.screen.height / 2) + heightPadding
                                :
                                -heightPadding
        const floorHeight = (chunkBottom - chunkTop) / logCount;
        
        for (let i = 0; i < logCount; i++) {
                const logSprite = Sprite.from('smolLog');
                
                const band = i % 3;
                const bandWidth = (app.screen.width - widthPadding * 2) / 3;
                const bandStart = widthPadding + band * bandWidth;
                const logX = bandStart + Math.random() * bandWidth;

                const floorTop = chunkTop + i * floorHeight;
                const logY = floorTop + Math.random() * floorHeight * 0.8;
                
                logSprite.anchor.set(0.5, 0.5);
                logSprite.x = logX;
                logSprite.y = logY;
                logSprite.scale.set(0.06);
                logSprite.roundPixels = true;
                
                logContainer.addChild(logSprite);

                if (chainPosition === i) {
                        let chainedLogSpriteX = logX;
                        let chainedLogSpriteY = logY;
                        for (let i = 0; i < 4; i++) {
                                let chainedLogSprite = Sprite.from('smolLog');
                                if (band === 0) {
                                        chainedLogSpriteX += (chainedLogSpriteX * 0.07);
                                } else if (band === 1) {
                                        let chainDecider = getRandomInt(2);
                                        if (chainDecider === 1) {
                                                chainedLogSpriteX += (chainedLogSpriteX * 0.07);
                                        } else {
                                                chainedLogSpriteX -= (chainedLogSpriteX * 0.07);
                                        }
                                } else if (band === 2) {
                                        chainedLogSpriteX -= (chainedLogSpriteX * 0.07);
                                }
                                chainedLogSpriteY -= (chainedLogSpriteY * 0.07);

                                chainedLogSprite.anchor.set(0.5, 0.5);
                                chainedLogSprite.x = chainedLogSpriteX;
                                chainedLogSprite.y = chainedLogSpriteY
                                chainedLogSprite.scale.set(0.06);
                                chainedLogSprite.roundPixels = true;

                                logContainer.addChild(chainedLogSprite);

                                let hit = false;

                                const onTick = (time) => {
                                        const dx = time.deltaTime * 0.03;
                        
                                        if (hit) return;

                                        chainedLogSprite.rotation += dx;

                                        const chainedLogBounds = chainedLogSprite.getBounds();
                                        const playerBounds = gameAssets.player.playerHitbox.bounds;

                                        if (
                                                chainedLogBounds.x < playerBounds.x + playerBounds.width &&
                                                chainedLogBounds.x + chainedLogBounds.width > playerBounds.x &&
                                                chainedLogBounds.y < playerBounds.y + playerBounds.height &&
                                                chainedLogBounds.y + chainedLogBounds.height > playerBounds.y
                                        ) {
                                                if (!gameAssets.player.playerHitbox.active) return;
                                                hit = true;
                                                
                                                if (!fireballActive) {
                                                        if (gameAssets.player.velocityY > 19) {
                                                                gameAssets.player.velocityY = 15;
                                                        } else {
                                                                gameAssets.player.velocityY = 19;
                                                        }
                                                }
                                                window.dispatchEvent(new CustomEvent('logHit'));
                                                effects.onLogHitAnimation(app, chainedLogSprite);
                                                chainedLogSprite.destroy();
                                        };
                                };

                                app.ticker.add(onTick);
                                chainedLogSprite.on('destroyed', () => app.ticker.remove(onTick));
                        };
                };

                let hit = false;

                const onTick = (time) => {
                        const dx = time.deltaTime * 0.03;
                        
                        if (hit) return;

                        logSprite.rotation += dx;

                        const logBounds = logSprite.getBounds();
                        const playerBounds = gameAssets.player.playerHitbox.bounds;

                        if (
                                logBounds.x < playerBounds.x + playerBounds.width &&
                                logBounds.x + logBounds.width > playerBounds.x &&
                                logBounds.y < playerBounds.y + playerBounds.height &&
                                logBounds.y + logBounds.height > playerBounds.y
                        ) {
                                if (!gameAssets.player.playerHitbox.active) return;
                                hit = true;
                                if (!fireballActive) {
                                        if (gameAssets.player.velocityY > 19) {
                                                gameAssets.player.velocityY = 15;
                                        } else {
                                                gameAssets.player.velocityY = 19;
                                        }
                                }
                                window.dispatchEvent(new CustomEvent('logHit'));
                                effects.onLogHitAnimation(app, logSprite);
                                logSprite.destroy();
                        };
                };

                app.ticker.add(onTick);
                logSprite.on('destroyed', () => app.ticker.remove(onTick));
        };

        logContainer.label = "logContainer";
        chunk.addChild(logContainer);
}
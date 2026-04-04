import { Sprite, Container, Assets, Graphics, AnimatedSprite, Texture } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { GlowFilter } from 'https://cdn.jsdelivr.net/npm/pixi-filters@6/dist/pixi-filters.mjs';
import { gameAssets, effects, isJuicy, world } from './main.js';

export let multiplier = 7;
let magnetCount = 0;
export let fireballActive = false;

export const gamePlayEffects =  {
        onLuckyCharm: (chunk, app) => {
                console.log("luckyCharm rendered on chunk")

                const luckSprite = Sprite.from('luckyCharm');
                luckSprite.label = 'luckyCharm';

                const widthPadding = app.screen.width * 0.2;
                const heightPadding = app.screen.height * 0.2;
                
                const luckX = (-app.screen.width / 2) + widthPadding + Math.random() * (app.screen.width - widthPadding * 2);
                const luckY = (-app.screen.height + heightPadding) + Math.random() * (app.screen.height - heightPadding * 2);
                
                let glowFilter = undefined;

                luckSprite.anchor.set(0.5, 0.5);
                luckSprite.x = luckX;
                luckSprite.y = luckY;
                luckSprite.scale.set(0.22);
                luckSprite.roundPixels = true;
                
                glowFilter = effects.applyStaticEffects(app, 'luckyCharm');

                if (glowFilter) luckSprite.filters = [glowFilter.filter];
                
                let hit = false;
                
                const onTick = (time) => {
                        
                        if (glowFilter) glowFilter.filter.outerStrength = 4 + Math.sin(Date.now() * 0.005) * 3; 

                        if (hit) return;

                        const luckBounds = luckSprite.getBounds();
                        const playerBounds = gameAssets.player.playerHitbox.bounds;

                        if (
                                luckBounds.x < playerBounds.x + playerBounds.width &&
                                luckBounds.x + luckBounds.width > playerBounds.x &&
                                luckBounds.y < playerBounds.y + playerBounds.height &&
                                luckBounds.y + luckBounds.height > playerBounds.y
                        ) {
                                console.log("hit luck");
                                hit = true;
                                if (!fireballActive) {
                                        if (gameAssets.player.velocityY > 15) {
                                                gameAssets.player.velocityY = 13;
                                        } else {
                                                gameAssets.player.velocityY = 15;
                                        }
                                }
                                
                                effects.onLuckyHitAnimation(app, 'start');
                                luckSprite.destroy();
                                gamePlayEffects.startEffectTimer('luckyCharm', app);
                        };
                }
                
                app.ticker.add(onTick);
                luckSprite.on('destroyed', () => {
                        app.ticker.remove(onTick);
                        if (glowFilter) app.ticker.remove(glowFilter.tickerID);
                });
                console.log(luckSprite.filters);
                chunk.addChild(luckSprite);
        },
        onMagnet: (chunk, app) => {
                const magnetSprite = Sprite.from('magnet');
                magnetSprite.label = 'magnet';

                const widthPadding = app.screen.width * 0.2;
                const heightPadding = app.screen.height * 0.2;
                
                const magnetX = (-app.screen.width / 2) + widthPadding + Math.random() * (app.screen.width - widthPadding * 2);
                const magnetY = (-app.screen.height + heightPadding) + Math.random() * (app.screen.height - heightPadding * 2);
                
                magnetSprite.anchor.set(0.5, 0.5);
                magnetSprite.x = magnetX;
                magnetSprite.y = magnetY;
                magnetSprite.scale.set(0.22);
                magnetSprite.roundPixels = true;
                                
                let hit = false;

                const onTick = (time) => {
                        
                        if (hit) return;

                        const magnetBounds = magnetSprite.getBounds();
                        const playerBounds = gameAssets.player.playerHitbox.bounds;

                        if (
                                magnetBounds.x < playerBounds.x + playerBounds.width &&
                                magnetBounds.x + magnetBounds.width > playerBounds.x &&
                                magnetBounds.y < playerBounds.y + playerBounds.height &&
                                magnetBounds.y + magnetBounds.height > playerBounds.y
                        ) {
                                console.log("hit magnet");
                                hit = true;
                                if (gameAssets.player.velocityY > 15) {
                                        gameAssets.player.velocityY = 13;
                                } else {
                                        gameAssets.player.velocityY = 15;
                                }
                                
                                effects.onMagnetHitAnimation(app, 'start');
                                magnetSprite.destroy();
                                gamePlayEffects.startEffectTimer('magnet', app);
                        };
                }
                
                app.ticker.add(onTick);
                magnetSprite.on('destroyed', () => {
                        app.ticker.remove(onTick);
                });
                chunk.addChild(magnetSprite);

                
        },
        onFireball: (chunk, app) => {

                
                console.log('fireball rendered on app');
                
                const frames = [
                        Texture.from('fireball1'),
                        Texture.from('fireball2'),
                        Texture.from('fireball3'),
                        Texture.from('fireball4'),
                        Texture.from('fireball5'),
                        Texture.from('fireball6'),
                        Texture.from('fireball7'),
                ];
                // Behöver anropa effects.applyStaticEffects(app, 'fireball');
                // Behöver anropa effects.onFireballHit();
                let fireball = null;
                if (isJuicy) {
                        fireball = new AnimatedSprite(frames);
                } else {
                        fireball = Sprite.from('fireball1');
                }
                
                fireball.label = 'fireball';

                const widthPadding = app.screen.width * 0.2;
                const heightPadding = app.screen.height * 0.2;
                
                const fireX = (-app.screen.width / 2) + widthPadding + Math.random() * (app.screen.width - widthPadding * 2);
                const fireY = (-app.screen.height + heightPadding) + Math.random() * (app.screen.height - heightPadding * 2);

                fireball.anchor.set(0.5, 0.5);
                fireball.x = fireX;
                fireball.y = fireY;
                fireball.scale.set(0.22);
                fireball.roundPixels = true;

                let glowFilter = undefined;

                glowFilter = effects.applyStaticEffects(app, 'fireball', fireball);

                if (glowFilter) fireball.filters = [glowFilter.filter];

                let hit = false;
                
                const onTick = (time) => {
                        const dx = time.deltaTime;

                        if (glowFilter) glowFilter.filter.outerStrength = 4 + Math.sin(Date.now() * 0.005) * 3;

                        if (hit) return;

                        const fireBounds = fireball.getBounds();
                        const playerBounds = gameAssets.player.playerHitbox.bounds;

                        if (
                                fireBounds.x < playerBounds.x + playerBounds.width &&
                                fireBounds.x + fireBounds.width > playerBounds.x &&
                                fireBounds.y < playerBounds.y + playerBounds.height &&
                                fireBounds.y + fireBounds.height > playerBounds.y
                        ) {
                                if (fireballActive) return;
                                console.log("hit luck");
                                hit = true;
                                fireballActive = true;

                                gameAssets.player.velocityY = 20;
                                gameAssets.player.decayRate = 0;
                                
                                effects.onFireballHitAnimation(app, 'start');
                                fireball.destroy();
                                gamePlayEffects.startEffectTimer('fireball', app);
                        };
                }
                
                app.ticker.add(onTick);
                fireball.on('destroyed', () => {
                        app.ticker.remove(onTick);
                        if (glowFilter) app.ticker.remove(glowFilter.tickerID);
                });

                chunk.addChild(fireball);
        },
        startEffectTimer: (typeOfEffect, app) => {
                const effectBGContainer = document.createElement("div");
                const numberContainer = document.createElement("div");
                const imgContainer = document.createElement("div");
                const numberDisplay = document.createElement("p");
                const collectibleImg = document.createElement("img");

                effectBGContainer.id = 'effectBGContainer';
                numberContainer.id = 'numberContainer';
                imgContainer.id = 'imgContainer';
                numberDisplay.id = 'numberDisplay';
                collectibleImg.id = 'collectibleImg';

                if (typeOfEffect === 'magnet') {
                        collectibleImg.src = './Assets/Collectibles/Magnet.png';
                        numberDisplay.style.color = 'blue';
                        magnetDragLogs(app);
                } else if (typeOfEffect === 'luckyCharm') {
                        collectibleImg.src = './Assets/Collectibles/Luck.png';
                        numberDisplay.style.color = '0x00ff00';
                        multiplier += 7;
                } else if (typeOfEffect === 'fireball') {
                        collectibleImg.src = './Assets/Collectibles/fireball/10.png';
                        numberDisplay.style.color = '0xCC1100';
                }

                numberContainer.appendChild(numberDisplay);
                imgContainer.appendChild(collectibleImg);

                effectBGContainer.append(numberContainer, imgContainer);

                document.body.appendChild(effectBGContainer);

                let number = 4;

                numberDisplay.textContent = number;

                const timer = setInterval(() => {
                        number --;
                        numberDisplay.textContent = number;

                        if (number === 0) {
                                if (typeOfEffect === 'magnet') {
                                        magnetCount--;
                                        
                                } else if (typeOfEffect === 'luckyCharm') {
                                        console.log("Clearing multiplier")
                                        multiplier -= 7;
                                        effects.onLuckyHitAnimation(app, 'stop');
                                } else if (typeOfEffect === 'fireball') {
                                        gameAssets.player.decayRate = 0.45;
                                        effects.onFireballHitAnimation(app, 'stop');
                                        fireballActive = false;
                                        console.log("Stopping fireball speed")
                                        gameAssets.player.velocityY = 15;
                                }
                                
                                clearInterval(timer);
                                effectBGContainer.remove();
                        };
                }, 1000);
        }
}

function magnetDragLogs(app) {
    magnetCount++;

    const onTick = (time) => {
        if (magnetCount <= 0) {
            app.ticker.remove(onTick);
            return;
        }

        const playerBounds = gameAssets.player.playerHitbox.bounds;

        world.children.forEach(chunk => {
            chunk.children.forEach(child => {
                if (child.label !== 'logContainer') return;
                child.children.forEach(log => {
                    if (!log || log.destroyed) return;

                    const logScreenPos = log.getGlobalPosition();
                    if (logScreenPos.y < playerBounds.y) return;

                    const localTarget = log.parent.toLocal(playerBounds);
                    log.x += (localTarget.x - log.x) * 0.2 * time.deltaTime;
                    log.y += (localTarget.y - log.y) * 0.2 * time.deltaTime;
                });
            });
        });
    };

    app.ticker.add(onTick);
}
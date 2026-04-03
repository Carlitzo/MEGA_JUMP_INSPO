import { Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { GlowFilter } from 'https://cdn.jsdelivr.net/npm/pixi-filters@6/dist/pixi-filters.mjs';
import { gameAssets, effects } from './main.js';

export let multiplier = 7;
// Lägga till funktion här för reset multiplier? Så vi kan resetta den när ett game avslutas?

export const gamePlayEffects =  {
        onLuckyCharm: (chunk, app) => {
                console.log("luckyCharm rendered on chunk")

                const luckSprite = Sprite.from('luckyCharm');
                luckSprite.label = 'luckyCharm';

                const widthPadding = app.screen.width * 0.4;
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
                                if (gameAssets.player.velocityY > 15) {
                                        gameAssets.player.velocityY = 13;
                                } else {
                                        gameAssets.player.velocityY = 15;
                                }
                                
                                effects.onLuckyHitAnimation(app);
                                luckSprite.destroy();
                                gamePlayEffects.startEffectTimer('luckyCharm', app);
                        };
                }
                
                app.ticker.add(onTick);
                luckSprite.on('destroyed', () => {
                        app.ticker.remove(onTick);
                        if (glowFilter) app.ticker.remove(glowFilter.tickerID);
                });

                chunk.addChild(luckSprite);
        },
        onMagnet: (chunk, app) => {

                

                startEffectTimer('magnet', app);
        },
        onFireball: (chunk, app) => {



                startEffectTimer('fireball', app);
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
                } else if (typeOfEffect === 'luckyCharm') {
                        collectibleImg.src = './Assets/Collectibles/Luck.png';
                        numberDisplay.style.color = 'green';
                        multiplier += 7;
                } else if (typeOfEffect === 'fireball') {
                        collectibleImg.src = './Assets/Collectibles/Fire.png';
                        numberDisplay.style.color = 'red';
                }

                numberContainer.appendChild(numberDisplay);
                imgContainer.appendChild(collectibleImg);

                effectBGContainer.append(numberContainer, imgContainer);

                document.body.appendChild(effectBGContainer);

                let number = 4;

                numberDisplay.textContent = number;

                const timer = setInterval(() => {
                        // effects.onLuckyAnimation(app, 'start');
                        number --;
                        numberDisplay.textContent = number;

                        if (number === 0) {
                                if (typeOfEffect === 'magnet') {

                                } else if (typeOfEffect === 'luckyCharm') {
                                        console.log("Clearing multiplier")
                                        multiplier -= 7;
                                        effects.onLuckyHitAnimation(app, 'stop');
                                } else if (typeOfEffect === 'fireball') {
                                        
                                }
                                
                                // effects.onLuckyAnimation(app, 'stop');
                                clearInterval(timer);
                                effectBGContainer.remove();
                        };
                }, 1000);
        }
}
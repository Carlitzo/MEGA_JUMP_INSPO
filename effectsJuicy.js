import { Application, Sprite, Container, Assets, Graphics, Text } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { GlowFilter } from 'https://cdn.jsdelivr.net/npm/pixi-filters@6/dist/pixi-filters.mjs';

let magnetTimer = null;
let circles = [];

const effects = {
        onLogHitAnimation: (app, logSprite) => {
                const position = logSprite.getGlobalPosition();
            
                const directions = [
                    { x: -1, y: -1 },
                    { x:  1, y: -1 },
                    { x: -1, y:  1 },
                    { x:  1, y:  1 }
                ];
            
                const maxLength = 40;
                let progress = 0;
            
                const sprites = directions.map((dir) => {
                    const sprite = Sprite.from('star');
                    sprite.scale.set(0.1);
                    sprite.anchor.set(0.5, 0.5);
                    sprite.x = position.x;
                    sprite.y = position.y;
                    app.stage.addChild(sprite);

                    return { sprite, dir };
                });
            
                const onTick = (time) => {
                    progress += time.deltaTime * 0.08;
            
                    sprites.forEach(({ sprite, dir }) => {
                        sprite.x = position.x + dir.x * (maxLength * progress);
                        sprite.y = position.y + dir.y * (maxLength * progress);
            
                        sprite.alpha = 1 - progress;
                    });
            
                    if (progress >= 1) {
                        app.ticker.remove(onTick);
                        sprites.forEach(({ sprite }) => sprite.destroy());
                    }
                };
            
                app.ticker.add(onTick);
        },
        onLuckyHitAnimation: (app, state) => {
            if (state === 'stop') {
                const existing = app.stage.getChildByName('luckyBorder');
                if (existing) {
                    existing.destroy();
                };
                return;
            };
        
            const border = new Graphics();
            border.label = 'luckyBorder';

            const text = new Text({
                text: `X 2`,
                style: {
                    fontFamily: 'woodFont',
                    fontSize: 80,
                    fill: 0x00ff00,
                }
            });
        
            text.anchor.set(0.5, 0.5);
            text.x = app.screen.width / 2;
            text.y = app.screen.height / 2;
        
            const thickness = 10;
            const glowFilter = new GlowFilter({
                distance: 20,
                outerStrength: 2,
                innerStrength: 0,
                color: 0x00ff00,
                quality: 0.5,
            });
        
            border.filters = [glowFilter];
            text.filters = [glowFilter];

            border.rect(0, 0, app.screen.width, app.screen.height);
            border.stroke({ color: 0x00ff00, width: thickness });
        
            app.stage.addChild(border);
            app.stage.addChild(text);

            let progress = 0;
        
            const onTick = (time) => {
                const dx = time.deltaTime;
                progress += dx * 0.02;

                text.alpha = 1 - progress;

                if (progress >= 1) {
                    text.destroy();
                }
                
                glowFilter.outerStrength = 4 + Math.sin(Date.now() * 0.005) * 3;
        
                if (border.destroyed) {
                    app.ticker.remove(onTick);
                }
            };
        
            app.ticker.add(onTick);
        },
        onMagnetHitAnimation: (app, state, gameAssets, count) => {
            if (state === "stop") {
                
                gameAssets.player.container.children
                    .filter(child => child.label === 'magnetCircle')
                    .forEach(child => child.destroy({ children: true }));
                return;
            }

            const smallRadius = gameAssets.player.container.height * 1;
            const mediumRadius = gameAssets.player.container.height * 1.5;
            const bigRadius = gameAssets.player.container.height * 2;
            const maxSize = gameAssets.player.container.height * 2.5;

            circles = [smallRadius, mediumRadius, bigRadius].map((startRadius, index) => {
                const startColor = index === 1 ? 0x880808 : 0x0018F9; // middle one starts red
                const circle = new Graphics();
                circle.label = 'magnetCircle';
                circle.circle(0, 0, startRadius);
                circle.fill({ color: 0x000000, alpha: 0 });
                circle.stroke({ color: startColor, width: 10 });
                gameAssets.player.container.addChild(circle);
                return { graphic: circle, radius: startRadius, color: startColor };
            });

            const onTick = (time) => {
                const dx = time.deltaTime;
                circles.forEach(c => {
                    
                    if (!c.graphic || c.graphic.destroyed) {
                        app.ticker.remove(onTick);
                        return;
                    }

                    c.radius += 1.5 * dx;
                    if (c.radius >= maxSize) {
                        c.radius = smallRadius;
                        // toggle color on reset
                        c.color = c.color === 0x0018F9 ? 0x880808 : 0x0018F9;
                    }
                    c.graphic.clear();
                    c.graphic.circle(0, 0, c.radius);
                    c.graphic.fill({ color: 0x000000, alpha: 0 });
                    c.graphic.stroke({ color: c.color, width: 3 });
                });
            };

            app.ticker.add(onTick);
        },
        onFireballHitAnimation: (app, world) => {

            const intensity = 8;
            const originalX = world.x;

            
            const onTick = (time) => {
                world.x = originalX + (Math.random() - 0.5) * intensity * 2;
            };

            const returnObj = {};
            returnObj.ticker = onTick;
            returnObj.originalX = originalX;
            app.ticker.add(onTick);

            return returnObj;
        },
        applyStaticEffects: (app, effectType, sprite = null) => {

            let returnObj = {};
            let glowFilter = undefined;
            let onTick = undefined;

            switch (effectType){
                case 'luckyCharm':
                    glowFilter = new GlowFilter({
                        distance: 20,
                        outerStrength: 1,
                        innerStrength: 0,
                        color: 0x00ff00,
                        quality: 0.5,
                    });

                    returnObj.filter = glowFilter;

                    onTick = () => {
                        filter.alpha = 4 + Math.sin(Date.now() * 1.5) * 3
                    };

                    returnObj.tickerID = onTick;

                    return returnObj;
                case 'fireball':
                    const fireball = sprite;

                    fireball.animationSpeed = 0.2;
                    fireball.loop = true;
                    fireball.play();

                    returnObj = {};

                    glowFilter = new GlowFilter({
                        distance: 20,
                        outerStrength: 1,
                        innerStrength: 0,
                        color: 0xCC1100,
                        quality: 0.5,
                    });

                    returnObj.filter = glowFilter;

                    onTick = () => {
                        filter.outerStrength = 1 + Math.sin(Date.now() * 0.005) * 2;
                        filter.alpha = 1 + Math.sin(Date.now() * 1.5) * 2;
                    };

                    returnObj.tickerID = onTick;

                    return returnObj;
            };
        }
}

export default effects;
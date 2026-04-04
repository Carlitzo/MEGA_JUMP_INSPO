import { Application, Sprite, Container, Assets, Graphics, Text } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { GlowFilter } from 'https://cdn.jsdelivr.net/npm/pixi-filters@6/dist/pixi-filters.mjs';

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
        onMagnetHitAnimation: (app, state) => {

        },
        onFireballHitAnimation: (app, state, world) => {
            if (state === 'stop') return;

            let elapsed = 0;
            const duration = 30; // antal frames
            const intensity = 8; // hur mycket den skakar i pixlar
            const originalX = world.x;

            const onTick = (time) => {
                elapsed += time.deltaTime;

                // Math.random() - 0.5 ger ett tal mellan -0.5 och 0.5
                world.x = originalX + (Math.random() - 0.5) * intensity * 2;

                if (elapsed >= duration) {
                    world.x = originalX; // återställ till original
                    app.ticker.remove(onTick);
                }
            };

            app.ticker.add(onTick);

        },
        applyStaticEffects: (app, effectType, sprite = null) => {

            let returnObj = {};
            let glowFilter = undefined;
            let onTick = undefined;

            switch (effectType){
                case 'luckyCharm':
                    glowFilter = new GlowFilter({
                        distance: 55,
                        outerStrength: 2,
                        innerStrength: 0,
                        color: 0x00ff00,
                        quality: 0.5,
                    });

                    returnObj.filter = glowFilter;

                    onTick = () => {
                        filter.outerStrength = 4 + Math.sin(Date.now() * 0.005) * 3;
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
                        distance: 55,
                        outerStrength: 2,
                        innerStrength: 0,
                        color: 0xCC1100,
                        quality: 0.5,
                    });

                    returnObj.filter = glowFilter;

                    onTick = () => {
                        filter.outerStrength = 4 + Math.sin(Date.now() * 0.005) * 3;
                        filter.alpha = 4 + Math.sin(Date.now() * 1.5) * 3
                    };

                    returnObj.tickerID = onTick;

                    return returnObj;
            };
        }
}

export default effects;
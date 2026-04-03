import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
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
                }
                return;
            }
        
            const border = new Graphics();
            border.label = 'luckyBorder';
        
            const thickness = 10;
            const glowFilter = new GlowFilter({
                distance: 20,
                outerStrength: 2,
                innerStrength: 0,
                color: 0x00ff00,
                quality: 0.5
            });
        
            border.filters = [glowFilter];
        
            border.rect(0, 0, app.screen.width, app.screen.height);
            border.stroke({ color: 0x00ff00, width: thickness });
        
            app.stage.addChild(border);
        
            const onTick = (time) => {
                glowFilter.outerStrength = 4 + Math.sin(Date.now() * 0.005) * 3;
        
                if (border.destroyed) {
                    app.ticker.remove(onTick);
                }
            };
        
            app.ticker.add(onTick);
        },
        onMagnetHitAnimation: (app) => {

        },
        onFireballHitAnimation: (app) => {

        },
        applyStaticEffects: (app, effectType) => {
            switch (effectType){
                case 'luckyCharm':

                    const returnObj = {};

                    const glowFilter = new GlowFilter({
                        distance: 20,
                        outerStrength: 2,
                        innerStrength: 0,
                        color: 0x00ff00,
                        quality: 0.5
                    });

                    returnObj.filter = glowFilter;

                    const onTick = () => {

                    };

                    returnObj.tickerID = onTick;

                    return returnObj;
            };
        }
}

export default effects;
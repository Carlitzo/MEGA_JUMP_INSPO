import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';

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
        onLuckyHitAnimation: (app) => {
            
            
        },
        onMagnetHitAnimation: (app) => {

        },
        onFireballHitAnimation: (app) => {

        }
}

export default effects;
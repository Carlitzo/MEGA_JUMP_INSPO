import { Application, Sprite, Container, Assets, Graphics, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameAssets } from './main.js';

export class Bober {
        constructor(app, animationObj) {
                this.velocityX = 0;
                this.velocityY = 17
                this.decayRate = 0.45;

                this.animations = {
                        idle: AnimatedSprite.fromFrames(animationObj.idleFrames),
                        flying: AnimatedSprite.fromFrames(animationObj.flyingFrames),
                        walking: AnimatedSprite.fromFrames(animationObj.walkingFrames),
                        jumping: AnimatedSprite.fromFrames(animationObj.jumpingFrames)
                };
                
                Object.values(this.animations).forEach(anim => {
                        anim.animationSpeed = 0.5;
                        anim.anchor.set(0.5, 1);
                });

                this.container = new Container();
                this.container.x = app.screen.width / 2;
                this.container.y = app.screen.height * 0.93;
                this.container.scale.set(0.22);

                this.current = this.animations.idle;
                this.container.addChild(this.current);
                this.current.play();

                this.playerHitbox = {
                        get bounds() {
                                const b = gameAssets.player.container.getBounds();
                                const shrinkX = b.width * 0.4;
                                const shrinkY = b.height * 0.3;
                                return {
                                        x: b.x + shrinkX,
                                        y: b.y + shrinkY,
                                        width: b.width - shrinkX * 2,
                                        height: b.height - shrinkY * 2
                                };
                        }
                };
        }

        setState(state) {
                if (this.current === this.animations[state]) return;
                this.current.stop();
                this.container.removeChild(this.current);
                this.current = this.animations[state];
                this.container.addChild(this.current);
                this.current.play();
        }
}
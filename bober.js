import { Application, Sprite, Container, Assets, Graphics, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';

export class Bober {
        constructor(app) {
                const idleFrames = [];
                const flyingFrames = [];
                const walkingFrames = [];
                const jumpingFrames = [];

                for (let i = 0; i < 20; i++) {
                        const number = String(i).padStart(2, '0');
                        flyingFrames.push(`Characters-Character02-Fly_${number}.png`);
                        idleFrames.push(`Characters-Character02-Idle_${number}.png`);
                        jumpingFrames.push(`Characters-Character02-Jump_${number}.png`);
                        walkingFrames.push(`Characters-Character02-walk_${number}.png`);
                };

                this.animations = {
                        idle: AnimatedSprite.fromFrames(idleFrames),
                        flying: AnimatedSprite.fromFrames(flyingFrames),
                        walking: AnimatedSprite.fromFrames(walkingFrames),
                        jumping: AnimatedSprite.fromFrames(jumpingFrames)
                };
                Object.values(this.animations).forEach(anim => {
                        anim.animationSpeed = 0.5;
                        anim.anchor.set(0.5, 1);
                });

                this.container = new Container();
                this.container.x = app.screen.width / 2;
                this.container.y = app.screen.height * 0.93;
                this.container.scale.set(0.38);

                this.current = this.animations.idle;
                this.container.addChild(this.current);
                this.current.play();
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
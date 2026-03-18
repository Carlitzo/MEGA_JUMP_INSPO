import { Application, Sprite, Container, Assets, Graphics, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';

export class Bober {
        constructor() {
                const idleFrames = [];
                const flyingFrames = [];
                const walkingFrames = [];
                const jumpingFrames = [];

                for (let i = 0; i < 20; i++) {
                        const number = String(i).padStart(2, '0');
                        flyingFrames.push(`./Assets/Character/Characters-Character02-Fly_${number}.png`);
                        idleFrames.push(`./Assets/Character/Characters-Character02-Idle_${number}.png`);
                        jumpingFrames.push(`./Assets/Character/Characters-Character02-Jump_${number}.png`);
                        walkingFrames.push(`./Assets/Character/Characters-Character02-walk_${number}.png`);
                };

                this.animations = {
                        idle: AnimatedSprite.fromFrames(idleFrames),
                        flying: AnimatedSprite.fromFrames(flyingFrames),
                        walking: AnimatedSprite.fromFrames(walkingFrames),
                        jumping: AnimatedSprite.fromFrames(jumpingFrames)
                };

                this.current = this.animations.idle;
                this.current.play();
        }

        setState(state) {
                if (this.current === this.animations[state]) return;
                this.current.stop();
                this.current = this.animations[state];
                this.current.play();
        }
}
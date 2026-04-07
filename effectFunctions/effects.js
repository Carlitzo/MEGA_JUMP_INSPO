import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';

const effects = {
        onLogHitAnimation: (app, logSprite) => {
                return undefined;
        },
        onLuckyHitAnimation: (app, state) => {

                return undefined;
        },
        onMagnetHitAnimation: (app, state, gameAssets, count) => {

                return undefined;
        },
        onFireballHitAnimation: (app, world) => {

                return undefined;
        },
        onComputerHitAnimation: (app, state, world) => {

                return undefined;
        },
        applyStaticEffects: (app, effectType, sprite = null) => {

                return undefined;
        }
}

export default effects;
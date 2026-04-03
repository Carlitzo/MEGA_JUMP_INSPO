import { gamePlayEffects } from "./gamePlayEffects.js";
import { getRandomInt } from "./getRandomInt.js";
import { effects } from "./main.js";

export function determineEffect(chunk, app) {
        let effectsArray = ['magnet', 'luckyCharm', 'fireball'];
        
        // let effect = getRandomInt(effectsArray.length);
        let effect = 1;

        switch (effect) {
                case 0:
                        gamePlayEffects.onMagnet(chunk, app);
                        effects.onMagnetHitAnimation();
                break;
                case 1:
                        gamePlayEffects.onLuckyCharm(chunk, app);
                        //effects.onLuckyHitAnimation(app); <- Detta anropet ska inte vara här väl? Ger oss border när en charm spawnar
                break;
                case 2:
                        gamePlayEffects.onFireball(chunk, app);
                        effects.onFireballHitAnimation();
                break;
        };
}
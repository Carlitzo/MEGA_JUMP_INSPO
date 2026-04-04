import { gamePlayEffects } from "./gamePlayEffects.js";
import { getRandomInt } from "./getRandomInt.js";
import { effects } from "./main.js";
import { fireballActive } from "./gamePlayEffects.js";

export function determineEffect(chunk, app) {
        let effectsArray = ['magnet', 'luckyCharm', 'fireball'];
        
        // let effect = getRandomInt(effectsArray.length);

        let effect = 0;

        if (effect === 0 && fireballActive) {
                effect++;
        }

        switch (effect) {
                case 0:
                        gamePlayEffects.onMagnet(chunk, app);
                break;
                case 1:
                        gamePlayEffects.onLuckyCharm(chunk, app);
                break;
                case 2:
                        gamePlayEffects.onFireball(chunk, app);
                break;
        };
}
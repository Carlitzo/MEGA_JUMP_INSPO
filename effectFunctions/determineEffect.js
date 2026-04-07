import { gamePlayEffects } from "./gamePlayEffects.js";
import { getRandomInt } from "../helperFunctions/getRandomInt.js";
import { fireballActive } from "./gamePlayEffects.js";

export function determineEffect(chunk, app) {
        const effectsArray = ['magnet', 'luckyCharm', 'fireball', 'computer'];
        
        let effect = getRandomInt(effectsArray.length);

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
                case 3:
                        gamePlayEffects.onComputer(chunk, app);
                break;
        };
}
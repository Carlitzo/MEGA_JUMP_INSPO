import { gameAssets } from './main.js';

// funktion som pre-loadar alla våra assets direkt
export async function preloadAssets (app) {
        //Funktion som laddar in alla våra sprites/assets.
        gameAssets.intialBackground = './Assets/Background/04_preview with start position-01.png';
    
        for (let i = 0; i < 4; i++) {
                gameAssets.backgrounds.push({
                        alias: `backgroundWithoutStart_0${i}`,
                        src: `./Assets/Background/0${i}_preview_without_start_position_01.png`
                });
        };
    
        for (let i = 0; i < 20; i++) {
                const number = String(i).padStart(2, '0');
                gameAssets.character.flying.push({
                        alias: `characterFlying_${number}`,
                        src: `./Assets/Character/Flying/Characters-Character01-Fly_${number}.png`
                });
                gameAssets.character.idle.push({
                        alias: `characterIdle_${number}`,
                        src: `./Assets/Character/Idle/Characters-Character01-Idle_${number}.png`
                });
                gameAssets.character.jumping.push({
                        alias: `characterJumping_${number}`,
                        src: `./Assets/Character/Jumping/Characters-Character01-Jump_${number}.png`
                });
                gameAssets.character.moving.push({
                        alias: `characterMoving_${number}`,
                        src: `./Assets/Character/Moving/Characters-Character01-walk_${number}.png`
                });
        };
    
        gameAssets.collectibles.push({
                alias: 'bigLog',
                src: './Assets/Collectibles/bigLog.png'
        });
    
        gameAssets.collectibles.push({
                alias: 'smolLog',
                src: './Assets/Collectibles/smolLog.png'
        });
    
        gameAssets.collectibles.push({
                alias: 'magnet',
                src: './Assets/Collectibles/Magnet.png'
        });
    
        gameAssets.collectibles.push({
                alias: 'luckyClover',
                src: './Assets/Collectibles/Luck.png'
        });
}
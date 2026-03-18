import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameAssets } from './main.js';
import { Bober } from './bober.js';

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

        await Assets.load('./Assets/Character/Character.json');
        gameAssets.player = new Bober(app);
    
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
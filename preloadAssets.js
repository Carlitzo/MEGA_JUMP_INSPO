import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameAssets } from './main.js';
import { Bober } from './bober.js';

export let animationObj = {};

export async function preloadAssets (app) {

        await Assets.load({
                alias: 'backgroundWithStart',
                src: './Assets/Background/04_preview with start position-01.png'
        });
        for (let i = 0; i < 4; i++) {
                await Assets.load({
                        alias: `backgroundWithoutStart_0${i}`,
                        src: `./Assets/Background/0${i}_preview_without_start_position_01.png`
                });
        };

        animationObj = {
                idleFrames: [],
                flyingFrames: [],
                jumpingFrames: [],
                walkingFrames: []
        };

        for (let i = 0; i < 20; i++) {
                const number = String(i).padStart(2, '0');
                animationObj.idleFrames.push(`Characters-Character02-Idle_${number}.png`);
                animationObj.flyingFrames.push(`Characters-Character02-Fly_${number}.png`);
                animationObj.jumpingFrames.push(`Characters-Character02-Jump_${number}.png`);
                animationObj.walkingFrames.push(`Characters-Character02-walk_${number}.png`);
        };

        await Assets.load('./Assets/Character/Character.json');
        gameAssets.player = new Bober(app, animationObj);
        
        await Assets.load({ alias: 'smolLog', src: './Assets/Collectibles/smolLog.png'});
        await Assets.load({ alias: 'magnet', src: './Assets/Collectibles/Magnet.png'});
        await Assets.load({ alias: 'luckyCharm', src: './Assets/Collectibles/Luck.png'});
        await Assets.load({ alias: 'star', src: './Assets/UI_Assets/Star.png'});
        await Assets.load([
                { alias: 'fireball1', src: './Assets/Collectibles/fireball/1.png' },
                { alias: 'fireball2', src: './Assets/Collectibles/fireball/2.png' },
                { alias: 'fireball3', src: './Assets/Collectibles/fireball/3.png' },
                { alias: 'fireball4', src: './Assets/Collectibles/fireball/4.png' },
                { alias: 'fireball5', src: './Assets/Collectibles/fireball/5.png' },
                { alias: 'fireball6', src: './Assets/Collectibles/fireball/6.png' },
                { alias: 'fireball7', src: './Assets/Collectibles/fireball/7.png' },
        ])
}
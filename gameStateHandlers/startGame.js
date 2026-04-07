import { gameAssets, app, world, startGameTime } from './../variables/variables.js';
import { fireballActive } from './../effectFunctions/gamePlayEffects.js';
import { updateChunks } from './../assetFunctions/chunks.js';
import { terminateGame } from './terminateGame.js';

export let currentHighest = 0;
export let lowestAllowed = 0;

export async function startGame(app) {

        await launchCharacter(app);
        const playerScreenY = (app.screen.height / 2) + (gameAssets.player.container.height / 2);

        const onTick = (time) => {
                const dx = time.deltaTime;
                gameAssets.player.setState('flying');
                if (!fireballActive) gameAssets.player.velocityY -= gameAssets.player.decayRate * dx;
                world.y += (gameAssets.player.velocityY * dx);
                gameAssets.player.container.y = playerScreenY;
                updateChunks(app);

                if (world.y > currentHighest) {
                        currentHighest = world.y;
                        lowestAllowed = currentHighest - (gameAssets.player.container.height * 4);
                }

                
                if (world.y < lowestAllowed) {
                        terminateGame(app, onTick);
                }
        };
        app.ticker.add(onTick);
}

export function startGameButton(event) {
        function clickedButton(image) {
                image.style.transform = 'scale(0.9)';
                image.style.filter = 'drop-shadow(0 0 0.4rem white)';
        }
        
        const img = document.getElementById('startGameBtn');
        if (!img) return;
        
        clickedButton(img);
        setTimeout(() => {
                img.remove();
                startGameTime();
                startGame(app);
        }, 150);
}

export function launchCharacter(app) {
        
        return new Promise((resolve) => {
                const onTick = (time) => {
                        const dx = time.deltaTime;
                        
                        gameAssets.player.container.y -= (gameAssets.player.velocityY * 2);

                        if (gameAssets.player.container.y <= (app.screen.height / 2) + (gameAssets.player.container.height / 2)) {
                                app.ticker.remove(onTick);
                                resolve();
                        }
                };

                app.ticker.add(onTick);
        });
}

export function resetCurrentHighest() {
    currentHighest = 0;
    lowestAllowed = 0;
}
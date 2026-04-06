import { resetGame } from './resetGame.js';
import { gameAssets } from './../variables/variables.js';

export function terminateGame(app, ticker) {
        app.ticker.remove(ticker);
        gameAssets.player.playerHitbox.active = false;

        const onTick = async (time) => {
                let dx = time.deltaTime;
                gameAssets.player.container.y -= gameAssets.player.velocityY * dx;

                if (gameAssets.player.velocityY > 0) gameAssets.player.velocityY = -17;

                if (gameAssets.player.container.y > app.screen.height + (app.screen.height * 0.25)) {
                        await resetGame(app, onTick);
                }
        };
        app.ticker.add(onTick);
}
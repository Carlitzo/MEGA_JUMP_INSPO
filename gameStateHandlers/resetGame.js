import { resetGameVariables, world, gameAssets } from './../variables/variables.js';
import { sendGameToDB, fadeTransition } from './../main.js';
import { renderStartScreen } from './../renderFunctions/renderStartScreen.js';

export async function resetGame(app, ticker) {
        
        app.ticker.remove(ticker);
        await sendGameToDB();
        fadeTransition(() => {
                world.removeChildren();

                document.getElementById('luckyBorder')?.remove();
                document.getElementById('allEffects')?.remove();
                world.filters = [];
                
                resetGameVariables();
                document.getElementById("scoreBG").remove();

                const luckyBorder = app.stage.getChildByName('luckyBorder');
                if (luckyBorder) luckyBorder.destroy();

                const magnetBorder = app.stage.getChildByName('magnetBorder');
                if (magnetBorder) magnetBorder.destroy();
        
                renderStartScreen(app);
                gameAssets.player.playerHitbox.active = true;
        });
}
import { Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameStarted, gameAssets } from './main.js';

// rendera alla logs i spelet, om gameStarted = false rendera de första logsen på nuvarande skärmen
// om gameStarted är true så rendera alla logs på nästakommande bakgrundsbild istället
export async function renderLogs(app) {
        const logContainer = new Container();

        logContainer.width = app.screen.width;
        logContainer.height = app.screen.height / 2;
        logContainer.interactiveChildren = true;

        if (!gameStarted) {
                // Rendera logs i start-vyn (dvs samma bakgrundsbild som bober befinner sig i);
                const logCount = 10;
                for (let i = 0; i < logCount; i++) {
                        let logSprite = null;
                        
                        logSprite = Sprite.from('smolLog');

                        const logX = (i * app.screen.width * 0.78695 / logCount) % app.screen.width;
                        const logY = Math.random() * (app.screen.height / 2);

                        logSprite.anchor.set(0.5, 0.5);
                        logSprite.x = logX;
                        logSprite.y = logY;
                        logSprite.scale.set(0.13);
                        logSprite.roundPixels = true;

                        console.log(logSprite);
                        logContainer.addChild(logSprite);
                }
        } else {
                // Rendera logs i nästkommande vy så att spelet kontinuerligt renderas
                app.ticker.add((time) => {
                        const dx = time.deltaTime * 0.2;
                        
                });
        };
        app.stage.addChild(logContainer);
}
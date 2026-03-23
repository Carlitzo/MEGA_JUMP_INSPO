import { Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameStarted, gameAssets } from './main.js';

// rendera alla logs i spelet, om gameStarted = false rendera de första logsen på nuvarande skärmen
// om gameStarted är true så rendera alla logs på nästakommande bakgrundsbild istället
export async function renderLogs(app) {
        const logContainer = new Container();

        logContainer.width = app.screen.width;
        logContainer.height = app.screen.height / 2;
        logContainer.interactiveChildren = true;
        logContainer.x = app.screen.width / 2;
        
        if (!gameStarted) {
                // Rendera logs i start-vyn (dvs samma bakgrundsbild som bober befinner sig i);
                const logCount = 10;

                for (let i = 0; i < logCount; i++) {
                        let logSprite = null;
                        logSprite = Sprite.from('smolLog');
                        

                        const widthPadding = app.screen.width * 0.1;
                        const logX = (Math.random() * 2 - 1) * (app.screen.width / 2 - widthPadding);
                        const logY = Math.random() * (app.screen.height / 2 - widthPadding);

                        logSprite.anchor.set(0.5, 0.5);
                        logSprite.x = logX;
                        logSprite.y = logY;
                        logSprite.scale.set(0.08);
                        logSprite.roundPixels = true;

                        logContainer.addChild(logSprite);

                        app.ticker.add((time) => {
                                const dx = time.deltaTime * 0.03;
                
                                logSprite.rotation += dx;
                        });
                }

        } else {
                // Rendera logs i nästkommande vy så att spelet kontinuerligt renderas
        };

        app.stage.addChild(logContainer);
}
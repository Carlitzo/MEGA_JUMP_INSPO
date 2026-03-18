import { Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { gameStarted } from './main.js';

// rendera alla logs i spelet, om gameStarted = false rendera de första logsen på nuvarande skärmen
// om gameStarted är true så rendera alla logs på nästakommande bakgrundsbild istället
export function renderLogs(app) {

        if (!gameStarted) {
        // Rendera logs i start-vyn (dvs samma bakgrundsbild som bober befinner sig i);
        } else {
        // Rendera logs i nästkommande vy så att spelet kontinuerligt renderas
                app.ticker.add((time) => {
                        const dx = time.deltaTime * 0.2;
                        
                });
        };
}
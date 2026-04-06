import { renderInitialAssets } from '../assetFunctions/renderInitialAssets.js';
import { renderScore } from '../renderFunctions/renderScore.js';
import { startGameButton } from '../gameStateHandlers/startGame.js';
import { app } from './../variables/variables.js';

export function renderStartScreen(app) {
        renderInitialAssets(app);
        renderScore(app);

        const img = document.createElement("img");
        document.body.appendChild(img);
        img.src = './Assets/UI_Assets/Play.png';
        img.id = 'startGameBtn';

        img.addEventListener("pointerup", startGameButton);
}
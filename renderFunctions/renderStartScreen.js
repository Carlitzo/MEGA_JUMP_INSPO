import { renderInitialAssets } from '../assetFunctions/renderInitialAssets.js';
import { renderScore } from '../renderFunctions/renderScore.js';
import { startGameButton } from '../gameStateHandlers/startGame.js';
import { suppressNextCanvasClick } from './../variables/variables.js';
import { renderIntro } from './renderIntro.js';

export function renderStartScreen(app) {
        renderInitialAssets(app);
        renderScore(app);
        renderInfoButton();
        if (!localStorage.getItem('screenTextFlag')) renderScreenText();

        const img = document.createElement("img");
        document.body.appendChild(img);
        img.src = './Assets/UI_Assets/Play.png';
        img.id = 'startGameBtn';

        img.addEventListener('touchstart', () => {
                suppressNextCanvasClick();
        }, { passive: true });

        img.addEventListener("pointerup", startGameButton);
}

export function renderInfoButton() {
        const img = document.createElement("img");
        document.body.appendChild(img);
        img.src = './Assets/UI_Assets/Info.png';
        img.id = 'infoButton';

        img.addEventListener('touchstart', () => {
                suppressNextCanvasClick();
        }, { passive: true });

        img.addEventListener("pointerup", async () => await renderIntro());
}

export function renderScreenText() {
        const p = document.createElement("p");
        document.body.appendChild(p);
        p.textContent = 'Tap or hold on either side of the screen to move side to side';
        p.id = 'screenText';

        localStorage.setItem("screenTextFlag", true);

        p.addEventListener("click", (event) => event.preventDefault());
}
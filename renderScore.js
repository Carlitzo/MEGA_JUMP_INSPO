import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';

export let score = 0;

export function renderScore(app) {
        let logAmount = 0;

        const scoreBG = document.createElement("div");
        const topBGDiv = document.createElement("div");
        const botBGDiv = document.createElement("div");

        const amountDisplay = document.createElement("p");
        const scoreDisplay = document.createElement("p");
        const logSprite = document.createElement("img");

        topBGDiv.append(amountDisplay, logSprite);
        botBGDiv.append(scoreDisplay);

        scoreBG.append(topBGDiv, botBGDiv);

        scoreBG.id = 'scoreBG';
        topBGDiv.id = 'topBGDiv';
        botBGDiv.id = 'botBGDiv';
        amountDisplay.id = 'amountDisplay';
        scoreDisplay.id = 'scoreDisplay';
        logSprite.id = 'logSprite';

        logSprite.src = './Assets/Collectibles/smolLog.png';
        amountDisplay.textContent = '0';
        scoreDisplay.textContent = 'Score: 0';

        document.body.appendChild(scoreBG);

        window.addEventListener('logHit', (e) => {
                score += 7;
                logAmount++;

                scoreDisplay.textContent = 'Score: ' + score;
                amountDisplay.textContent = logAmount;
                logSprite.classList.remove('vibrate');
                void logSprite.offsetWidth;
                logSprite.classList.add('vibrate');
        })
}
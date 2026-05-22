import { preloadAssets } from './assetFunctions/preloadAssets.js';
import { input } from './input.js';
import { score } from './renderFunctions/renderScore.js';
import { renderIntro } from "./renderFunctions/renderIntro.js";
import { initGameVariables, app, world, gameAssets, startTime } from './variables/variables.js';
import { renderStartScreen } from './renderFunctions/renderStartScreen.js';
import { sendHighscoreRequest } from "./highscores/highscoreRequests.js";

(async () => {
        await initGameVariables();

   	await app.init({ resizeTo: window, backgroundColor: 0x491b11});

        document.body.appendChild(app.canvas);
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
        app.canvas.style.objectFit = 'cover';
        app.stage.addChild(world);

        await preloadAssets(app);

        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 500);

        if (!localStorage.getItem('acceptedIntro')) await renderIntro();

        renderStartScreen(app);

        app.canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

        app.ticker.add((time) => {
                const dt = 8 * time.deltaTime;
                

                if (input.latestKey === 'ArrowLeft') {
                        gameAssets.player.container.x -= dt;
                        gameAssets.player.setState('walking');
                        gameAssets.player.container.scale.x = -0.22;
                } else if (input.latestKey === 'ArrowRight') {
                        gameAssets.player.container.x += dt;
                        gameAssets.player.setState('walking');
                        gameAssets.player.container.scale.x = 0.22;
                } else {
                        gameAssets.player.setState('idle');
                };

                const halfWidth = gameAssets.player.container.width / 8;
                gameAssets.player.container.x = Math.max(halfWidth, Math.min(app.screen.width - halfWidth, gameAssets.player.container.x));
        });
})();

export async function sendGameToDB() {
        const gameUserID = localStorage.getItem("id");
        const gameScore = score;
        const gameStartTime = startTime;
        const gameEndTime = Date.now();
        
        const params = new URLSearchParams(window.location.search);
        const juicyParam = params.get('juicy');
        const isJuicy = juicyParam !== null
            ? juicyParam === 'true'
            : new Date().getDate() % 2 === 0;
        const gameVersion = isJuicy ? "juicy" : "standard";

        const data = JSON.stringify({
                userID: gameUserID,
                startTime: gameStartTime,
                endTime: gameEndTime,
                version: gameVersion,
                score: gameScore
        });

        await fetch("/finish", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data
        });

        let username = "";
        if (localStorage.getItem("username")) {
                username = localStorage.getItem("username");
        }

        await sendHighscoreRequest(username, gameScore);
}

export function fadeTransition(onMidpoint) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = '#491b11';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.zIndex = '100';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    setTimeout(() => overlay.style.opacity = '1', 15);

    setTimeout(() => {
        onMidpoint();
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    }, 550);
}
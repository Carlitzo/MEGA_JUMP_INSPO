export function renderIntro() {
        return new Promise((resolve) => {
                const introDiv = document.createElement('div');
                introDiv.id = 'introScreen';

                introDiv.innerHTML = `
                <div id="introContent">
                        <h1>Welcome to Bober Jump!</h1>
                        <p id="important">THIS GAME IS MADE TO BE PLAYED ON MOBILE DEVICES ONLY!</p>
                        <p>This game is part of a student lead research study. We, Adrian and Esmir, 
                        are doing our Bachelor thesis at Malmo University and need to collect data about 
                        how different people play our game. 
                        </p>
                        
                        <h2>How to play</h2>
                        <p>Press the left or right side of the screen to move in that direction. 
                        Bounce on the logs to stay airborne – miss too many and you'll fall!</p>
                        <p>Along the way you'll find special items that might help you on your journey.</p>
                        
                        <h2>About this study</h2>
                        <p>
                        We do not store any personal information and all data is completely anonymous.
                        The data we store includes scores, attempts, and things like that.
                        </p>

                        <p>Due to the nature of the study, you may experience different versions of the game when you play it. It's not broken, it's the way it's supposed to be.</p>
                        
                        
                        <button id="introBtn">Let's go!</button>
                </div>
                `;

                document.body.appendChild(introDiv);

                document.getElementById('introBtn').addEventListener('pointerup', () => {
                introDiv.style.opacity = '0';
                setTimeout(() => {
                        localStorage.setItem('acceptedIntro','true');
                        introDiv.remove();
                        resolve();
                }, 500);
                });
        });
}
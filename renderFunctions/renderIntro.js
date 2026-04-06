export function renderIntro() {
        return new Promise((resolve) => {
                const introDiv = document.createElement('div');
                introDiv.id = 'introScreen';

                introDiv.innerHTML = `
                <div id="introContent">
                        <h1>Welcome to Bober jump!</h1>
                        <p>Help our little bober climb as high as possible through the forest.</p>
                        
                        <h2>How to play</h2>
                        <p>Press the left or right side of the screen to move in that direction. 
                        Bounce on the logs to stay airborne – miss too many and you'll fall!</p>
                        <p>Along the way you'll find special items that might help you on your journey.</p>
                        
                        <h2>About this study</h2>
                        <p>This game is part of a research study about game experience. 
                        There are no right or wrong ways to play – just play as you normally would.</p>
                        <p>Anonymised data about your gameplay will be collected. No personal information is stored.</p>
                        
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
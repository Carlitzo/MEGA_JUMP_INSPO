export async function sendHighscoreRequest(username, highscore) {

        await fetch("/finish", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: {
                        username: username,
                        highscore: highscore,
                        today: true
                }
        });

}
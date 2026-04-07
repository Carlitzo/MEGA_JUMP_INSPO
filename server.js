import { serveDir } from "jsr:@std/http";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_KEY = Deno.env.get('SUPABASE_KEY');

// För loggning med stacktrace
const originalLog = console.log;

console.log = (...args) => {
    const stack = new Error().stack?.split("\n")[2] || "Unknown location";
    const location = stack.trim().replace(/^at\s+/, "");
    originalLog(`[${location}]`, ...args);
};

const kv = await Deno.openKv();

Deno.serve(async (request) => {
    const url = new URL(request.url);

    // Generates new userID and sends it to the client
    if (url.pathname === "/getID" && request.method === "GET") {
        const userID = crypto.randomUUID();
        return Response.json({ userID });
    }

    // Checks if todays date is even or uneven, sends true or false to client
    if (url.pathname === "/getVersion" && request.method === "GET") {
        const juicyParam = url.searchParams.get('juicy');
        let isEven;
        if (juicyParam !== null) {
            isEven = juicyParam === 'true';
        } else {
            isEven = new Date().getDate() % 2 === 0;
        }
        const version = isEven ? "juicy" : "standard";
        return Response.json({ versionFlag: isEven, version });
    }

    // Returns ALL entries
    if (url.pathname === "/getAll" && request.method === "GET") {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/games?select=*`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        const data = await response.json();
        return Response.json(data);
    }

    // Game finishes -> saves everything to database, including version
    // NOTE: Make sure v1 and v2 are aligned with what we want if we even care lmao?
    if (url.pathname === "/finish" && request.method === "POST") {
        const body = await request.json();
        // Used as numbers for each row, every "row" needs a unique identifier
        const gameID = crypto.randomUUID();
        const version = body.version;

        await fetch(`${SUPABASE_URL}/rest/v1/games`, {
            method: "POST",
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_id: gameID,
                user_id: body.userID,
                score: body.score,
                start_time: body.startTime,
                end_time: body.endTime,
                version: body.version
            })
        })

        return Response.json({success: true});
    }

    // Everything else → serve static files as before
    return serveDir(request, {
        fsRoot: ".",
        quiet: true
    });
});
import { serveDir } from "jsr:@std/http";

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
        const isEven = new Date().getDate() % 2 === 0;
        const version = isEven ? "juicy" : "standard";
        return Response.json({ versionFlag: isEven, version });
    }

    // Returns ALL entries
    if (url.pathname === "/getAll" && request.method === "GET") {
        const entries = [];
        const iter = kv.list({ prefix: ["games"] });
        for await (const entry of iter) {
            entries.push(entry.value);
        }
        return Response.json(entries);
    }

    // Game finishes -> saves everything to database, including version
    // NOTE: Make sure v1 and v2 are aligned with what we want if we even care lmao?
    if (url.pathname === "/finish" && request.method === "POST") {
        const body = await request.json();
        // Used as numbers for each row, every "row" needs a unique identifier
        const gameID = crypto.randomUUID();
        const version = body.version;

        await kv.set(["games", version, gameID], {
            id: body.userID,
            score: body.score,
            startTime: body.startTime,
            endTime: body.endTime,
            version: body.version
        });

        // Just logging to check if it works as it should
        //const check = await kv.get(["games", version, gameID]);
        //console.log("\nSaved to KV:", check.value);
        //console.log("GAME ID: " + gameID);

        return Response.json({ success: true });
    }

    // Everything else → serve static files as before
    return serveDir(request, {
        fsRoot: ".",
        quiet: true
    });
});
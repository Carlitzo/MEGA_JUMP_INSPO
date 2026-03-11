import { serveDir } from "jsr:@std/http";

// För loggning med stacktrace
const originalLog = console.log;

console.log = (...args) => {
  const stack = new Error().stack?.split("\n")[2] || "Unknown location";
  const location = stack.trim().replace(/^at\s+/, "");
  originalLog(`[${location}]`, ...args);
};

Deno.serve((request) => {
  return serveDir(request, {
    fsRoot: ".",
    quiet: true
  });
});
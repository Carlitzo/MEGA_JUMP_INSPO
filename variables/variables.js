import { Application, Sprite, Container, Assets, Graphics } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { resetChunks } from './../assetFunctions/chunks.js';
import { resetCurrentHighest } from './../gameStateHandlers/startGame.js';
import { Bober } from './../assetFunctions/bober.js';
import { animationObj } from './../assetFunctions/preloadAssets.js';

export let startTime = null;
export let app;
export let world;
export let gameStarted;

export const gameAssets = {
        collectibles: [],
        player: null
};

const versionObj = await (await fetch("/getVersion")).json();

const version = versionObj.version;

// export const isJuicy = versionObj.versionFlag;
export const isJuicy = false;

const module = isJuicy
    ? await import('./../effectFunctions/effectsJuicy.js')
    : await import('./../effectFunctions/effects.js');

export const effects = module.default;



export async function initGameVariables() {
    app = new Application();
    world = new Container();
    
    gameStarted = false

    const localID = localStorage.getItem("id");

        localStorage.setItem("version", version);

        if (!localID) {
                const newID = await (await (await fetch("/getID")).json()).userID;
                localStorage.setItem("id", newID);
        }

    
}

export function resetGameVariables() {
    resetChunks();
    gameStarted = false;
    startTime = null;
    resetCurrentHighest();
    world.y = 0;
    gameAssets.player = new Bober(app, animationObj);
}

export function startGameTime() {
    startTime = Date.now();
    gameStarted = true;
}
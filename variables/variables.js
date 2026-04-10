import { Application, Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { resetChunks } from './../assetFunctions/chunks.js';
import { resetCurrentHighest } from './../gameStateHandlers/startGame.js';
import { Bober } from './../assetFunctions/bober.js';
import { animationObj } from './../assetFunctions/preloadAssets.js';

export let startTime = null;
export let app;
export let world;
export let gameStarted;
let suppressNextClick = false;
export function suppressNextCanvasClick() { suppressNextClick = true; }
export function getSuppressNextClick() { return suppressNextClick; }
export function clearSuppressNextClick() { suppressNextClick = false; }

export const gameAssets = {
        collectibles: [],
        player: null
};

const params = new URLSearchParams(window.location.search);
const juicyParam = params.get('juicy');

const versionObj = await (await fetch("/getVersion")).json();

export const isJuicy = juicyParam !== null 
    ? juicyParam === 'true' 
    : versionObj.versionFlag;

const module = isJuicy
    ? await import('./../effectFunctions/effectsJuicy.js')
    : await import('./../effectFunctions/effects.js');

export const effects = module.default;

const version = isJuicy ? "juicy" : "standard";

export async function initGameVariables() {
    app = new Application();
    world = new Container();
    
    gameStarted = false;

    const localID = localStorage.getItem("id");

        localStorage.setItem("version", version);

        if (!localID) {
            const response = await fetch("/getID");
            const data = await response.json();
            const newID = data.userID;
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
import { Sprite, Container, Assets, AnimatedSprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';
import { renderLogs } from '../renderFunctions/renderLogs.js';
import { world, gameAssets } from './../variables/variables.js';
import { updateChunks, createChunk } from "../assetFunctions/chunks.js";

export async function renderInitialAssets(app) {
        
        app.stage.addChild(gameAssets.player.container);
        
        createChunk(app.screen.height, app, 'backgroundWithStart', true, true);
        createChunk(0, app, 'backgroundWithoutStart_03', true);
        createChunk(-app.screen.height, app, 'backgroundWithoutStart_03', true);
        createChunk(app.screen.height * 2, app, 'backgroundWithoutStart_03');
        createChunk(app.screen.height * 3, app, 'backgroundWithoutStart_03'); 
        
}
const app = new PIXI.Application();
document.body.style.margin = 0;

async function setup() {
    await app.init({background: '#1099bb', resizeTo: window});
    document.body.appendChild(app.canvas);
}

async function preload() {
  const assets = [
    { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
    { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
    { alias: 'fish2', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png' },
    { alias: 'fish3', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png' },
    { alias: 'fish4', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png' },
    { alias: 'fish5', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png' },
    { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
    { alias: 'displacement', src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png' },
  ];
  await PIXI.Assets.load(assets);
}

function addBackground(app) {
    const background = PIXI.Sprite.from('background');

    background.anchor.set(0.5);

    if (app.screen.width > app.screen.height) {
        background.width = app.screen.width * 1.2;
        background.scale.y = background.scale.x;
    } else {
        background.height = app.screen.height * 1.2;
        background.scale.x = background.scale.y;
    }

    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;

    app.stage.addChild(background);
}

(async () => {
    await setup();
    await preload();

    addBackground(app);
})();
import 'phaser';
import PlanetScene from './scenes/PlanetScene';
import UiScene from "./scenes/UiScene";
import PlanetOnlyScene from './scenes/PlanetOnlyScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    parent: 'content',
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        PlanetScene,
        PlanetOnlyScene,
        UiScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars

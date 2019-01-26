import 'phaser';
import PlanetScene from './scenes/PlanetScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    parent: 'content',
    width: 1280,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        PlanetScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars

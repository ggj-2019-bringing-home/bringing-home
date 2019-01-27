import 'phaser';
import PlanetScene from './scenes/PlanetScene';
import UiScene from "./scenes/UiScene";
import PlanetOnlyScene from './scenes/PlanetOnlyScene';
import Startpage from './scenes/Startpage';
import Titlescreen from "./scenes/Titlescreen";
import Howtoplay from "./scenes/Howtoplay";
import IntroScene from "./scenes/IntroScene";

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
        Startpage,
        Titlescreen,
        Howtoplay,
        IntroScene,
        PlanetScene,
        PlanetOnlyScene,
        UiScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars

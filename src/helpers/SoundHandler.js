export default class SoundHandler {
    constructor(scene) {
        this.scene = scene;
        this.musicLib = [];
        this.curMusic = null;
        this.remainingLoops = 0;
    }
    preload() {
        for (let i = 1; i <= 6; i++) {
            this.musicLib.push(this.scene.load.audio('music-' + i, `assets/mp3/${i}.mp3`));
            this.scene.load.audio('sound-' + i, `assets/wav/${i}.wav`);
        }
    }
    start() {
        this.chooseTrack()
    }
    collide() {
        const i = Phaser.Math.Between(1, 6);
        this.scene.sound.play(`sound-${i}`);
    }
    chooseTrack() {
        const i = Phaser.Math.Between(1, 6);
        this.remainingLoops = Phaser.Math.Between(1, 6);
        console.log(`Playing track ${i} ${this.remainingLoops} times.`, this.scene.sound);

        this.curMusic = this.scene.sound.add(`music-${i}`);
        this.curMusic.play();
        this.curMusic.once('ended', () => {
            if (--this.remainingLoops < 1) {
                this.chooseTrack();
            } else {
                console.log(`> ${this.remainingLoops} remaining.`);
                this.curMusic.play();
            }
        }, this);
    }
}

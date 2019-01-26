import PlanetTexture from '../helpers/PlanetTexture';
import TerrainGenerator from '../helpers/TerrainGenerator';

class Planet extends Phaser.GameObjects.Image {
  constructor(scene, x, y, size) {
    super(scene, x, y);
    this.size = size;
    this.max = size - 1;
    this.map = [];

    this.terrainGenerator = new TerrainGenerator(this.size);
    for (let i in this.terrainGenerator.map) {
      this.map.push({
        height: this.terrainGenerator.map[i],
      })
    }

    this.planetTexture = new PlanetTexture(scene, this.size, 'planet');
    this.applyTerrain();
    this.setTexture('planet');
    this.setPosition(x, y);
  }

  get(x, y) {
    if (x < 0 || x > this.max || y < 0 || y > this.max) return -1;
    return this.map[x + this.size * y];
  }

  applyTerrain() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let height = this.get(x, y).height;
        if (height < 0) {
          this.planetTexture.setPixel(x, y, 0, 0, 155, 255);
        }
        else if (height < 30) {
          this.planetTexture.setPixel(x, y, 0, 0, 255, 255);
        }
        else if (height < 50) {
          this.planetTexture.setPixel(x, y, 255, 255, 0, 255);
        }
        else if (height < 150) {
          this.planetTexture.setPixel(x, y, 100, 80, 20, 255);
        }
        else if (height < 200) {
          this.planetTexture.setPixel(x, y, 100, 100, 100, 255);
        }
        else {
          this.planetTexture.setPixel(x, y, 200, 200, 200, 255);
        }
      }
    }
    this.planetTexture.refresh();
  }
}

export default Planet;

class PlanetTexture {
  constructor(scene, size, name) {
    this.scene = scene;
    this.size = size;
    this.name = name;

    this.texture = this.scene.textures.createCanvas(this.name, this.size, this.size);
    this.context = this.texture.getSourceImage().getContext('2d');
    this.pixels = this.context.getImageData(0, 0, this.size, this.size);
  }

  getPixel(x, y) {
    let offset = y * this.size * 4 + x;
    return([
      this.pixels.data[offset],
      this.pixels.data[offset + 1],
      this.pixels.data[offset + 2],
      this.pixels.data[offset + 3],
    ]);
  }

  setPixel(x, y, r, g, b, a) {
    let offset = (y * this.size * 4) + (x * 4);
    this.pixels.data[offset] = r;
    this.pixels.data[offset + 1] = g;
    this.pixels.data[offset + 2] = b;
    this.pixels.data[offset + 3] = a;
  }

  refresh() {
    this.context.putImageData(this.pixels, 0, 0);
    this.texture.refresh();
    console.log(this.pixels);
  }
}

export default PlanetTexture;

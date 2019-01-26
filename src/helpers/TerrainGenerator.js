class TerrainGenerator {
  constructor(size) {
    this.size = size;
    this.max = this.size - 1;
    this.map = new Float32Array(this.size * this.size);

    this.set(0, 0, Math.floor(Math.random() * 100));
    this.set(this.max, 0, Math.floor(Math.random() * 100));
    this.set(this.max, this.max, Math.floor(Math.random() * 100));
    this.set(0, this.max, Math.floor(Math.random() * 100));

    this.divide(this.max);
    console.log(Math.max.apply(null, this.map));
    console.log(Math.min.apply(null, this.map));
  }

  get(x, y) {
    if (x < 0 || x > this.max || y < 0 || y > this.max) return -1;
      return this.map[x + this.size * y];
  }

  set(x, y, val) {
    this.map[x + this.size * y] = val;
  }

  divide(size) {
    let roughness = 3;
    let x, y, half = size / 2;
    let scale = roughness * size;
    if (half < 1) return;
    for (y = half; y < this.max; y += size) {
      for (x = half; x < this.max; x += size) {
        this.square(x, y, half, Math.random() * scale * 2 - scale);
      }
    }
    for (y = 0; y <= this.max; y += half) {
      for (x = (y + half) % size; x <= this.max; x += size) {
        this.diamond(x, y, half, Math.random() * scale * 2 - scale);
      }
    }
    this.divide(size / 2);
  }

  average(values) {
    let valid = values.filter(val => val !== -1);
    let total = valid.reduce((sum, val) => sum + val, 0);
    return total / valid.length;
  }

  square(x, y, size, offset) {
    let ave = this.average([
      this.get(x - size, y - size),   // upper left
      this.get(x + size, y - size),   // upper right
      this.get(x + size, y + size),   // lower right
      this.get(x - size, y + size)    // lower left
    ]);
    this.set(x, y, ave + offset);
  }

  diamond(x, y, size, offset) {
    let ave = this.average([
      this.get(x, y - size),      // top
      this.get(x + size, y),      // right
      this.get(x, y + size),      // bottom
      this.get(x - size, y)       // left
    ]);
    this.set(x, y, ave + offset);
  }
}

export default TerrainGenerator;

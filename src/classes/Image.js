export class Image {
  constructor(id, type, size, tag) {
    this.id = id;
    this.type = type;
    this.size = size;
    this.size = tag;
  }

  render(request) {
    console.log(request);
  }
}

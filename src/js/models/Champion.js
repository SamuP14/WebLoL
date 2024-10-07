export default class Champion {
  constructor(data) {
      this.name = data.name;
      this.title = data.title;
      this.description = data.blurb;
      this.id = data.id;
      this.img = data.image.full;
      this.tags = data.tags;
  }
}
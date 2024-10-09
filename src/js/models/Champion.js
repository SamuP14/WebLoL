export default class Champion {
  constructor(data) {
    console.log(data)
      this.name = data.name;
      this.title = data.title;
      this.description = data.lore;
      this.id = data.id;
      this.img = data.image.full;
      this.tags = data.tags;
      this.partype = data.partype;
  }
}
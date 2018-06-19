export class Profile {

  image: File;
  slogan: string;

  constructor(image: File, slogan: string) {
    this.image = image;
    this.slogan = slogan;
  }
}

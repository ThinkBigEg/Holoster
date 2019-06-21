export class User {
  hash: string;
  handle: string;

  constructor(handle: string, hash: string) {
    this.handle = handle;
    this.hash = hash;
  }
}

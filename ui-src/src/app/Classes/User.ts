import { Post } from "./Post";

export class User {
  hash: string;
  handle: string;
  avatarURL: string;
  posts: Post[] = [];

  constructor(handle: string, hash: string) {
    this.handle = handle;
    this.hash = hash;
  }
}

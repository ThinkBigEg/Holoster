import { Comment } from "./Comment";
import { Vote } from "./Vote";

export class Post {
  hash: string;
  content: string;
  creatorHash: string;
  timeStamp: number;
  comments: Comment[];
  votes: Vote[];
  public constructor(
    content: string,
    timeStamp: number,
    creatorHash: string,
    hash: string
  ) {
    this.content = content;
    this.timeStamp = timeStamp;
    this.hash = hash;
    this.creatorHash = creatorHash;
  }
}

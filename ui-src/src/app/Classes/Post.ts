import { Comment } from "./Comment";
import { Vote } from "./Vote";

export class Post {
  hash: string;
  content: string;
  creatorHash: string;
  timeStamp: number;
  comments: Comment[];
  votes: Vote[];
  showComments: Boolean = false;

  constructor(content: string, creatorhash: string, timeStamp: number) {
    this.content = content;
    this.creatorHash = creatorhash;
    this.timeStamp = timeStamp;
  }
}

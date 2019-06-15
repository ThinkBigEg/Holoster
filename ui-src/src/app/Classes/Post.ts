import { Comment } from "./Comment";
import { Vote } from "./Vote";

export class Post {
  hash: string;
  content: string;
  creatorHash: string;
  timeStamp: number;
  comments: Comment[];
  votes: Vote[];
}

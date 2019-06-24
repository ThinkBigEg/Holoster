import { Comment } from "./Comment";
import { Vote } from "./Vote";
import { User } from "./User";

export class Post {
  hash: string;
  content: string;
  creator: User;
  timeStamp: number;
  comments: Comment[];
  votes: Vote[];
  dateTimeString: String;
  public constructor(
    content: string,
    timeStamp: number,
    creator: User,
    hash: string
  ) {
    this.content = content;
    this.timeStamp = timeStamp;
    this.hash = hash;
    this.creator = creator;
    this.dateTimeString = new Date(this.timeStamp * 1000).toLocaleString();
  }
}

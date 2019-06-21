export class Comment {
  content: string;
  timeStamp: number;
  creatorHash: string;

  constructor(content: string, timestamp: number, creatorHash: string) {
    this.content = content;
    this.timeStamp = timestamp;
    this.creatorHash = creatorHash;
  }
}

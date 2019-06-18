import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPosts = () => {
    return this.http.get("https://jsonplaceholder.typicode.com/posts");
  };

  fakeGetPosts = () => {
    return this.http.get("http://localhost:5000/reviews/JSON");
  };

  makeBody = (functionName, params) => {
    const body = {
      id: "0",
      jsonrpc: "2.0",
      method: "call",
      params: {
        instance_id: "test-instance",
        zome: "holoster",
        function: functionName,
        params: params
      }
    };
    return body;
  };

  signUp = (handle: string, avatar: string) => {
    const functionName = "register";
    const params = {
      name: handle,
      avatar_url: avatar
    };
    return this.http.post(
      "http://127.0.0.1:8888",
      this.makeBody(functionName, params)
    );
  };

  createPost = (content: string, timestamp: number) => {
    const functionName = "create_post";
    const params = {
      content: content,
      timestamp: timestamp
    };
    return this.http.post(
      "http://127.0.0.1:8888",
      this.makeBody(functionName, params)
    );
  };

  loadPosts = (userAddress: String) => {
    const functionName = "get_user_posts";
    const params = {
      user_address: userAddress
    };
    return this.http.post(
      "http://127.0.0.1:8888",
      this.makeBody(functionName, params)
    );
  };

  deletePost = (postHash: String) => {
    const functionName = "delete_post";
    const params = {
      user_address: postHash
    };
    return this.http.post(
      "http://127.0.0.1:8888",
      this.makeBody(functionName, params)
    );
  };

  updatePost = (postHash: String, content: string, timestamp: number) => {
    const functionName = "update_post";
    const params = {
      old_post_address: postHash,
      content: content,
      timestamp: timestamp
    };
    return this.http.post(
      "http://127.0.0.1:8888",
      this.makeBody(functionName, params)
    );
  };
}

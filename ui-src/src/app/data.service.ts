import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./Classes/User";
import { Post } from "./Classes/Post";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Result } from "./Classes/Result";
@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPosts = () => {
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
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

  makeRequest = (params: object, functionName: string) => {
    let requestBody: object = this.makeBody(functionName, params);
    return this.http.post<Result>("http://127.0.0.1:8888", requestBody);
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
}

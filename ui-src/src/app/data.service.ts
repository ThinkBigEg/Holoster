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

  private makeBody = (functionName, params) => {
    const body = {
      id: "0",
      jsonrpc: "2.0",
      method: "call",
      params: {
        instance_id: "holoster_instance",
        zome: "holoster",
        function: functionName,
        params: params
      }
    };
    return body;
  };

  makeRequest = (params: object, functionName: string) => {
    let requestBody: object = this.makeBody(functionName, params);
    return this.http.post<Result>("http://127.0.0.1:8889", requestBody);
  };
}

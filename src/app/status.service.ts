import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statement } from '@angular/compiler';

export interface State {
  status: string;
  time: number;
}

@Injectable()
export class StatusService {
  constructor(private http: HttpClient) { }

  statusUrl = 'api/status';

  getStatus() {
    return this.http.get<State>(this.statusUrl);
  }

  setStatus(status: string, time: number) {
    return this.http.post<State>(this.statusUrl, {status: status, time: time});
  }
}
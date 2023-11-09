import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/imember';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<IMember[]>(this.baseUrl + "users", this.getHttpOptions());
  }

  getMember(username: string) {
    return this.http.get<IMember>(this.baseUrl + "users/" + username, this.getHttpOptions());
  }

  getHttpOptions() {
    const userString = localStorage.getItem("user");
    if (!userString) return {};
    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: "Bearer " + user.token
      })
    }
  }
}

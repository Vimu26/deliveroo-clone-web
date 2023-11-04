import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly apiURL = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  public createUser(userData: IUserData) {
    const data = userData;
    console.log(data);
    return this.http.post<IUserData>(this.apiURL + '/', data);
  }
}

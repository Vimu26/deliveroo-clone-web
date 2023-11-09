import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserData, IUserLogin } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly apiURL = 'http://localhost:8080/oauth';

  constructor(private http: HttpClient) {}

  public createUser(userData: IUserData) {
    return this.http.post<IUserData>(this.apiURL + '/register', userData);
  }

  public loginUser(userData: IUserLogin) {
    return this.http.post<IUserLogin>(this.apiURL + '/login', userData)
  }
}

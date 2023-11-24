import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserData, IUserLogin, LoginResponse } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly apiURL = 'http://localhost:8080/oauth';

  constructor(private http: HttpClient) {}

  public createUser(userData: IUserData) {
    return this.http.post<IUserData>(this.apiURL + '/register', userData);
  }

  public loginUser(userData: IUserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiURL + '/login', userData);
  }
}

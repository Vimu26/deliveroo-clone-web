import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IUserData, IUserLogin } from 'src/app/interfaces'

@Injectable({
  providedIn: 'root',
})
export class LoginDataService {
  loginData!: IUserData

  constructor(private http: HttpClient) {}

  setData(data: IUserLogin) {
    data = this.loginData
  }

  getData(): IUserData {
    return this.loginData
  }
}

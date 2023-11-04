import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginDataService {
  private emailData: string = '';

  constructor(private http: HttpClient) {}

  setEmail(email: string) {
    console.log(email);
    this.emailData = email;
    console.log(this.emailData);
  }

  getEmailData(): string {
    return this.emailData;
  }
}

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, catchError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  createUser(newUser: User): Observable<any> {
    const url = `http://localhost:3000/api/users/signup`;
    return this.http.post(url, newUser);
  }

  loginUser(user: any): Observable<any> {
    const url = `http://localhost:3000/api/users/login`;
    return this.http.post(url, user);
  }

  isLoggedIn(): boolean {
    // Vérifie si le token est présent dans le localStorage
    return !localStorage.getItem('token');
  }
}

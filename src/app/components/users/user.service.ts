import { Role } from './../../models/role';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }


  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'users');
  }

  public getUserByID(userId: number): Observable<User> {
    return this.http.get<User>(this.baseURL + 'users/' + userId);
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseURL}role`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}users`, user);
  }
}

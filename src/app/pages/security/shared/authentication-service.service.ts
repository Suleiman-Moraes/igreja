import { IGREJA_API_AUTH, IGREJA_API_REFRESH } from './../../igreja/shared/igreja.api';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { UserLogado } from './user-logado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private currentUserSubject: BehaviorSubject<UserLogado>;
  public currentUser: Observable<UserLogado>;
  showTemplate = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient
  ) {
    const json = localStorage.getItem('tRcr7Ssn') != null ? atob(localStorage.getItem('tRcr7Ssn')) : null;
    this.currentUserSubject = new BehaviorSubject<UserLogado>(JSON.parse(json));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
    this.refresh();
  }

  public get currentUserValue(): UserLogado {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<UserLogado> {
    return this.http.post<any>(`${IGREJA_API_AUTH}`, user)
      .pipe(map(u => {
        // login successful if there's a jwt token in the response
        if (u && u.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.showTemplate.emit(true);
          localStorage.setItem('tRcr7Ssn', btoa(JSON.stringify(u)));
          this.currentUserSubject.next(u);
        } else {
          this.showTemplate.emit(false);
        }

        return u;
      }));
  }

  refresh(): Observable<UserLogado> {
    return this.http.get<any>(`${IGREJA_API_REFRESH}`)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.showTemplate.emit(true);
          localStorage.setItem('tRcr7Ssn', btoa(JSON.stringify(user)));
          this.currentUserSubject.next(user);
        } else {
          this.showTemplate.emit(false);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('tRcr7Ssn');
    this.showTemplate.emit(false);
    this.currentUserSubject.next(null);
  }
}

import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser1: Observable<User>;


  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser1')));
    this.currentUser1 = this.currentUserSubject.asObservable();

  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  //Saving callback details to database
addCallBack(newCallBack): Observable<any>{
let api = `${this.endpoint}/add-callback`;
return this.http.post(api,newCallBack)
.pipe(catchError(this.handleError))
  }

 // Get all students GetStudent
    GetCallBackDetails() {
      return this.http.get(`${this.endpoint}/list-callBack-not-done`);
    }

     // Get all students GetStudent
     GetCallBackDoneDetails() {
       
      return this.http.get(`${this.endpoint}/list-callBack-done`);
    }


  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['admin/' + res.msg._id]);
          localStorage.setItem('currentUser1', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
        })
      })
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

getCurrentUser(): Observable<any> {
  return this.currentUserSubject.asObservable();
}



  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

   // User Admin profile
   getAdminProfile(id): Observable<any> {
    let api = `${this.endpoint}/admin/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  updateCallBack(updateCallBack){
    let api = `${this.endpoint}/updateCallBackDetails`;
    return this.http.put(api,updateCallBack,{headers:this.headers});

  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { filter, tap } from 'rxjs/operators';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false
  errorMessage = undefined


  private userObservable$: Observable<User|null>
  constructor(private authSrv: AuthService, private router: Router) {
    this.userObservable$ = this.authSrv.user$.pipe(
      // tap(authData => console.log(authData)),
      filter(authData => null !== authData)
    )
  }
  ngOnInit(): void {
    this.subscribeTouserSessionData()

  }
  subscribeTouserSessionData() {
    this.userObservable$.subscribe(data => {
      console.log(data)
      this.router.navigate(['/'])
    })
  }
   onsubmit(form:any){

      this.authSrv.Login(form.value).subscribe(
        res=>{
        form.reset()
        this.errorMessage = undefined
        this.router.navigate(['home'])


    } )}}




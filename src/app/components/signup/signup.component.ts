import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  registra = {
    username: '' ,
    email:'',
    password:'',
    role:['']
  }


  isLoading = false
  errorMessage = undefined
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {

  }


   onsubmit(form:NgForm){
    this.isLoading = true
    this.registra.username = form.value.username;
    this.registra.email = form.value.email;
    this.registra.password = form.value.password;
    let ruolo = form.value.role;
    this.registra.role.splice(0,1)
    this.registra.role.push(ruolo);
    console.log(this.registra)
    this.authSrv.Signup(this.registra).subscribe(
      res=>{
        form.reset()
      this.isLoading = false
      this.errorMessage = undefined
      this.router.navigate(['/'])
      }
    )

    }}







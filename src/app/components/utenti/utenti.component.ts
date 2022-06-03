import { Component, OnInit } from '@angular/core';


import { AuthService } from 'src/app/auth/auth.service';
import { User} from  'src/app/models/User'

@Component({
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {

  totalLenght:any;
  page!:number;
  users!: Array<User>;
  response:any;
  roles!:Array<User>

  constructor(public authSrv:AuthService) { }

  ngOnInit(): void {
    let p = new User;

    this.authSrv.getAll(0).subscribe((user)=>{
      this.response = user;
      this.users = user.content;
      this.roles = user.roles
      this.totalLenght = user.lenght;
});


}
CPage(p: number){
  this.authSrv.getAll(p).subscribe(user=>{
    console.log(user);
    this.response = user;
    this.users = user.content;
  })

}
counter(p:number){

    return new Array(p)
}
}






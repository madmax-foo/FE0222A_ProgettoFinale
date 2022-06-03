import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Cliente } from 'src/app/models/cliente';
import { User} from  'src/app/models/User'

@Component({
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {




    totalLenght:any;
    page!:number;
    clients!: Cliente[];
    response:any;


    constructor(public authSrv:AuthService, public router:Router) { }

    ngOnInit(): void {
      let p = new User;

      this.authSrv.cliGetAll(0).subscribe(client=>{
        this.response = client;
        this.clients = client.content;

        this.totalLenght = client.lenght;
  });


  }



  CPage(p: number){
    this.authSrv.getAll(p).subscribe(client=>{
      console.log(client);
      this.response = client;
      this.clients = client.content;
    })

  }
  counter(p:number){

      return new Array(p)
  }

  deleteCli(clientId:number,i:number){
    this.authSrv.deleteCli(clientId).subscribe(f=>{
      this.router.navigate(['/clienti'])
      this.clients?.splice(i,1)
     });

  }
  }

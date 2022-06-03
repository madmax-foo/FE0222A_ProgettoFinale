import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Fattura } from 'src/app/models/fattura';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss']
})
export class DettaglioComponent implements OnInit {
  fatture!: Fattura[]
  response: any
  id!:number
  data!:Fattura[]
  idCliente!:number
  constructor(private authSrv: AuthService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.id = +params['id'];
      console.log(this.id);
      this.loadDetails(this.id);
  });
}
    loadDetails(id:number){
    this.authSrv.getFattCli(id, 0).subscribe(c=>{
      this.response = c;
      this.fatture = this.response.content;
      console.log('this.fatture',this.fatture);
    });
    }


  }

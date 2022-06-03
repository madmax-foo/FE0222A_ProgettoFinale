import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Fattura } from 'src/app/models/fattura';


@Component({
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {

  totalLenght:any;
  page!:number;
  fattureTot!: Fattura[];
  response:any;
  stati!:Array<Fattura>;
  cliente!:[];

  constructor(public authSrv:AuthService, public router:Router) { }

  ngOnInit(): void {
    let p = new Fattura;

      this.authSrv.getFatt(0).subscribe(fatt=>{
        this.response = fatt;
        this.fattureTot = fatt.content;
        this.stati = fatt.stato;
        this.cliente = fatt.cliente;
        this.totalLenght = fatt.lenght;



  });


  }
deleteFatt(fattId:number,i:number){
  this.authSrv.deleteFatt(fattId).subscribe(f=>{
   this.router.navigate(['/fatture'])
   this.fattureTot?.splice(i,1)
   alert('Stai per eliminare questa fattura. Sei sicuro?' )
  });
}


changePage(p: number) {
  this.authSrv.getFatt(p).subscribe(fatt =>{
    this.response = fatt
    this.fattureTot = fatt.content

  })
}
counter (p:number) {
  return new Array(p)
}



}



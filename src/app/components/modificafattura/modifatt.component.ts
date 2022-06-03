import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Fattura } from 'src/app/models/fattura';
import { statoFattura } from 'src/app/models/statofattura';

@Component({
  templateUrl: './modifatt.component.html',
  styleUrls: ['./modifatt.component.scss']
})
export class ModifattComponent implements OnInit {
form!:FormGroup ;
id! : number;
fattura!: Fattura;
tipo!: Fattura;
item!: Fattura;
idCliente!:number;
statoFattura!: statoFattura[];

  constructor(public fb:FormBuilder,private route:ActivatedRoute, private authSrv:AuthService,private router:Router ) {

  }




  ngOnInit(): void {
    console.log('ngOnInit');
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
      this.idCliente = +params['idCliente'];
      console.log(this.id)
      this.initForm();
      this.Load();
      });
      this.CaricaStatoFatture();
  }

  initForm(){
    console.log('initForm');
    this.form = this.fb.group({
      data: new FormControl ('',[Validators.required]),
      numero:  new FormControl ('',[Validators.required]),
      anno:  new FormControl ('',[Validators.required]),
      importo:  new FormControl ('',[Validators.required]),
      stato:  new FormControl ('')
    });

  }
//funzione che stabilisce se nuova Fattura o Modifica tramite id//
  send(DatiForm:{value:{data:string; numero:number;anno:number; importo:number;stato:number;};}){
    console.log(0);
    console.log(DatiForm.value);
    if(!this.id){
      this.id = 0
      this.fattura = {id:0,numero:0,anno:0,data:'',importo:0,stato:{id:0, nome:''},cliente:
      {}};

   if(!this.form.valid){
    alert('compilare tutti i campi');
    return;
  }
    }
    this.fattura.id = this.id;
    this.fattura.data = DatiForm.value.data;
    this.fattura.numero = DatiForm.value.numero;
    this.fattura.anno = DatiForm.value.anno;
    this.fattura.importo = DatiForm.value.importo;
    this.fattura.stato.id = DatiForm.value.stato;
    if (this.idCliente) {this.fattura.cliente.id = this.idCliente;}

    this.authSrv.Save(this.id,this.fattura).subscribe(res =>{
      console.log(res);
      this.router.navigate(['/fatture']);
    })
  }



//caricamento fatture per id//
  Load(){
if(this.id!==0){
  this.authSrv.getById(this.id).subscribe(
    data => {
      console.log(data);
      this.fattura = data;
      this.fattura.data = this.fattura.data.substr(0,10);

      this.form.patchValue({
        data:this.fattura.data,
        numero:this.fattura.numero,
        anno:this.fattura.anno,
        importo:this.fattura.importo,
        stato:this.fattura.stato.id
      })
    }
  );
}
}


CaricaStatoFatture(){
  this.authSrv.getStatoFatt(0).subscribe(
    data => {
      this.statoFattura = data.content;
        }
      );
    }
  }






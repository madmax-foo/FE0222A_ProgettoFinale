import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Comune } from 'src/app/models/comune';
import { Cliente } from 'src/app/models/cliente';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './newcli.component.html',
  styleUrls: ['./newcli.component.scss']
})
export class NewcliComponent implements OnInit {
  path = false;
  form!:FormGroup;
 sub!:Subscription;
  indirizzoSedeOperativa!:FormGroup
 cliente!:Cliente
 comuni!: Comune[]

 constructor(public fb:FormBuilder,private route:ActivatedRoute, private authSrv:AuthService,private router:Router ) { }

updateForm(cliente:Cliente){
  this.form.patchValue({
    ragioneSociale: cliente.ragioneSociale,
    partitaIva: cliente.partitaIva,
    tipoCliente: cliente.tipoCliente,
    email:cliente.email,
    nomeContatto:cliente.nomeContatto,
    cognomeContatto:cliente.cognomeContatto,
    emailContatto:cliente.emailContatto,
    indirizzoSedeOperativa:cliente.indirizzoSedeOperativa,
  })




}




//inizializzazione form al caricamento pagina
  initForm(){
  this.form = this.fb.group({
  ragioneSociale:this.fb.control(''),
  tipoCliente:this.fb.control(''),
  nomeContatto:this.fb.control(''),
  cognomeContatto: this.fb.control(''),
  email: this.fb.control('', Validators.email),
  emailContatto: this.fb.control(''),
  partitaIva:this.fb.control(''),
  indirizzoSedeOperativa:this.fb.group({
    via: this.fb.control('', [Validators.required]),
    civico: this.fb.control('', [Validators.required]),
    localita: this.fb.control('', [Validators.required]),
    cap: this.fb.control('', [Validators.required]),
    comune: this.fb.control([''], [Validators.required])
  })


})}





  ngOnInit(): void {
    this.initForm();
this.getPth()
this.getComuni()

  }

  getPth(){
    this.sub = this.route.params.subscribe((params:Params)=>{
      console.log(this.route.snapshot.url[1])


      if (this.route.snapshot.url[1]) {
        const id = +params["id"];
        console.log(id)
        this.getcli(id);
        return;
      }
      this.path = true;

    });}

    getcli(id:number){
this.sub = this.authSrv.cliById(id).subscribe((data)=>{
  this.cliente = data;
  this.updateForm(this.cliente);

})
 }


    getComuni(){
      this.sub = this.authSrv.getComuni(0).subscribe((data)=>{

          this.comuni = data.content;
    })}

    putCli(id:number ,cliente:Cliente){
      this.sub = this.authSrv.putCli(id,cliente).subscribe(()=>{
        console.log(this.form)
        alert('Il cliente  è stato aggiunto');
        this.router.navigate(["/clienti"]);
      })
    }




  newclient(cliente:Cliente){

    this.authSrv.newCli(cliente).subscribe(res =>{
      console.log(res);
      console.log(this.form.value);


      this.router.navigate(['/clienti']);
      alert('Cliente aggiunto con successo!')
    })
    }
  }


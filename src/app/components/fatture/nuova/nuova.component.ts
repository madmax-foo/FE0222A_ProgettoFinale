import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Comune } from 'src/app/models/comune';
import { Cliente } from 'src/app/models/cliente';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { statoFattura } from 'src/app/models/statofattura';


@Component({
  templateUrl: './nuova.component.html',
  styleUrls: ['./nuova.component.scss']
})
export class NuovaComponent implements OnInit {

  statoFattura!: statoFattura[];
  form!:FormGroup;
  id=0;


  constructor(public fb:FormBuilder,private route:ActivatedRoute, private authSrv:AuthService,private router:Router) { }





  ngOnInit(): void {
    console.log('initForm')
    this.initForm();
    }


  onsubmit(id:number){
    this.authSrv.Save(this.id,Fattura).subscribe(res =>{

      this.router.navigate(['/fatture']);
      alert('Cliente aggiunto con successo!')

    })

    console.log(this.form.value)

  }


  initForm(){
    this.form = this.fb.group({
    data:new FormControl(''),
    numero:new FormControl(''),
    anno: new FormControl(''),
    importo: new FormControl(''),
    stato:this.fb.group({
    nome: this.fb.control('')
 })


})}}

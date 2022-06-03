import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pathApi:string;
 jwtHelper = new JwtHelperService();
 private userStor: string = 'user'
 private authSubj = new BehaviorSubject<null | User>(null);

 //elementi per guard
 user$ = this.authSubj.asObservable();
 isLogged$ = this.user$.pipe(map(user=>!!user))

  constructor(private http:HttpClient, public router:Router) {

    this.pathApi = environment.pathApi;
    this.restore();
  }


//gestione sessioni
  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userdata: User = JSON.parse(user);
    this.authSubj.next(userdata)
  }
  getCurrentSession(): User{
    const jsonData: any = localStorage.getItem(this.userStor)
    return JSON.parse(jsonData)
  }
  applyCurrentSession() {
    let datiUser: User = this.getCurrentSession()
    this.authSubj.next(datiUser)
  }

                                //COMUNI//
  getComuni(p:number){
    return this.http.get<any>(this.pathApi + '/api/comuni?page=/' + p  +'&size=20&sort=id,ASC')
  }


//api rest per:Users
  getAll(p:number){
    console.log('getAll');
    return this.http.get<any>(this.pathApi + '/api/users?page=' + p);

  }
                                 //CLIENTI//
cliById(id:number){
  return this.http.get<any>(this.pathApi + '/api/clienti/' + id);
}
putCli(id:number, item:any){
  return this.http.put<any>(this.pathApi + '/api/clienti/' + id,item)
}

  newCli(item:any){
    return this.http.post<any>(this.pathApi + '/api/clienti', item);
  }

  cliGetAll(p:number){
    console.log('getAll');
    return this.http.get<any>(this.pathApi + '/api/clienti/?page=' +p + '&size=80&sort=id,ASC')
  }

  deleteCli(id:number) {
    return this.http.delete<any>(this.pathApi + '/api/clienti/' + id)
  }
                                   //FATTURE//
  deleteFatt(id:number) {
    return this.http.delete<any>(this.pathApi + '/api/fatture/' + id)
  }


 getFatt(p:number){
    console.log('getFatture')
    return this.http.get<any>(this.pathApi + '/api/fatture?page=' +p + '&size=40&sort=id,ASC')
  }

  getById(ID:number){
    return this.http.get<any>(this.pathApi + '/api/fatture/' + ID);
  }


  getStatoFatt(p:number){
    return this.http.get<any>(this.pathApi + '/api/statifattura?page=' +p+ '&size=20&sort=id,ASC')
  }

  Save(id:number,item:any){
    if(id===0){
      return this.http.post<any>(this.pathApi + '/api/fatture', item);
    }else
    {
      return this.http.put<any>(this.pathApi + '/api/fatture/' + id, item);
    }
  }


getFattCli(id:number,p:number){
  return this.http.get<any>(this.pathApi + '/api/fatture/cliente/' +id+ '?page='+ p + '&size=20&sort=id,ASC' )
}
//logout//

 logout() {
  localStorage.removeItem(this.userStor)

  this.authSubj.next(null)
  this.router.navigate(['/'])
}


//Login / Signup API //

Signup(data:any){
  console.log(data)
  return this.http.post<any>(this.pathApi + '/api/auth/signup',data);

}
Login(datiUser: User){

  return this.http.post<User>(this.pathApi + '/api/auth/login', datiUser).pipe(
    tap(val=>{
      this.authSubj.next(datiUser)
      console.log(datiUser)}),tap(datiUser=>{
        this.authSubj.next(datiUser)

        localStorage.setItem('user', JSON.stringify(datiUser))
      localStorage.setItem(this.userStor, JSON.stringify(datiUser))

      console.log(datiUser)
    }))
  };



}



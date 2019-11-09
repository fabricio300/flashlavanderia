import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  api : string = 'https://flash-wash-01.herokuapp.com/api/v1/'
  status_de_secion=false

  constructor(private http: HttpClient) { }



  registrar(item:any):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}lavanderias`,item, httpOptions)
  }


  setServiciosLavanderia(item:any):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}servicioLavanderia`,item, httpOptions)
  }



  setServiciosTintoreria(item:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}servicioTintoreria`,item, httpOptions)
  }


  setServiciosotros(item:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}servicioOtro`,item, httpOptions)
  }


  setOfertar(item:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}servicioOferta`,item, httpOptions)
  }



  setServiciosPlanchado(item:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}servicioPlanchado`,item, httpOptions)
  }

  

  login(item:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}lavanderiasLogin`,item, httpOptions)
  }


  getPedidos(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}pedidos_lavanderia/${id}`, httpOptions)
  }



  getCliente(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}usuarios/${id}`, httpOptions)
  }



}

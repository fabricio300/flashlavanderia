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



  getDatosLavanderia(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}lavanderias/${id}`, httpOptions)
  }

  


  getServiciosLavanderia(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}servicioLavanderia/${id}`, httpOptions)
  }


  getServiciosTintoreria(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}servicioTintoreria/${id}`, httpOptions)
  }


  getServiciosPlanchado(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}servicioPlanchado/${id}`, httpOptions)
  }



  getServiciosOtros(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}servicioOtro/${id}`, httpOptions)
  }


  getOfertas(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}servicioOferta/${id}`, httpOptions)
  }


  actualizarDatosLavanderia(item:any,id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}lavanderias_edit/${id}`,item,httpOptions)
  }


  actualisarServiciosLavanderia(item:any,id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}servicioLavanderia/${id}`,item,httpOptions)
  }



  actualisarServiciosTintoreria(item:any,id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}servicioTintoreria/${id}`,item,httpOptions)
  }



  actualisarServiciosPlanchado(item:any,id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}servicioPlanchado/${id}`,item,httpOptions)
  }


  

  actualisarServiciosOfertas(item:any,id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}servicioOferta/${id}`,item,httpOptions)
  }


  actualisarServiciosOtros(item:any,id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}servicioOtro/${id}`,item,httpOptions)
  }


  getRepartidores():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}repartidores`,httpOptions)
  }



  
  asignarRepartidor(item:any,id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}pedidos_lavanderia/${id}`,item,httpOptions)
  }



  getPedido(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}pedidos/${id}`,httpOptions)
  }


  getRepartidor(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.get(`${this.api}repartidores/${id}`,httpOptions)
  }


  setDatosRapaPedido(id:any,item:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.put(`${this.api}pedidos_lavanderia_datos/${id}`,item,httpOptions)
  }


}

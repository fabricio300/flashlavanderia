import { Component, OnInit } from '@angular/core';
import { efectos } from './Efectos';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  efectos=new efectos()

  lavanderia=[]
  tintoreria=[]
  planchado=[]
  otros=[]
  ofertas=[]

  idOfertas=0
  idPlnchados=0
  idOtros=0

  elemento:any
  

  constructor() { }



  ngOnInit() {
    this.efectos.ocultarAddService()
    this.efectos.idPlanchados=this.idPlnchados
    this.efectos.idOfertas=this.idOfertas
    this.efectos.idOtros=this.idOtros
  }


  guardar(){
      if(this.efectos.edit==true){
        this.gardarEditado()
      }else{
        this.addServicio()
      }
  }

  addServicio(){
      let servicio=this.efectos.getItem()
      
      switch (servicio.tipo) {
        case 1: this.lavanderia.push(servicio.item)
          break;
          case 2:
             this.tintoreria.push(servicio.item)
          break;
          case 3: this.planchado.push(servicio.item)  
          break;
          case 4:this.ofertas.push(servicio.item)
          break;
          case 5: this.otros.push(servicio.item)  
          break;
      
        default:
          break;
      }
      this.efectos.ocultarAddService()
     
      
  }


    editar(item , tipo){
        this.efectos.edit=true
        this.elemento=item
        switch (tipo) {
          case 1: this.efectos.servicio=item.servicio
                  this.efectos.unidad=item.unidad
                  this.efectos.precio=item.precio
                  this.efectos.descripcion=item.descripcion
            break; 
            case 2: this.efectos.servicio=item.servicio
                    this.efectos.unidad=item.unidad
                    this.efectos.precio=item.precio
                    this.efectos.descripcion=item.descripcion
            
            break; 
            case 3: 
                    this.efectos.unidad=item.unidad
                    this.efectos.precio=item.precio
                    this.efectos.descripcion=item.descripcion
            
            break; 
            case 4: this.efectos.titulo=item.titulo
                    this.efectos.descripcion=item.descripcion
            
            break; 
            case 5: this.efectos.titulo=item.titulo
                    this.efectos.descripcion=item.descripcion
            
            break;
        
          default:
            break;
        }
        this.efectos.mostrasAddService()
    }

    

    gardarEditado(){
      console.log("tipo",this.efectos.tipoDeServicoElegido);
      
      switch (this.efectos.tipoDeServicoElegido) {

        case 1:  
            this.efectos.id=this.elemento.id   
            this.lavanderia=this.eval(this.lavanderia,this.elemento.id)
            //console.log("v", this.lavanderia)
        break; 
          case 2:this.efectos.id=this.elemento.id
                 this.tintoreria=this.eval(this.tintoreria,this.elemento.id)
        break; 
          case 3:this.efectos.idPlanchados=this.elemento.id
                 this.planchado=this.eval(this.planchado,this.elemento.id) 
                 this.efectos.idPlanchados=this.planchado[this.planchado.length-1].id+1
          break; 
          case 4:
              this.efectos.idOfertas=this.elemento.id
              this.ofertas=this.eval(this.ofertas,this.elemento.id) 
              this.efectos.idOfertas=this.ofertas[this.ofertas.length-1].id+1
          break; 
          case 5: this.efectos.idOtros=this.elemento.id
                  this.otros=this.eval(this.otros,this.elemento.id) 
                  this.efectos.idOtros=this.otros[this.otros.length-1].id+1
          break;
        default:
          break;
      }
      this.efectos.ocultarAddService()
    }



    eval(arreglo,id){          
      for (let index = 0; index < arreglo.length; index++) {
              if(arreglo[index].id==id){
                console.log("encontrado");
                  let auxi=this.efectos.getItem()
                  arreglo[index]=auxi.item
              }
        
      }

      console.log("arreglo",arreglo);
      
      return arreglo
    }
    



    borrar(arreglo, id){

      for (let index = 0; index < arreglo.length; index++) {
                  if(arreglo[index].id==id){
                    arreglo.splice(index, 1);
                  }
            
          }
    
          console.log("arreglo",arreglo);
          
          return arreglo
    }

}

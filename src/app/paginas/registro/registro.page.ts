import { Component, OnInit } from '@angular/core';
import { efectos } from './Efectos';
import {Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  efectos=new efectos()

  private formRegistro : FormGroup

  lavanderia=[]
  tintoreria=[]
  planchado=[]
  otros=[]
  ofertas=[]

  idOfertas=0
  idPlnchados=0
  idOtros=0

  elemento:any
  

  emailValido='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
  nombreValido='[a-zA-ZÀ-ÿ ]{3,50}'
  apellidosValidos='[a-zA-ZÀ-ÿ ]{3,48}'
  contraseniaValida='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'
  numeroValido='[0-9]{10}'

  constructor(
    private formBuilder: FormBuilder
  ) { 
      this.formRegistro=this.formBuilder.group({
        nombre:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.nombreValido)
        ])],
        apellidos:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.apellidosValidos)
        ])],
        contrasenia:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.contraseniaValida)
        ])],
        contrasenia2:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.contraseniaValida)
        ])],
        nombreLavanderia:['',Validators.required],
        correo:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.emailValido)
        ])],
        telefono:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.numeroValido)
        ])],
        haraIntiLV:['',Validators.required],
        haraEndtiLV:['',Validators.required],
        haraIntiS:['',Validators.required],
        haraEndtiS:['',Validators.required],
        
      })

  }



  ngOnInit() {
    this.efectos.ocultarAddService()
    this.efectos.idPlanchados=this.idPlnchados
    this.efectos.idOfertas=this.idOfertas
    this.efectos.idOtros=this.idOtros
  }




/*************************servicios******************************************************************************* */



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
    


    deleteElement(id,tipo){
      switch (tipo) {
        case 1:   this.efectos.ocultarServices(id)
                  this.lavanderia=this.borrar(this.lavanderia,id)            
          break;
          case 2: this.efectos.ocultarServices(id)
                  this.tintoreria=this.borrar(this.tintoreria,id)
          break;
          case 3: this.planchado=this.borrar(this.planchado,id)
          break;
          case 4:this.ofertas=this.borrar(this.ofertas,id)
          break;
          case 5: this.otros=this.borrar(this.otros,id)
          break;
      
        default:
          break;
      }
      
    }


    borrar(arreglo, id){

      for (let index = 0; index < arreglo.length; index++) {
                  if(arreglo[index].id==id){
                    arreglo.splice(index, 1);
                  }
            
          }
          //console.log("arreglo",arreglo);
          return arreglo
    }

/*************************fin servicios******************************************************************************* */

}

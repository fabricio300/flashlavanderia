import { Component, OnInit } from '@angular/core';
import { efectos } from './Efectos';
import {Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';


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
    private formBuilder: FormBuilder,
    private apiservice:ApiServiceService,
    private router:Router
  ) { 
      this.formRegistro=this.formBuilder.group({
       /* nombre:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.nombreValido)
        ])],
        apellidos:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.apellidosValidos)
        ])],*/
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


/*************************datos******************************************************************************* */

validadContrasenias(){
 
  
  if(this.formRegistro.get('contrasenia').value==this.formRegistro.get('contrasenia2').value){
    this.efectos.next('Mapa')
  }else{
    this.efectos.forInfo=4
  }

}


/*************************fin datos******************************************************************************* */


/*************************imagenes******************************************************************************* */

imagenes=[]
base64textString:any
idImagen=0

handleFileSelect(evt){
  console.log(evt);
  
  var files = evt.target.files;
  var file = files[0];

if (files && file) {
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);
}

}



_handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
       // console.log(btoa(binaryString));

        console.log("otro: \n",this.base64textString);

      this.imagenes.push({id:this.idImagen, imagen:'data:image/jpeg;base64,'+this.base64textString})
      this.idImagen=this.idImagen+1
       //this.imagen64='data:image/jpeg;base64,'+this.base64textString
}

borrarImagen(id:any){
    for (let index = 0; index < this.imagenes.length; index++) {
          if(this.imagenes[index].id==id){
            this.imagenes.splice(index,1)
          }
      
    }
}


/*************************imagenes fin******************************************************************************* */



/*************************Registrar ******************************************************************************* */


registrarLavanderia(){

  this.efectos.next('Espera')

  let itemInfoLavanderia={
    nombre_lavanderia:this.formRegistro.get('nombreLavanderia').value,
    ///apellidos:this.formRegistro.get('apellidos').value,
    correo_electronico:this.formRegistro.get('correo').value, 
    contraseña:this.formRegistro.get('contrasenia').value, 
    telefono:this.formRegistro.get('telefono').value, 
    direccion:'up chiapas', 
    fotografias: JSON.stringify(this.imagenes), 
    horario_semana:JSON.stringify({inicio:this.formRegistro.get('haraIntiLV').value, fin:this.formRegistro.get('haraEndtiLV').value}), 
    horario_sabado:JSON.stringify({inicio:this.formRegistro.get('haraIntiS').value, fin:this.formRegistro.get('haraEndtiS').value}),  
    coordenadas:JSON.stringify({lat:16.615249, lon:-93.090523})
    
  }

  this.apiservice.registrar(itemInfoLavanderia).subscribe(response=>{

   //console.log("lava1",parseInt( response.id));
    let itemLavanderia={
      lavanderia_id:parseInt( response.id),
      servicio:JSON.stringify(this.lavanderia)
    }
    this.apiservice.setServiciosLavanderia(itemLavanderia).subscribe(response1=>{
       // console.log("lava",response1);
        
    })


    if(this.ofertas.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.ofertas)
      }
      this.apiservice.setOfertar(item).subscribe(response2=>{

      })
    }


    if(this.otros.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.otros)
      }
      this.apiservice.setServiciosotros(item).subscribe(response3=>{})
    }

    if(this.planchado.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.planchado)
      }

      this.apiservice.setServiciosPlanchado(item).subscribe(response4=>{})
    }

    if(this.tintoreria.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.tintoreria)
      }
      this.apiservice.setServiciosTintoreria(item).subscribe(response5=>{})
    }
    console.log("echo");
    
    this.apiservice.status_de_secion=true
    localStorage.setItem('sesion','true')
    this.router.navigate(['inicio/'])
  })

}



/*************************Registrar fin******************************************************************************* */



}

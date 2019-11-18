import { Component, OnInit } from '@angular/core';
import { efectos } from './Efectos';
import {Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { error } from 'util';
import { timeout } from 'q';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  efectos=new efectos()

  edit=false
  validado=false

  private formRegistro : FormGroup
  private formValidar : FormGroup

  tituloT='Registro'
  lavanderia=[]
  tintoreria=[]
  planchado=[]
  otros=[]
  ofertas=[]
  en_proceso=false
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
    private router:Router,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private alertacontroller: AlertController,
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



      this.formValidar=formBuilder.group({
        contrasenia:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.contraseniaValida)
        ])]
      })
     

  }



  ngOnInit() {
    this.efectos.ocultarAddService()
    this.efectos.idPlanchados=this.idPlnchados
    this.efectos.idOfertas=this.idOfertas
    this.efectos.idOtros=this.idOtros
    this.getPosicionActual()


    console.log("wwwwwwwwwww",localStorage.getItem('idLavanderia'));
    if(localStorage.getItem('idLavanderia')!=null){
      this.editAll()
      this.tituloT='Editar información'
    }
  }




/*************************servicios******************************************************************************* */
regresarX(){
  if(localStorage.getItem('idLavanderia')!=null){
    this.router.navigate(['/inicio'])
  }else{
    this.router.navigate(['/login'])
  }
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
          case 1: 
                  this.efectos.tipoDeServicoElegido=1
                  this.efectos.servicio=item.servicio
                  this.efectos.unidad=item.unidad
                  this.efectos.precio=item.precio
                  this.efectos.descripcion=item.descripcion
            break; 
            case 2: 
                    this.efectos.tipoDeServicoElegido=2
                    this.efectos.servicio=item.servicio
                    this.efectos.unidad=item.unidad
                    this.efectos.precio=item.precio
                    this.efectos.descripcion=item.descripcion
            
            break; 
            case 3: 
                    this.efectos.tipoDeServicoElegido=3
                    this.efectos.unidad=item.unidad
                    this.efectos.precio=item.precio
                    this.efectos.descripcion=item.descripcion
            
            break; 
            case 4: 
                    this.efectos.tipoDeServicoElegido=4
                    this.efectos.titulo=item.titulo
                    this.efectos.descripcion=item.descripcion
            
            break; 
            case 5: 
                    this.efectos.tipoDeServicoElegido=5
                    this.efectos.titulo=item.titulo
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
            console.log("v", this.lavanderia)
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
          case 3: 
                    console.log(this.planchado);
                    this.planchado.forEach(element => {
                          if(id==element.id){
                            console.log("",element.unidad);
                            this.efectos.unidades.forEach(element1 => {
                                console.log(element1);
                                  if(element1.title==element.unidad){

                                    element1.mal=false
                                  }
                            });
                          }
                      });
                  this.planchado=this.borrar(this.planchado,id)
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

recargar=0

registrarLavanderia(){

  this.efectos.next('Espera')

  let itemInfoLavanderia={
    nombre_lavanderia:this.formRegistro.get('nombreLavanderia').value,
    ///apellidos:this.formRegistro.get('apellidos').value,
    correo_electronico:this.formRegistro.get('correo').value, 
    contraseña:this.formRegistro.get('contrasenia').value, 
    telefono:this.formRegistro.get('telefono').value, 
    direccion:JSON.stringify({
      address:this.address,
      referencias:this.referencias
    }), 
    fotografias: JSON.stringify(this.imagenes), 
    horario_semana:JSON.stringify({inicio:this.formRegistro.get('haraIntiLV').value, fin:this.formRegistro.get('haraEndtiLV').value}), 
    horario_sabado:JSON.stringify({inicio:this.formRegistro.get('haraIntiS').value, fin:this.formRegistro.get('haraEndtiS').value}),  
    coordenadas:JSON.stringify({lat:this.lat, lon:this.lng})
    
  }

  this.apiservice.registrar(itemInfoLavanderia).subscribe(response=>{ 

    localStorage.setItem('idLavanderia',''+response.id)
    this.recargar=this.recargar+1
   
    
   //console.log("lava1",parseInt( response.id));
    let itemLavanderia={
      lavanderia_id:parseInt( response.id),
      servicio:JSON.stringify(this.lavanderia)
    }
    this.apiservice.setServiciosLavanderia(itemLavanderia).subscribe(response1=>{
       // console.log("lava",response1);
       this.recargar=this.recargar+1
       this.recargarpagina()
    })


    if(this.ofertas.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.ofertas)
      }
      this.apiservice.setOfertar(item).subscribe(response2=>{
        this.recargar=this.recargar+1
        this.recargarpagina()
      })
    }


    if(this.otros.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.otros)
      }
      this.apiservice.setServiciosotros(item).subscribe(response3=>{this.recargar=this.recargar+1
        this.recargarpagina()
      })
    }

    if(this.planchado.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.planchado)
      }

      this.apiservice.setServiciosPlanchado(item).subscribe(response4=>{this.recargar=this.recargar+1
        this.recargarpagina()
      })
    }

    if(this.tintoreria.length>0){
      let item={
        lavanderia_id:response.id,
        servicio:JSON.stringify(this.tintoreria)
      }
      this.apiservice.setServiciosTintoreria(item).subscribe(response5=>{this.recargar=this.recargar+1
        this.recargarpagina()
      })
    }
    console.log("echo");
    
   
    this.recargarpagina()
    
  })

}


recargarpagina(){
  let cantidad=1
  
  if(this.lavanderia.length>0){
    cantidad=cantidad+1
  }

  if(this.tintoreria.length>0){
    cantidad=cantidad+1
  }

  if(this.planchado.length>0){
    cantidad=cantidad+1
  }

  if(this.ofertas.length>0){
    cantidad=cantidad+1
  }
  if(this.otros.length>0){
    cantidad=cantidad+1
  }

    if(this.recargar==cantidad){
      this.apiservice.status_de_secion=true
      localStorage.setItem('sesion','true')
      this.router.navigate(['inicio/'])

      setTimeout(()=>{
        this.lavanderia=[]
        this.tintoreria=[]
        this.planchado=[]
        this.otros=[]
        this.ofertas=[]
        this.ngOnInit()
      },2000)
      
    }
}



/*************************Registrar fin******************************************************************************* */




/*************************mapa******************************************************************************* */

lat: number;
lng: number;
zoom:number=16
address:string=''
referencias=''


getPosicionActual(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.lat=parseFloat(''+resp.coords.latitude)
    this.lng=parseFloat(''+resp.coords.longitude)
    this.getAddress(this.lat, this.lng);
   }).catch((error) => {
     console.log('Error getting location', error);
   });
}


markerDragEnd($event:any) {
  console.log($event);
  this.lat =parseFloat(''+$event.coords.lat);
  this.lng =parseFloat(''+$event.coords.lng);
  
  this.getAddress(this.lat, this.lng);
}


getAddress(latitude, longitude){
  this.address=''
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  this.nativeGeocoder.reverseGeocode(latitude,longitude, options)
  .then((result: NativeGeocoderResult[]) =>{
    console.log("es este ",result[0])
      //console.log("es este ",result[0].thoroughfare,", ",result[0].subLocality,", ",result[0].postalCode,",",result[0].locality,", ",result[0].administrativeArea,", ",result[0].countryName);
      if(result[0].thoroughfare.length>0){
        this.address=this.address+result[0].thoroughfare+", "
      }
      if(result[0].subLocality.length>0){
        this.address=this.address+result[0].subLocality+", "
      }
      if(result[0].postalCode.length>0){
        this.address=this.address+result[0].postalCode+", "
      }
      this.address=this.address+result[0].locality+", "+result[0].administrativeArea+", "+result[0].countryCode

     
  })
  .catch((error: any) => console.log(error));
}



/*************************mapa fin******************************************************************************* */



/*************************edit ******************************************************************************* */


editAll(){
  this.edit=true
 
  this.efectos.next('MenuEdit')
    this.apiservice.getDatosLavanderia(localStorage.getItem('idLavanderia')).subscribe(Response=>{
      //console.log("thisssssss",Response);

      let direction:any=JSON.parse(Response.direccion)
      this.address=direction.address
      this.referencias=direction.referencias
      let coodernadas:any =JSON.parse(Response.coordenadas)
      this.lat=parseFloat(coodernadas.lat)
      this.lng=parseFloat(coodernadas.lon)


      let images:any=JSON.parse(Response.fotografias)
      images.forEach(element => {
        this.imagenes.push({id:element.id, imagen:element.imagen})
      });


      this.formRegistro.get('nombreLavanderia').setValue(Response.nombre_lavanderia)
      this.formRegistro.get('telefono').setValue(Response.telefono)
      this.formRegistro.get('correo').setValue(Response.correo_electronico)
      let horioLunesViernes:any=JSON.parse(Response.horario_semana)
      this.formRegistro.get('haraIntiLV').setValue(horioLunesViernes.inicio)
      this.formRegistro.get('haraEndtiLV').setValue(horioLunesViernes.fin)
      let horioSabados:any=JSON.parse(Response.horario_sabado)
      this.formRegistro.get('haraIntiS').setValue(horioSabados.inicio)
      this.formRegistro.get('haraEndtiS').setValue(horioSabados.fin)
     
   

    })


    this.apiservice.getServiciosLavanderia(localStorage.getItem('idLavanderia')).subscribe(Response=>{

       // console.log("servicio lavanderia ",Response);
        //this.efectos.tipoDeServicoElegido=1
       
        let services:any=JSON.parse(Response[0].servicio)

        //console.log("Servicions=",services);
        if(services.length>0){
        services.forEach(element => {
          this.efectos.actualNew(1)
          this.efectos.vewServicios(element.servicio ,element.id)
          this.efectos.unidad=element.unidad
          this.efectos.precio=element.precio
          this.efectos.descripcion=element.descripcion
         
          this.guardar()
        });
      }

    })


    this.apiservice.getServiciosTintoreria(localStorage.getItem('idLavanderia')).subscribe(Response=>{
      //console.log("getServiciosTintoreria lavanderia ",Response);
      //this.efectos.tipoDeServicoElegido=2
    
      let services:any=JSON.parse(Response[0].servicio)
      //console.log("getServiciosTintoreria=",services);

      if(services.length>0){
        this.efectos.actualNew(2)
              services.forEach(element => {

                this.efectos.vewServicios(element.servicio ,element.id)
                this.efectos.unidad=element.unidad
                this.efectos.precio=element.precio
                this.efectos.descripcion=element.descripcion
              
                this.guardar()
              });

              this.efectos.actualNew(1)
      }

    })


  this.apiservice.getServiciosPlanchado(localStorage.getItem('idLavanderia')).subscribe(Response=>{
    //this.efectos.tipoDeServicoElegido=3

    //console.log("getServiciosPlanchado lavanderia ",Response);
      let services:any=JSON.parse(Response[0].servicio)
      //console.log("getServiciosPlanchado=",services);


      if(services.length>0){
        this.efectos.actualNew(3)
         
          //console.log("ssssss", this.efectos.idPlanchados);
         // console.log("ccccccccccccccc");
          services.forEach(element => {
               this.efectos.unidades.forEach(element1 => {

                if(element.unidad==element1.title){
                    //console.log(element1);
                    this.idPlnchados=element.id
                    this.efectos.vewUnidades(element1,element.unidad)
                    this.efectos.unidad=element.unidad
                    this.efectos.precio=element.precio
                    this.efectos.descripcion=element.descripcion
                 

                    this.guardar()
                  }
                });
          });

          this.efectos.idPlanchados=(services[services.length-1].id)+1
          ///console.log("fin",this.planchado);
          this.efectos.actualNew(1)
      }

  })    


  this.apiservice.getOfertas(localStorage.getItem('idLavanderia')).subscribe(Response=>{
    //this.efectos.tipoDeServicoElegido=4
    
   // console.log("getOfertas lavanderia ",Response);
    let services:any=JSON.parse(Response[0].servicio)
    //console.log("getServiciosPlanchado=",services);
  
    //console.log("ssssss", this.efectos.idOfertas);
    if(services.length>0){
      this.efectos.actualNew(4)
        services.forEach(element => {
          this.efectos.idOfertas=element.id
          this.efectos.descripcion=element.descripcion
          this.efectos.titulo=element.titulo
          this.guardar()
        });

        //console.log("fin",this.ofertas);
        this.efectos.idOfertas=(services[services.length-1].id)+1
        this.efectos.actualNew(1)
    }
   
  })


this.apiservice.getServiciosOtros(localStorage.getItem('idLavanderia')).subscribe(Response=>{

    //console.log("este",Response);
    //this.efectos.tipoDeServicoElegido=5
   
    let services:any=JSON.parse(Response[0].servicio)
    //console.log("getServiciosOtros=",services);

    if(services.length>0){
      this.efectos.actualNew(5)
      services.forEach(element => {
        this.efectos.idOtros=element.id
        this.efectos.descripcion=element.descripcion
        this.efectos.titulo=element.titulo
        this.guardar()
      });

      console.log("fin",this.ofertas);
      this.efectos.idOfertas=(services[services.length-1].id)+1
      this.efectos.actualNew(1)
  }

})



}

cancaelarAcualizado(){
  this.efectos.next('MenuEdit')
  this.lavanderia=[]
  this. tintoreria=[]
  this.planchado=[]
  this.otros=[]
  this.ofertas=[]
  this.imagenes=[]

  this.lavanderia=[]
  this.editAll()
 
}



guadarEditLavanderia(){
  this.en_proceso=true
  let item={
    nombre_lavanderia:this.formRegistro.get('nombreLavanderia').value,
    ///apellidos:this.formRegistro.get('apellidos').value,
    correo_electronico:this.formRegistro.get('correo').value, 
    telefono:this.formRegistro.get('telefono').value, 
    direccion:JSON.stringify({
      address:this.address,
      referencias:this.referencias
    }), 
    fotografias: JSON.stringify(this.imagenes), 
    horario_semana:JSON.stringify({inicio:this.formRegistro.get('haraIntiLV').value, fin:this.formRegistro.get('haraEndtiLV').value}), 
    horario_sabado:JSON.stringify({inicio:this.formRegistro.get('haraIntiS').value, fin:this.formRegistro.get('haraEndtiS').value}),  
    coordenadas:JSON.stringify({lat:this.lat, lon:this.lng})
  }

  this.apiservice.actualizarDatosLavanderia(item,localStorage.getItem('idLavanderia')).subscribe(Response=>{

    console.log("actulizado",Response);
    this.efectos.next('MenuEdit')
    this.en_proceso=false
    this.verAlerta('Los cambios realizados han sido exitosos','Cambios realizados','Proceso finalizado')
  })




  let itemLavanderiaX={
    lavanderia_id:localStorage.getItem('idLavanderia'),
    servicio:JSON.stringify(this.lavanderia)
  }
  this.apiservice.actualisarServiciosLavanderia(itemLavanderiaX,localStorage.getItem('idLavanderia')).subscribe(Response=>{
    console.log("servicios lavanderia actualizados");
    
  })





  let itemLavanderiaT={
    lavanderia_id:localStorage.getItem('idLavanderia'),
    servicio:JSON.stringify(this.tintoreria)
  }
  this.apiservice.actualisarServiciosTintoreria(itemLavanderiaT,localStorage.getItem('idLavanderia')).subscribe(Response=>{
    console.log("servicios tintoreria actualizados");
    
  })




  let itemLavanderiaP={
    lavanderia_id:localStorage.getItem('idLavanderia'),
    servicio:JSON.stringify(this.planchado)
  }
  this.apiservice.actualisarServiciosPlanchado(itemLavanderiaP,localStorage.getItem('idLavanderia')).subscribe(Response=>{
    console.log("servicios planchado actualizados");
    
  })




  let itemLavanderiaO={
    lavanderia_id:localStorage.getItem('idLavanderia'),
    servicio:JSON.stringify(this.ofertas)
  }
  this.apiservice.actualisarServiciosOfertas(itemLavanderiaO,localStorage.getItem('idLavanderia')).subscribe(Response=>{
    console.log("servicios ofertas actualizados");
    
  })



  let itemLavanderiaOt={
    lavanderia_id:localStorage.getItem('idLavanderia'),
    servicio:JSON.stringify(this.otros)
  }
  this.apiservice.actualisarServiciosOtros(itemLavanderiaOt,localStorage.getItem('idLavanderia')).subscribe(Response=>{
    console.log("servicios otros actualizados");
    
  })


}



combroparValidar(){
  let item={
    correo_electronico:this.formRegistro.get('correo').value,
    contraseña:this.formValidar.get('contrasenia').value
  }
  this.apiservice.login(item).subscribe(Response=>{
    this.validado=true
  },error=>{
    this.verAlerta('vuelva a intentar ','contraseña incorrecta','Error')
  })
}




async verAlerta(mesaje,submensaje,titulo){
  const alerta=await this.alertacontroller.create({
    header:titulo,
    subHeader:submensaje,
    message:mesaje,
    buttons:['Aceptar']

})

await alerta.present()
}


/*************************edit fin******************************************************************************* */





}

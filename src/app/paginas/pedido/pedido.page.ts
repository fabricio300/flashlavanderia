import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';
import { Socket } from 'ngx-socket-io';
import { NavController } from '@ionic/angular';
import { NotificaService } from '../../notificaciones/notifica.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  cancel='../../../assets/iconos/cross.png'
  lava='../../../assets/iconos/washing-machine2.png'
  moto0='../../../assets/iconos/vespa4.png'
  moto1='../../../assets/iconos/vespa3.png'
  moto2='../../../assets/iconos/vespa2.png'
  nuevo='../../../assets/iconos/new-product.png'
  esperando='../../../assets/iconos/help.png'
  finalsizadp='../../../assets/iconos/check-mark.png'
 
  total=0

  pedido:any
  direccionCliente:any
  horaSolicitud:any
  coordenadas:any

  datosLavanderia:any=[]
  datosTintoreria:any=[]
  datosPlanchado:any=[]

  ver_insert_data=false
  ingresoDatos=false

  repartidor=null
  tipoPedido:any
  id_repartidor:any
  id_cliente:any
  asinar=false
  costos:any

  yo_ingrese_Datos=false
  

  constructor(
    private route: ActivatedRoute,
     private router: Router,
     private apiservice:ApiServiceService,
     private socket:Socket,
     private  navCtrl:NavController,
     private notificacion:NotificaService
  ) { 
    this.route.queryParams.subscribe(params => {
      this.pedido = JSON.parse(params.special);
      this.direccionCliente=JSON.parse( this.pedido.direccionCliente);
      console.log("eeeeeee",this.pedido);
      this.horaSolicitud=this.pedido.horaSolicitud
      this.coordenadas=this.direccionCliente.coordenadas
      //console.log("coordenadas=",this.coordenadas);
      this.verificarRespartidor(this.pedido.id)
   

      socket.on('se_actualiso_el_pedido'+'id_lavanderia'+localStorage.getItem('idLavanderia'),(data)=>{
        console.log('soket =',data);
       
        this.verificarRespartidor(this.pedido.id)
      })
  });
    
    setInterval(()=>{
        if(localStorage.getItem('esperaRepartidor')!=null && localStorage.getItem('esperaRepartidor')=='si'){
          this.verificarRespartidor(this.pedido.id)
          localStorage.setItem('esperaRepartidor','no')
        }else{
         
        }
    },1000)
    
  }

  ngOnInit() {
    this.ingresoDatos=false
    document.getElementById('IngresarDatos').style.marginLeft="-150%"
  }


 
  
asignarRepartidor(){

  let navigationExtras: NavigationExtras = {
    queryParams: {
      special: JSON.stringify({
        id:this.pedido.id,
        coordenadas:this.coordenadas,
        statusPedido:this.pedido.status
      
      })
    }
  };
  //console.log(pedido);
  this.router.navigate(['/repartidor'], navigationExtras);
  //this.router.navigate(['/pedido'])
}

bolberStatus(){
  this.router.navigateByUrl('/inicio')

  if(this.yo_ingrese_Datos==true){
    localStorage.setItem('actualiza','si')
  }else{
    localStorage.setItem('actualiza','no')
  }
  

}


verificarRespartidor(id){
  this.datosLavanderia=[]
  this.datosTintoreria=[]
  this.datosPlanchado=[]
  this.apiservice.getPedido(id).subscribe(Response=>{
    console.log("EEe",Response);
    this.id_cliente=Response.usuario_id
    this.pedido.status=Response.status
    this.pedido.icon=this.getStatusIcon(Response.status)
    this.tipoPedido=Response.tipo_entrega
    this.pedido.direccionCliente=Response.direccion_usuario
    this.verCasoDeAsignacion()
    console.log("iiiiiiiiiiiiiii",this.tipoPedido);
    
    this.costos=JSON.parse(Response.precio)

    console.log("peccionsssss",this.costos);
    if(Response.datos_ropa!=null){
     let datas:any=JSON.parse(Response.datos_ropa)
     console.log(datas);
     console.log("-----------------",datas.lavanderia);
     this.datosLavanderia=datas.lavanderia
     console.log("-----------------",datas.tintoreria);
     this.datosTintoreria=datas.tintoreria
     console.log("-----------------",datas.planchado);
     this.datosPlanchado=datas.planchado
     //this.setDatosServicios()
    }else{
      this.setDatosServicios()
    }
    this.id_repartidor=Response.repartidor_id

    
    if(Response.repartidor_id!=null){
      console.log("EEEEEEEEEEEEEEEEEE");
      this.apiservice.getRepartidor(Response.repartidor_id).subscribe(Response1=>{
        
        let foto:any=JSON.parse( Response1.foto_perfil)
        //console.log(foto);
        let item={
          id:Response1.id,
          nombres:Response1.nombres,
          apellidos:Response1.apellidos,
          telefono:Response1.telefono,
          foto:foto[0].imagen
        }

        this.repartidor=item
        console.log(this.repartidor);
        
      })
      
    }
  })
}


viewNserDatas(){
  document.getElementById('IngresarDatos').style.transition='0.5s'
  if(this.ver_insert_data){
    this.ver_insert_data=false
    document.getElementById('IngresarDatos').style.marginLeft="-150%"
  }else{
    this.ver_insert_data=true
    document.getElementById('IngresarDatos').style.marginLeft="0"
  }
}



setDatosServicios(){
  this.pedido.servicios.lavanderia.forEach(element => {
      console.log(element);
      let item1={
        precio: element.precio,
        servicio: element.servicio,
        unidad: element.unidad,
        cantidad:0,
        costo:0
      }
      this.datosLavanderia.push(item1)
      
  });
  console.log("Datos lavan", this.datosLavanderia);
  

  this.pedido.servicios.tintoreria.forEach(element => {
    console.log(element);
    let item1={
      precio: element.precio,
      servicio: element.servicio,
      unidad: element.unidad,
      cantidad:0,
      costo:0
    }
    this.datosTintoreria.push(item1)
    
});
console.log("Datos datosTintoreria", this.datosTintoreria);


this.pedido.servicios.planchado.forEach(element => {
  console.log(element);
  let item1={
    precio: element.precio,
    unidad: element.unidad,
    cantidad:0,
    costo:0
  }
  this.datosPlanchado.push(item1)
  
});
console.log("Datos datosPlanchado", this.datosPlanchado);
}



getTotal(){
  this.total=0
  if(this.datosLavanderia.length>0){
    this.datosLavanderia.forEach(element => {
      var elemento:any 
      elemento=document.getElementById(element.servicio)
      console.log(elemento);
      
      this.total=this.total+parseInt(elemento.value)
      element.costo=parseInt(elemento.value)

    });

      

  }


  if(this.datosTintoreria.length>0){
    this.datosTintoreria.forEach(element => {
      var elemento:any 
      elemento=document.getElementById(element.servicio)
      console.log(elemento);
      
      this.total=this.total+parseInt(elemento.value)
      element.costo=parseInt(elemento.value)

    });


    if(this.datosPlanchado.length>0){
      this.datosPlanchado.forEach(element => {
        var elemento:any 
        elemento=document.getElementById(element.unidad)
        console.log(elemento);
        
        this.total=this.total+parseInt(elemento.value)
        element.costo=parseInt(elemento.value)
  
      });
  
  
    }

  }
  
  this.costos.precio_lavanderia=''+this.total

  console.log("estos son los ultimimos costos",this.costos);
  
}

cancelarDatos(){
  if(this.datosLavanderia.length>0){
    this.datosLavanderia.forEach(element => {
        element.cantidad=0
        element.costo=0

    });}


  if(this.datosTintoreria.length>0){
    this.datosTintoreria.forEach(element => {
      element.cantidad=0
      element.costo=0

  });}
    
  if(this.datosPlanchado.length>0){
      this.datosPlanchado.forEach(element => {
        element.cantidad=0
        element.costo=0
  
  });}
    this.viewNserDatas()


}

async guardarDatosDelPedido(){
  this.viewNserDatas()
 
  let datos_ropa:any=JSON.stringify({
      lavanderia:this.datosLavanderia,
      tintoreria:this.datosTintoreria,
      planchado:this.datosPlanchado,
      datoRepartidor:''
    })
    
  this.apiservice.setDatosRapaPedido(this.pedido.id,{datos_ropa:datos_ropa}).subscribe(Response=>{
    console.log("echoooooooooo");
    this.yo_ingrese_Datos=true
    this.actualizarCostes()
    this.comfirmarRecivido()
      
    
  })
}


verCasoDeAsignacion(){
  if(this.pedido.status=='Nuevo pedido' || this.pedido.status=='En proceso'){
      switch(this.tipoPedido){
        case 'solo_entregar':
          if(this.pedido.status=='En proceso'){
            this.asinar=true
          }else this.asinar=false
        break;
        case 'solo_recojer':
            if(this.pedido.status=='Nuevo pedido'){
              this.asinar=true
            }else this.asinar=false
        break;
        case 'completo':  this.asinar=true
        break;

      }
  }else{
    this.asinar=false
  }
}


getStatusIcon(status){

  switch (status) {
    case 'En proceso': return this.lava
      
    break;

    case 'A lavandería': return this.moto2
      
      break;

      case 'Cancelado': return this.cancel
      
        break;

        case 'Entregando': return this.moto1
      
          break;
          case 'Recogiendo': return this.moto0
      
            break;
            case 'Nuevo pedido': return this.nuevo
      
              break;
              case 'Lista y limpia': return this.esperando
      
              break;
              case 'Finalizado': return this.finalsizadp
        
                break;
  
    default:
      break;
  }

}

actualizarStaus(){
  console.log("id_cliente_avisado",this.id_cliente);
  console.log("id_lavanderia_avisado",localStorage.getItem('idLavanderia'));
  
    this.socket.emit('nuevo_status','id_user'+this.id_cliente)
    this.verificarRespartidor(this.pedido.id)
    this.ingresoDatos=true
}



comfirmarRecivido(){
  let item={
    status:'En proceso'
  }

  let item2={
    repartidor_id:null,
    status:'En proceso'
  }
  this.apiservice.setStatusPedido(this.pedido.id,item).subscribe(Response=>{
    this.apiservice.asignarRepartidor(item2,this.pedido.id).subscribe(Response1=>{
      this.socket.emit('asignarReaptidor',this.id_repartidor)
      this.notificacion.emviarMensaje('El servicio esta en proceso','La lavandería a recibido su ropa','user'+this.id_cliente)
      this.notificacion.emviarMensaje('El servicio concluido','La lavandería a confirmado tu tarea','Repartidor'+this.id_repartidor)
      this.actualizarStaus()
      this.repartidor=null
    })
    
  })
}


ropaLavadaEspera(){
  let item={
    status:'Lista y limpia'
  }
  this.apiservice.setStatusPedido(this.pedido.id,item).subscribe(Response=>{
    this.actualizarStaus()
    this.notificacion.emviarMensaje('El servicio listo','La lavandería esta esperando que recojas tu ropa','user'+this.id_cliente)
  })

}

actualizarCostes(){
  let item={
    precio: JSON.stringify(this.costos),
    status:'En proceso'
  }

  this.apiservice.actualizarCostos(this.pedido.id,item).subscribe(Response=>{

      console.log("percios actualizados");
      this.notificacion.emviarMensaje('El servicio esta en proceso','La lavandería a recibido su ropa','user'+this.id_cliente)

  })
  localStorage.setItem('recargar','si')
}

}

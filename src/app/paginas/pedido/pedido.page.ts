import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

 
  total=0

  pedido:any
  direccionCliente:any
  horaSolicitud:any
  coordenadas:any

  datosLavanderia:any=[]
  datosTintoreria:any=[]
  datosPlanchado:any=[]

  ver_insert_data=false
  repartidor=null
  tipoPedido:any
  id_repartidor:any
  asinar=false
  constructor(
    private route: ActivatedRoute,
     private router: Router,
     private apiservice:ApiServiceService
  ) { 
    this.route.queryParams.subscribe(params => {
      this.pedido = JSON.parse(params.special);
      this.direccionCliente=JSON.parse( this.pedido.direccionCliente);
      console.log("eeeeeee",this.pedido);
      this.horaSolicitud=this.pedido.horaSolicitud
      this.coordenadas=this.direccionCliente.coordenadas
      //console.log("coordenadas=",this.coordenadas);
      this.verificarRespartidor(this.pedido.id)
   

  });
    
    
  }

  ngOnInit() {
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




verificarRespartidor(id){
  this.apiservice.getPedido(id).subscribe(Response=>{
    console.log("EEe",Response);

    this.tipoPedido=Response.tipo_entrega
    this.verCasoDeAsignacion()
    console.log("iiiiiiiiiiiiiii",this.tipoPedido);
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


}

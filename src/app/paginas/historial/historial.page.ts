import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  viewFilters=false
  busquedadTerminada=false
  refrescar=false
  sin_resultados=false
  nombresDecliente:string
  //iconos
  cancel='../../../assets/iconos/cross.png'
  finalsizadp='../../../assets/iconos/check-mark.png'

  filtros=[
   {
     filtro:'Finalizado',
     stado:true
   },
  {
    filtro:'Cancelado',
    stado:true
  },

   
    
  ]

  


  pedidos=[]

 /* pedidos=[
    {
      nombreCliente:'romero cliente 1',
      status:'En proceso',
      horaSolicitud: '10:30 am',
      icon: this.lava,
      ser_visto:true
    },

    {
      nombreCliente:'andres cliente 2',
      status:'A lavanderia',
      horaSolicitud: '11:30 am',
      icon: this.moto2,
      ser_visto:true
    },

    {
      nombreCliente:'livia cliente 2',
      status:'Nuevo pedido',
      horaSolicitud: '01:30 pm',
      icon: this.nuevo,
      ser_visto:true
    },

    {
      nombreCliente:'maria cliente 3',
      status:'Cancelado',
      horaSolicitud: '01:30 pm',
      icon: this.cancel,
      ser_visto:true
    },

    {
      nombreCliente:'fabricio cliente 4',
      status:'Entregando',
      horaSolicitud: '01:30 pm',
      icon: this.moto1,
      ser_visto:true
    },
    {
      nombreCliente:'lala cliente 5',
      status:'Recogiendo',
      horaSolicitud: '03:30 pm',
      icon: this.moto0,
      ser_visto:true
    }
  ]*/


  constructor(
    private menu: MenuController,
    private router:Router,
    private socket: Socket,
    private apiService:ApiServiceService
  ) { 

    if(localStorage.getItem('sesion')=='true'){
      this.apiService.status_de_secion=true
    }

    console.log("este id es ",localStorage.getItem('idLavanderia'));
    
    socket.on('lavanderia'+localStorage.getItem('idLavanderia'),(data) => {
      console.log('soket =',data);
      this.pedidos=[]
      this.getPedidosL()
    })

    this.getPedidosL()
    console.log("id lavanderia ",localStorage.getItem('idLavanderia'));
    
  }

  ngOnInit() {
    this.ocultarFiltro()
  }

  


  vewFiltros(){
    if(this.viewFilters==false){
      this.viewFilters=true
      this.mostrarFiltro()
    }else{
      this.viewFilters=false
      this.ocultarFiltro()
    }
  }



  ocultarFiltro(){
    document.getElementById('filtro11').style.transition='0.5s'
    document.getElementById('filtro11').style.marginTop='-200%'
  }

  mostrarFiltro(){
    document.getElementById('filtro11').style.transition='0.5s'
    document.getElementById('filtro11').style.marginTop='0'
  }



  irApedido(pedido){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(pedido)
      }
    };
    //console.log(pedido);
    this.router.navigate(['/pedido'], navigationExtras);
    //this.router.navigate(['/pedido'])
  }


  getPedidosL(){
    if(localStorage.getItem('idLavanderia')!=null){

    this.apiService.getPedidos(localStorage.getItem('idLavanderia')).subscribe(Response=>{
      this.pedidos=[]
      this.busquedadTerminada=false
      //console.log(Response);
      let item={
        nombreCliente:'',
        status:'',
        horaSolicitud: null,
        icon: '',
        id:'',
        direccionCliente:'',
        telefono:'',
        indicaciones:'',
        servicios:null,
        ser_visto:true
      }

      Response.forEach(element => {
        console.log(element);
        this.apiService.getCliente(element.usuario_id).subscribe(Response1=>{
          console.log(Response1 );

          let fecha=JSON.parse(element.fecha_pedido)

          item={
            nombreCliente:Response1.nombres+" "+Response1.apellidos,
            status:element.status,
            horaSolicitud:{hora:this.tConvert(''+fecha.hora+':'+fecha.minutos), minutos:fecha.minutos, dia:fecha.dia, mes:fecha.mes},
            icon: this.getStatusIcon(element.status),
            id:element.id,
            direccionCliente:Response1.direccion,
            telefono:Response1.telefono,
            indicaciones:element.indicaciones,
            servicios:JSON.parse(element.servicios),
            ser_visto:true
          }

          console.log("S",item.status);
         if(item.status=='Finalizado' || item.status=='Cancelado'){
          this.pedidos.push(item)
         }
          
        })


      });
      this.busquedadTerminada=true
    })

  }
  }


  getStatusIcon(status){

    switch (status) {
      
      case 'Finalizado': return this.finalsizadp
        
        break;

        case 'Cancelado': return this.cancel
        
          break;

    
      default:
        break;
    }

  }


  tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }



  verStadosDefiltros(){
    let sinVisualizar=0
    this.pedidos.forEach(element => {
          this.filtros.forEach(element1 => {
                  if(element1.filtro==element.status){
                      if(element1.stado==true){
                        element.ser_visto=true
                      }else{
                        element.ser_visto=false
                        sinVisualizar=sinVisualizar+1
                      }
                  }
          });
    });
    if(sinVisualizar==this.pedidos.length){
      console.log("sin ver");
      this.sin_resultados=true
    }else{
      this.sin_resultados=false
    }
    this.vewFiltros()
  }




}

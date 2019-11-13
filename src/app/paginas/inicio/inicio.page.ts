import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { Socket } from 'ngx-socket-io';
import { ApiServiceService } from '../../api-service.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  viewFilters=false
  busquedadTerminada=false
  refrescar=false
  //iconos
  cancel='../../../assets/iconos/cross.png'
  lava='../../../assets/iconos/washing-machine2.png'
  moto0='../../../assets/iconos/vespa4.png'
  moto1='../../../assets/iconos/vespa3.png'
  moto2='../../../assets/iconos/vespa2.png'
  nuevo='../../../assets/iconos/new-product.png'


  filtros=[
    'filtro 1', 
    'filtro 2', 
    'filtro 3', 
    'filtro 4'
    
  ]

  menuflash=[
    {
      titulo:'Editar información',
      url:'/informacion',
      icon:'../../../assets/iconos/edit.png'
    },
    {
      titulo:'Historial',
      url:'',
      icon:'../../../assets/iconos/clock.png'
    }
  ]


  pedidos=[]

  /*pedidos=[
    {
      nombreCliente:'nombre cliente 1',
      status:'En proceso',
      horaSolicitud: '10:30 am',
      icon: this.lava,
    },

    {
      nombreCliente:'nombre cliente 2',
      status:'A lavanderia',
      horaSolicitud: '11:30 am',
      icon: this.moto2,
    },

    {
      nombreCliente:'nombre cliente 2',
      status:'Nuevo pedido',
      horaSolicitud: '01:30 pm',
      icon: this.nuevo,
    },

    {
      nombreCliente:'nombre cliente 3',
      status:'Cancelado',
      horaSolicitud: '01:30 pm',
      icon: this.cancel,
    },

    {
      nombreCliente:'nombre cliente 4',
      status:'Entregando',
      horaSolicitud: '01:30 pm',
      icon: this.moto1,
    },
    {
      nombreCliente:'nombre cliente 5',
      status:'Recogiendo',
      horaSolicitud: '03:30 pm',
      icon: this.moto0,
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

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeFirst(){
    this.menu.close('first');
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
    document.getElementById('filtro').style.transition='0.5s'
    document.getElementById('filtro').style.marginTop='-100%'
  }

  mostrarFiltro(){
    document.getElementById('filtro').style.transition='0.5s'
    document.getElementById('filtro').style.marginTop='0'
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


  cerrarSesion(){
    this.closeFirst()
    this.apiService.status_de_secion=false
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  getPedidosL(){
    this.apiService.getPedidos(localStorage.getItem('idLavanderia')).subscribe(Response=>{
      this.pedidos=[]
      this.busquedadTerminada=false
      //console.log(Response);
      let item={
        nombreCliente:'nombre cliente 1',
        status:'En proceso',
        horaSolicitud: null,
        icon: this.lava,
        id:'',
        direccionCliente:'',
        telefono:'',
        indicaciones:'',
        servicios:null
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
            servicios:JSON.parse(element.servicios)
          }

          console.log("S",item);
          
          this.pedidos.push(item)
        })


      });
      this.busquedadTerminada=true
    })
  }


  getStatusIcon(status){

    switch (status) {
      case 'En proceso': return this.nuevo
        
      break;

      case 'A lavanderia': return this.moto2
        
        break;

        case 'Cancelado': return this.cancel
        
          break;

          case 'Entregando': return this.moto1
        
            break;
            case 'Recogiendo': return this.moto0
        
              break;
              case 'Nuevo pedido': return this.nuevo
        
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


}

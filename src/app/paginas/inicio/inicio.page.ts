import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  viewFilters=false

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


  pedidos=[
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
  ]


  constructor(
    private menu: MenuController,
    private router:Router,
    private socket: Socket
  ) { 

    socket.on('mensajeServidor',function(data){
      console.log('data=',data);
      
    })

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
}

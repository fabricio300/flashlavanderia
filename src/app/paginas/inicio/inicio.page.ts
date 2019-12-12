import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';

import { Socket } from 'ngx-socket-io';
import { ApiServiceService } from '../../api-service.service';
import { NavController } from '@ionic/angular';
import { NotificaService } from '../../notificaciones/notifica.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements AfterContentInit{
  ngAfterContentInit(): void {
    //this.pedidos=[]
//this.getPedidosL()
  }
  viewFilters=false
  busquedadTerminada=false
  refrescar=false
  sin_resultados=false
  nombresDecliente:string
  //iconos
  cancel='../../../assets/iconos/cross.png'
  lava='../../../assets/iconos/washing-machine2.png'
  moto0='../../../assets/iconos/vespa4.png'
  moto1='../../../assets/iconos/vespa3.png'
  moto2='../../../assets/iconos/vespa2.png'
  nuevo='../../../assets/iconos/new-product.png'
  esperando='../../../assets/iconos/help.png'
  finalsizadp='../../../assets/iconos/check-mark.png'

  filtros=[
    {
      filtro:'Recogiendo',
      stado:true
    },
    {
     filtro:'Entregando',
     stado:true
   },
  /* {
     filtro:'Cancelado',
     stado:true
   },*/
 
   {
     filtro:'Nuevo pedido',
     stado:true
   },
   {
     filtro:'A lavandería',
     stado:true
   },
   {
     filtro:'En proceso',
     stado:true
   }
   ,
   /*{
     filtro:'Finalizado',
     stado:true
   },*/
   {
     filtro:'Lista y limpia',
     stado:true
   }
     
   ]

  menuflash=[
    {
      titulo:'Editar información',
      url:'/registro',
      icon:'../../../assets/iconos/edit.png'
    },
    {
      titulo:'Historial',
      url:'/historial',
      icon:'../../../assets/iconos/clock.png'
    }
  ]


  pedidos=[]

 /*pedidos=[
    {
      nombreCliente:'romero cliente 1',
      status:'En proceso',
      horaSolicitud: '10:30 am',
      icon: this.lava,
      ser_visto:true
    },

    {
      nombreCliente:'andres cliente 2',
      status:'A lavandería',
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
    },
    {
      nombreCliente:'la nte 6',
      status:'Lista y limpia',
      horaSolicitud: '03:30 pm',
      icon: this.esperando,
      ser_visto:true
    },
    {
      nombreCliente:'veto',
      status:'Finalizado',
      horaSolicitud: '03:30 pm',
      icon: this.finalsizadp,
      ser_visto:true
    }
  ]*/


  constructor(
    private menu: MenuController,
    private router:Router,
    private socket: Socket,
    private apiService:ApiServiceService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private notificacion:NotificaService
  ) { 

   

    if(localStorage.getItem('sesion')=='true'){
      this.apiService.status_de_secion=true
      notificacion.suscrivirceAtema()
     // this.getPedidosL()
    }

    console.log("este id es ",localStorage.getItem('idLavanderia'));
    
    socket.on('lavanderia'+localStorage.getItem('idLavanderia'),(data) => {
      console.log('soket =',data);
      this.pedidos=null
      this.pedidos=[]
      this.getPedidosL()
    })


    socket.on('se_actualiso_el_pedido'+'id_lavanderia'+localStorage.getItem('idLavanderia'),(data)=>{
      console.log('soket =',data);
      this.pedidos=null
      this.pedidos=[]
      this.getPedidosL()
    })

  
    
    
    console.log("id lavanderia ",localStorage.getItem('idLavanderia'));
    
  }

  ngOnInit() {
    this.ocultarFiltro()
    
  }

  ionViewWillEnter() {
    this.ocultarFiltro()
    console.log("Hola************************************************************");
    //this.ngOnInit()
      this.pedidos=null
      this.pedidos=[]
      this.getPedidosL()
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


  ir(url){

    this.router.navigate([url])
    this.closeFirst()
  
  }

  ocultarFiltro(){
    document.getElementById('filtro').style.transition='0.5s'
    document.getElementById('filtro').style.marginTop='-200%'
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
    this.router.ngOnDestroy()
    //this.router.navigate(['/pedido'])
  }


  cerrarSesion(){
    this.notificacion.desSuscribirce()
    this.closeFirst()
    this.apiService.status_de_secion=false
    localStorage.clear()
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  getPedidosL(){
    this.pedidos=[]
    if(localStorage.getItem('idLavanderia')!=null){

    this.apiService.getPedidos(localStorage.getItem('idLavanderia')).subscribe(Response=>{
     
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

          console.log("S",item);
            if(item.status!='Finalizado' && item.status!='Cancelado'){
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

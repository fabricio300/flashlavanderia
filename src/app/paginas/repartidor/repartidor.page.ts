import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'; 
import { Socket } from 'ngx-socket-io';
import { NotificaService } from '../../notificaciones/notifica.service';

@Component({
  selector: 'app-repartidor',
  templateUrl: './repartidor.page.html',
  styleUrls: ['./repartidor.page.scss'],
})
export class RepartidorPage implements OnInit {

  reparitidorAnterior=null
  pedido:any
  repartidorActual:any={
    id: null,
    nombre:'Nombre Repartidor',
    tel:'000-000-0000',
    empresa:'Empresa/Independite',
    matricula:'matricula',
    foto:'../../../assets/iconos/flaswash.png'
  }

  actualR: string = './assets/iconos/bikeB.png';
  lat: number = 16.751239;
  lng: number =-93.144676;
  height = 0;
  
  repartidores=[]
  /*repartidores=[
    {
      id: 1,
      nombre:'Antonio gonzales',
      tel:'9614654560',
      empresa:'Kanguros',
      matricula:'345thg',
      foto:'../../../assets/iconos/joker.jpg'
    },
    {
      id: 2,
      nombre:'Hernan Cortez',
      tel:'9614654560',
      empresa:'Independite',
      matricula:'300thg',
      foto:'../../../assets/iconos/joker.jpg'
    },
    
    {
      id: 4,
      nombre:'Miguel Hidalgo',
      tel:'9614010160',
      empresa:'Independite',
      matricula:'400thg',
      foto:'../../../assets/iconos/Scarlett-Johansson-716x550.png'
    }
    ,
    {
      id: 5,
      nombre:'Rosa maria',
      tel:'9614654560',
      empresa:'Rapi',
      matricula:'370thg',
      foto:'../../../assets/iconos/Scarlett-Johansson-716x550.png'
    }
    ,
    {
      id: 6,
      nombre:'Maria Alvarez',
      tel:'9614654560',
      empresa:'Rapi',
      matricula:'370thg',
      foto:'../../../assets/iconos/Scarlett-Johansson-716x550.png'
    }
    
  
  ]*/
  
  constructor(
    private apiservice:ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private socket:Socket,
    private notifica:NotificaService
    ) {
      this.route.queryParams.subscribe(params => {
      

         this.pedido=JSON.parse(params.special)
        console.log("parea", this.pedido);
        this.lat= this.pedido.coordenadas.lat
        this.lng= this.pedido.coordenadas.lon
        
    });
      
  }

  ngOnInit() {
    this.getRepartidores()
  }


  async verRepartidor(id){

    if(this.reparitidorAnterior!=null && this.reparitidorAnterior!=id.id){
        this.repartidores.forEach(element => {
            if(element.id==this.reparitidorAnterior){
              element.icon='./assets/iconos/bikeR.png'
            }
      });
    }

    
    this.repartidorActual=id
    id.icon=this.actualR
    document.getElementById('ima').scrollIntoView(true)

    this.reparitidorAnterior=id.id
    this.height=1
  
  


  }



  getRepartidores(){
    this.apiservice.getRepartidores().subscribe(Response=>{
      //console.log(Response);

      Response.forEach(element => {
        console.log(element);

        let foto:any=JSON.parse(element.foto_perfil)
        //console.log("dodo: ",foto[0].imagen);
        

        let coordenas=JSON.parse(element.coordenadas)

        let re={
          id: element.id,
          nombre:element.nombres,
          apellidos:element.apellidos,
          tel:element.telefono,
          empresa:'Kanguros',
          matricula:element.matricula,        
          foto:foto[0].imagen,
          lat:parseFloat(coordenas.lat),
          lon:parseFloat(coordenas.lon),
          icon:'./assets/iconos/bikeR.png'
        }

        this.repartidores.push(re)
          
          
      });
      console.log(this.repartidores);
    })
  }
  

  asignar(){

    let item={
      repartidor_id:this.repartidorActual.id,
      status:this.pedido.statusPedido
    }
    console.log("item ",item);
    
   this.apiservice.asignarRepartidor(item,this.pedido.id,).subscribe(Response=>{
    localStorage.setItem('esperaRepartidor','si')
    console.log("rcho");
    this.evisarRepartidor()
    this.router.navigate(['/pedido'])
    
   })
  }


  evisarRepartidor(){
    console.log("iiiiifffff",this.repartidorActual.id);
    


    if(""+this.repartidorActual.id!=localStorage.getItem('idRepartidor')){
      this.socket.emit('asignarReaptidor',this.repartidorActual.id)
      console.log("avisadooooooooooooooooooooooooooooo repartidor");
      localStorage.setItem('idRepartidor',this.repartidorActual.id)
      this.notifica.emviarMensaje('Un pedido le ha sido asignado','Tienes una solicitud de pedido','Repartidor'+this.repartidorActual.id)

    }else{
      this.socket.emit('asignarReaptidor',localStorage.getItem('idRepartidor'))
      this.notifica.emviarMensaje('Un pedido fue reasignado','Has sido liberado de un pedido','Repartidor'+localStorage.getItem('idRepartidor'))
      this.socket.emit('asignarReaptidor',this.repartidorActual.id)
      this.notifica.emviarMensaje('Un pedido le ha sido asignado','Tienes una solicitud de pedido','Repartidor'+this.repartidorActual.id)
      localStorage.setItem('idRepartidor',this.repartidorActual.id)
      console.log("avisadooooooooooooooooooooooooooooo repartidor");
      
    }
    
    
  }
}

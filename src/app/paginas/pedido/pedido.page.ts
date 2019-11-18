import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

 
  

  pedido:any
  direccionCliente:any
  horaSolicitud:any
  coordenadas:any

  ver_insert_data=false
  repartidor=null

  constructor(
    private route: ActivatedRoute,
     private router: Router,
     private apiservice:ApiServiceService
  ) { 
    this.route.queryParams.subscribe(params => {
      this.pedido = JSON.parse(params.special);
      this.direccionCliente=JSON.parse( this.pedido.direccionCliente);
      console.log(this.pedido);
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
    if(Response.repartidor_id){
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


}

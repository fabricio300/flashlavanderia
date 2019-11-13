import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  tiempo=120
  precio=50
  editarTiempo=false
  editarPrecion=false
  tiempoE
  precioE
  pedido:any
  direccionCliente:any
  horaSolicitud:any
 

  constructor(
    private route: ActivatedRoute,
     private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      this.pedido = JSON.parse(params.special);
      this.direccionCliente=JSON.parse( this.pedido.direccionCliente);
      console.log(this.pedido);
      this.horaSolicitud=this.pedido.horaSolicitud
      
  });
    
    
  }

  ngOnInit() {
  }


 
  

  editar(opcion){
      if(opcion==1){
        this.editarPrecion=true
        this.precioE=this.precio
      }else{
        this.editarTiempo=true
        this.tiempoE=this.tiempo
      }
  }


  cancelar(opcion){

    if(opcion==1){
      this.editarPrecion=false
      this.precio=this.precioE
    }else{
      this.editarTiempo=false
      this.tiempo=this.tiempoE
     
    }
  }


  
  guardar(opcion){

    if(opcion==1){
      this.editarPrecion=false
      console.log(this.precio);
    }else{
      this.editarTiempo=false
      console.log(this.tiempo);
    }
  }




}

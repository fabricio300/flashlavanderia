import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  anterios='services'
  imagen='../../../assets/iconos/close.png'
  actual='services'

  imagenes=[
    {
      url:'../../../assets/iconos/shutterstock_422824102.jpg',
      guardado:true
    },
    {
      url:'../../../assets/iconos/700x420_lavanderia-autoservicio.jpg',
      guardado:false
    },
    {
      url:'../../../assets/iconos/20180626143642-lavanderia.jpeg',
      guardado:true
    },{
      url:'../../../assets/iconos/exe.jpg',
      guardado:false
    }
  ]


  constructor() { }

  ngOnInit() {
    this.ocultatImagen()
  }



  mostrar(id){
    this.actual=id

    document.getElementById(this.anterios).style.transition='0.5s'
    document.getElementById(this.anterios).style.height="0"
    

    document.getElementById(id).style.transition='0.5s'
    document.getElementById(id).style.height="90%"
    this.anterios=id
    
  }

 ocultatImagen(){
  document.getElementById('granImagen').style.transition='0.5s'
  document.getElementById('granImagen').style.marginLeft="-100%"
 }

 mostrarImagen(imagen){
   this.imagen=imagen
   document.getElementById('granImagen').style.transition='0.5s'
   document.getElementById('granImagen').style.marginLeft="0"
 }











  selecionarImagen(event){
      console.log(event.target.files[0]);
     // this.mostrar('store')
      
      
  }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  opcionActual=1

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
  }



  mostrar(id){
    this.opcionActual=id
  }

 


  selecionarImagen(event){
      console.log(event.target.files[0]);

      
      
  }
}

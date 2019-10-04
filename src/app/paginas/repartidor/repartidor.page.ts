import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-repartidor',
  templateUrl: './repartidor.page.html',
  styleUrls: ['./repartidor.page.scss'],
})
export class RepartidorPage implements OnInit {

  repartidorActual={
    id: null,
    nombre:'Nombre Repartidor',
    tel:'000-000-0000',
    empresa:'Empresa/Independite',
    matricula:'matricula',
    foto:'../../../assets/iconos/flaswash.png'
  }

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  height = 0;

  repartidores=[
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
    
  
  ]
  
  constructor(public platform: Platform) {
    console.log(platform.height());
    this.height = platform.height() - 56;
  }

  ngOnInit() {
  }


  verRepartidor(id){
    this.repartidorActual=id
    document.getElementById('ima').scrollIntoView(true)
  }

}

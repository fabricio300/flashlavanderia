import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {

    this.ocultarParte('part2')

  }


  go(id){
      if(id=='part1'){
        this.ocultarParte('part1')
        this.mostrarPart('part2')
      }else{
        this.ocultarParte('part2')
        this.mostrarPart('part1')
      }
  }


  ocultarParte(id){
    document.getElementById(id).style.transition='0.5s'
    document.getElementById(id).style.height='0px'
  }

  mostrarPart(id){
    document.getElementById(id).style.transition='0.5s'
    document.getElementById(id).style.height='100%'
  }


  cultar(){
    this.ocultarParte('part2')
        this.mostrarPart('part1')
  }

}

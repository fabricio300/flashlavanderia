import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private formInicio : FormGroup


  contraseniaValida='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'
  emailValido='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'

  verAviso=0

  constructor(
    private apiService:ApiServiceService,
    private router:Router,
    private formBuilder: FormBuilder,
    private alertacontroller:AlertController
  ) { 

    this.formInicio=this.formBuilder.group({

      correo:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido)
      ])],

      contrasenia:['', Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])]

     })

   
    
  }

  ionViewWillEnter() {
    if(localStorage.getItem('sesion')=='true'){
      this.apiService.status_de_secion=true
      this.router.navigate(['inicio/'])
      }
  }

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

  irARecuperarPassword(){
    this.router.navigate(['/resetar'])
  }

  async iniciarSesion(){
    let item={
      correo_electronico:this.formInicio.get('correo').value,
      contraseña:this.formInicio.get('contrasenia').value
    }

    this.apiService.login(item).subscribe(Response=>{
      this.apiService.status_de_secion=true
      localStorage.setItem('sesion','true')
      localStorage.setItem('idLavanderia',''+Response[0].id)
      this.router.navigate(['inicio/'])
      this.router.navigate(['inicio/'])
      this.cultar()
      this.formInicio.get('contrasenia').setValue('')
      console.log("user id",Response[0].id);
      
    },error=>{
      this.verAlerta()
    }
    
    )
    
  }


  verInfo(id){
   
    if(this.verAviso==id){
      this.verAviso=0
    }else{
      this.verAviso=id
    }
  }


  async verAlerta(){
    const alerta=await this.alertacontroller.create({
        header:'Error',
        subHeader:'Correo o contraseña incorrectos',
        message:'vuelva a intentar',
        buttons:['Aceptar']

    })

    await alerta.present()
  }
}

import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Injectable({
  providedIn: 'root'
})
export class NotificaService {

  api : string = 'https://fcm.googleapis.com/fcm/send'


  constructor(
    private fcm: FCM, 
    public plt: Platform,
    private http: HttpClient,
    private notifica:LocalNotifications
  ) { 
    
    this.fcm.getToken().then(token => {
      console.log("entra1");
      console.log(token);
    });
 
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
      console.log("entra2");
    });
    
    
    this.fcm.onNotification().subscribe(data => {
      console.log("entro un mensaje");
      
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
        
      } else {
        console.log('Received in foreground');
        this.aletarLocal(data.title,data.body)
      }
    });

    
  }

  aletarLocal(titulo,texto){
    this.notifica.schedule({
      id: 1,
      title: titulo,
      text: texto,
      smallIcon:'res://screen',

       
    }); 
  }
  suscrivirceAtema(){   
    if(localStorage.getItem('idLavanderia')!=null){
       this.fcm.subscribeToTopic('Lavanderia'+localStorage.getItem('idLavanderia'));
        console.log("suscrito a ",localStorage.getItem('idLavanderia'));      
    }
   // this.fcm.unsubscribeFromTopic('')
  }

  desSuscribirce(){
    this.fcm.unsubscribeFromTopic('Lavanderia'+localStorage.getItem('idLavanderia'));
  }


  emviarMensaje(titulo:any,cuerpo:any,detino:any){
    let body={
      "notification":{
        "title":titulo,
        "body":cuerpo,
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"screen"
      },
        "to":"/topics/"+detino,
        "priority":"high",
        "restricted_package_name":""
    }

    console.log("este es ---------",body);
    

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'key=AAAAkpKgWQQ:APA91bGdxd7RZjQJqR8v721pg571VcMvrA2oZ6xKokEP1IyJWCWyKyBhqPowAs8KdaxAu01JoL_Gods8WlwgOA_UTL1XEjkcn6-18yApRvnjtFUYSiAdwc1ZMo1W6nP9901k9Emrcmi5'
      })
    }

   this.http.post(this.api,body,httpOptions).subscribe(Response=>{
     console.log("enviado");
     
   })
  }
}

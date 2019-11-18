import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class NotificaService {

  constructor(
    private fcm: FCM, 
    public plt: Platform,
    
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
      }
    });


  }


  suscrivirceAtema(){   
    if(localStorage.getItem('idLavanderia')!=null){
       this.fcm.subscribeToTopic('Lavanderia'+localStorage.getItem('idLavanderia'));
        console.log("suscrito a ",localStorage.getItem('idLavanderia'));      
    }
    
  }
}

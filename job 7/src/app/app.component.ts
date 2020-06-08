import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';
declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(private platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, private databaseProvider: DatabaseProvider) {
    this.initialieApp();
    platform.ready().then(() => {
      this.databaseProvider.createDatabase();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      FCMPlugin.onTokenRefresh(function(token) {
        //alert(token);
      });
      FCMPlugin.getToken(function(token)
       {
         //alert(token);
      });
      //subscripe topic, aplikasi akan menerima notif berdasarkan topik//yang dikirim.//bagian ini bisa kita isi dengan email setiap user agar server //dapat mengirim notifpada user tertentu
      FCMPlugin.subscribeToTopic('promosi');
      FCMPlugin.onNotification(function(data) {
        if(data.wasTapped) {
          alert(JSON.stringify(data));
        } else{
          alert(JSON.stringify(data));
        }
      });
      FCMPlugin.createNotificationChannelAndroid({
        id:"urgent_alert",
        // required
        name:"Urgent Alert",
        // required
        description:"Very urgent message alert",
        importance:"high",// 
        isibility:"public",
        sound:"alert_sound",
        lights:true,
        vibration:true
      });
    });
  }

  initialieApp(){
    this.statusBar.overlaysWebView(true);
    if(this.platform.is('android')){
      this.statusBar.backgroundColorByHexString("#33000000");
    }
  }
}


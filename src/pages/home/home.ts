import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationRoomPage } from '../authentication-room/authentication-room';
// import { TabsPage } from '../tabs/tabs';
import { AccountPage } from '../account/account';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  RSSParser;
  targetUrl: string;
  entries: Array<any> = [];

  constructor(public navCtrl: NavController, private authFirebase: AngularFireAuth,
    private app: App, private iaBrowser: InAppBrowser) {

  }

  logOut() {
    this.authFirebase.auth.signOut().then(() => {
      this.app.getRootNav().setRoot(AuthenticationRoomPage);
      console.log("salio");
    });
  }

  goAccount() {
    this.navCtrl.push(AccountPage);
  }
}


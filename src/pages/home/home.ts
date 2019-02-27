import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationRoomPage } from '../authentication-room/authentication-room';
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authFirebase: AngularFireAuth,
    private app: App) { }

  logOut() {
    this.authFirebase.auth.signOut().then(() => {
      this.app.getRootNav().setRoot(AuthenticationRoomPage);
    });
  }

  goAccount() {
    this.navCtrl.push(AccountPage);
  }
}


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationRoomPage } from '../authentication-room/authentication-room';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authFirebase: AngularFireAuth) {

  }

  // logOut() {
  //   try {

  //     this.authFirebase.auth.signOut().then(() => {
  //       this.navCtrl.setRoot(AuthenticationRoomPage);
  //     });
  //   } catch (error) {

  //   }

  // }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the AuthenticationRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-authentication-room',
  templateUrl: 'authentication-room.html',
})
export class AuthenticationRoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}

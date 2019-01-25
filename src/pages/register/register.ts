import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth'
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  check = { "email": "", "password": "" };
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fireAuth: AngularFireAuth, private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Some of the data is wrong, please check the data',
      buttons: ['OK']
    });
    alert.present();
  }

  async registerUser(myForm: { email: string, password: string }) {
    try {
      var user = this.fireAuth.auth.currentUser;
      const res = await this.fireAuth.auth.createUserWithEmailAndPassword(myForm.email, myForm.password);
      if (user) {
        this.fireAuth.authState.subscribe(info => {
          this.toastCtrl.create({
            message: `Welcome ${info.email}`,
            duration: 3000
          }).present();
          this.navCtrl.setRoot(TabsPage);
        });
      } else {
        console.log("salio mal wuey");
      }
      this.navCtrl.setRoot(TabsPage);
      console.log(res);
    } catch (error) {
      this.presentAlert();
      console.log(error);
    }
  }
}

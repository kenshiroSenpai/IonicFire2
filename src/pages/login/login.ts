import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  check = { "email": "", "password": "" };
  myForm: FormGroup;
  entry: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fireAuth: AngularFireAuth, private alertCtrl: AlertController,
    private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    });
  }

  async login(myForm: { email: string, password: string }) {
    let loading = this.loadingCtrl.create({
      content: "Loading..."
    });
    loading.present();
    try {
      const res = await this.fireAuth.auth.signInWithEmailAndPassword(myForm.email, myForm.password);
      if (res) {
        loading.dismiss();
        this.toastCtrl.create({
          message: `Welcome ` + myForm.email.toLocaleLowerCase(),
          duration: 3000
        }).present();
        this.navCtrl.setRoot(TabsPage);
      }
    } catch (error) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Some of the data is wrong, please check the data',
        buttons: [
          {
            text: "OK",
            handler: () =>{
              loading.dismiss();
            }
          }
        ]
      });
      alert.present();
    }
  }
}

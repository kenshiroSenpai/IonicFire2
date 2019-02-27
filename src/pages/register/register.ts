import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth'
import { RegisterDatasPage } from '../register-datas/register-datas';
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
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    });
  }

  alert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Some of the data is wrong, please check the data',
      buttons: [
        {
          text: "OK"
        }
      ]
    });
    alert.present();
  }

  async registerUser(myForm: { email: string, password: string }) {
    let loading = this.loadingCtrl.create({
      content: "Loading..."
    });
    loading.present();
    try {
      const res = await this.fireAuth.auth.signInWithEmailAndPassword(myForm.email, myForm.password);
      if (res) {
        loading.dismiss();
        this.navCtrl.setRoot(RegisterDatasPage);
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

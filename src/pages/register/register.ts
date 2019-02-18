import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
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
    private fireAuth: AngularFireAuth, private alertCtrl: AlertController) { }

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
      const res = await this.fireAuth.auth.createUserWithEmailAndPassword(myForm.email, myForm.password);
      if (res) {
        this.navCtrl.setRoot(RegisterDatasPage);
      } else {
        console.log("salio mal wuey");
      }
    } catch (error) {
      console.log(error);
      this.presentAlert();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  refForm: AngularFireList<any>;
  form: Observable<any>;
  myForm: any;


  check = { "name": "", "lastName": "", "age": "", "country": "", "points": "", "email": "" };
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController ) {
    this.refForm = this.database.list('form');
    this.form = this.refForm.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  // Validator of age.
  static isValid(control: FormControl): any {
    if (control.value < 18) {
      return { "NotEnough": true }
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])),
      age: new FormControl('', Validators.compose([Validators.required, AboutPage.isValid])),
      points: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),
    });
  }

  fillSurvey(myForm: { name: string, lastName: string, age: number, country: string, points: string, email: string }) {
    this.refForm.push({
      name: myForm.name,
      lastName: myForm.lastName,
      age: myForm.age,
      country: myForm.country,
      points: myForm.points,
      email: myForm.email
    });
  }

async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Your datas have been saved, Thank you!',
    duration: 2000
  });
  toast.present();
  this.navCtrl.pop();
}

}

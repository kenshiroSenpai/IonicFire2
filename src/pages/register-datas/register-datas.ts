import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterDatasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register-datas',
  templateUrl: 'register-datas.html',
})
export class RegisterDatasPage implements OnInit {
  selectedPhoto;
  photo;
  images: any = [];
  isDownload = false;
  refUser: AngularFireList<any>;
  users: Observable<any>;
  myFormUser: any;
  theUser = this.afAuth.auth.currentUser;
  check = { "username": "", "describe": "", "country": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDatabase: AngularFireDatabase, public afStorage: AngularFireStorage,
    public afAuth: AngularFireAuth, public toastCtrl: ToastController,
    public camera: Camera, public loadingCtrl: LoadingController,
    private imagePicker: ImagePicker) {

    this.refUser = this.afDatabase.list(`datas/${this.theUser.uid}`);
    this.users = this.refUser.snapshotChanges().map(changes => {
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
    this.myFormUser = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])),
      describe: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])),
      // age: new FormControl('', Validators.compose([Validators.required, AccountPage.isValid])),
      // points: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      // email: new FormControl('', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),
    });
  }

  sendDatas(myFormUser: { username: string, describe: string, country: string }) {
    console.log("variable con url database: " + this.photo);
    this.isDownload = false;
    this.refUser.push({
      username: myFormUser.username,
      describe: myFormUser.describe,
      country: myFormUser.country,
      photo: this.photo
    });
  }

  presentToastSuccessfully(myFormUser: { username: string, describe: string, country: string }) {
    this.toastCtrl.create({
      message: 'Welcome ' + myFormUser.username,
      duration: 2000
    }).present();
    this.navCtrl.setRoot(TabsPage);
  }

  grabPicture() {

    const options: CameraOptions = {
      quality: 100,
      targetHeight: 300,
      targetWidth: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imageData => {
      let loading = this.loadingCtrl.create({
        content: "Loading..."
      });
      loading.present();
      this.selectedPhoto = this.dataURItoBlob(`data:image/jpeg;base64,` + imageData);
      let currentImage = this.afStorage.storage.ref('images').child(`${this.theUser.uid}/profileImage.jpeg`).put(this.selectedPhoto);
      currentImage.on('state_changed', function () {
        let subida = (currentImage.snapshot.bytesTransferred / currentImage.snapshot.totalBytes) * 100;
        if (subida == 100) {
          loading.dismiss();
        }
      }, function (error) {
      }, () => {
        console.log("entro en la url");
        currentImage.snapshot.ref.getDownloadURL().then(url => {
          console.log("url sin variable: " + url);
          this.photo = url;
          console.log("url en variable: " + this.photo);
          this.isDownload = true;
        });
      });



    }, (error) => {
      console.log('error', error);
    });

  }

  // choosePicture() {
  //   const options = {
  //     maximumImagesCount: 1,
  //     width: 500,
  //     outputType: 1
  //   };
  //   this.imagePicker.getPictures(options).then((results) => {
  //     // let loading = this.loadingCtrl.create({
  //     //   content: "Loading..."
  //     // });
  //     // loading.present();
  //     for (var i = 0; i < results.length; i++) {
  //       this.selectedPhoto = this.dataURItoBlob(`data:image/jpeg;base64,` + results[i]);
  //     }
      
  //     let currentImage = this.afStorage.storage.ref('images').child(`${this.theUser.uid}/profileImage.jpeg`).put(this.selectedPhoto);
  //     currentImage.on('state_changed', function () {
  //       let subida = (currentImage.snapshot.bytesTransferred / currentImage.snapshot.totalBytes) * 100;
  //       // if (subida == 100) {
  //       //   loading.dismiss();
  //       // }
  //     }, function (error) {
  //     }, () => {
  //       console.log("entro en la url");
  //       currentImage.snapshot.ref.getDownloadURL().then(url => {
  //         console.log("url sin variable: " + url);
  //         this.photo = url;
  //         console.log("url en variable: " + this.photo);
  //         this.isDownload = true;
  //       });
  //     });
  //   }, (error) => {
  //     console.log('error', error);
  //   });
  // }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };
}



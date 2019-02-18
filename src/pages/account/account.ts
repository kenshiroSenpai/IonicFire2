import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController, App } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AuthenticationRoomPage } from '../authentication-room/authentication-room';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {

  refUser: AngularFireList<any>;
  datas: Observable<any>;
  photo;
  selectedPhoto;
  myFormUser: any;
  theUser = this.afAuth.auth.currentUser;
  check = { "username": "", "describe": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDatabase: AngularFireDatabase, public afStorage: AngularFireStorage,
    public afAuth: AngularFireAuth, public toastCtrl: ToastController,
    private alertCtrl: AlertController, private camera: Camera,
    private loadingCtrl: LoadingController, private app: App) {

    this.refUser = this.afDatabase.list(`datas/${this.theUser.uid}`);
    this.datas = this.refUser.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
    let load = this.loadingCtrl.create({
      content: "Loading...",
      dismissOnPageChange: true
    });
    load.present();
  }

  modifyUser(newDatas) {
    this.alertCtrl.create({
      title: `Modify username`,
      message: 'Write the new username',
      inputs: [
        {
          name: 'value',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            if (data.value === "") {
              return false;
            } else {
              this.refUser.update(newDatas.key, {
                username: data.value
              });
              this.presentToastSuccessfully();
            }
          }
        }
      ]
    }).present();
  }

  modifyDescribe(newDatas) {
    this.alertCtrl.create({
      title: `Modify describe`,
      message: 'Write the new describe',
      inputs: [
        {
          name: 'value',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            if (data.value === "") {
              return false;
            } else {
              this.refUser.update(newDatas.key, {
                describe: data.value
              });
              this.presentToastSuccessfully();
            }
          }
        }
      ]
    }).present();
  }

  modifyCountry(newDatas) {
    this.alertCtrl.create({
      title: `Modify country`,
      inputs: [
        {
          name: 'Spain',
          type: 'radio',
          label: 'Spain',
          value: 'Spain'
        },
        {
          name: 'Italy',
          type: 'radio',
          label: 'Italy',
          value: 'Italy'
        },
        {
          name: 'Germany',
          type: 'radio',
          label: 'Germany',
          value: 'Germany'
        },
        {
          name: 'France',
          type: 'radio',
          label: 'France',
          value: 'France'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data: string) => {
            if (data === "") {
              return false;
            } else {
              this.refUser.update(newDatas.key, {
                country: data
              });
              this.presentToastSuccessfully();
            }
          }
        }
      ]
    }).present();
  }

  updatePicture(newData) {
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
      let currentImage = this.afStorage.storage.ref(`images/${this.theUser.uid}`).child(`profileImage.jpeg`).put(this.selectedPhoto);
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
          this.refUser.update(newData.key, {
            // username: newData.username,
            // describe: newData.describe,
            // country: newData.country,
            photo: url
          });
          console.log("url en variable: " + this.photo);
          this.presentToastSuccessfully();
        });
      });
    }, (error) => {
      console.log('error', error);
    });

  }

  // newPicture(newData) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     targetHeight: 300,
  //     targetWidth: 300,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     correctOrientation: true
  //   };

  //   this.camera.getPicture(options).then(imageData => {
  //     let loading = this.loadingCtrl.create({
  //       content: "Loading..."
  //     });
  //     loading.present();
  //     this.selectedPhoto = this.dataURItoBlob(`data:image/jpeg;base64,` + imageData);
  //     let currentImage = this.afStorage.storage.ref(`images/${this.theUser.uid}`).child(`profileImage.jpeg`).put(this.selectedPhoto);
  //     currentImage.on('state_changed', function () {
  //       let subida = (currentImage.snapshot.bytesTransferred / currentImage.snapshot.totalBytes) * 100;
  //       if (subida == 100) {
  //         loading.dismiss();
  //       }

  //     }, function (error) {

  //     }, () => {
  //       console.log("entro en la url");
  //       currentImage.snapshot.ref.getDownloadURL().then(url => {
  //         console.log("url sin variable: " + url);
  //         this.refUser.update(newData.key, {
  //           // username: newData.username,
  //           // describe: newData.describe,
  //           // country: newData.country,
  //           photo: url
  //         });
  //         console.log("url en variable: " + this.photo);
  //         this.presentToastSuccessfully();
  //       });
  //     });
  //   }, (error) => {
  //     console.log('error', error);
  //   });

  // }

  deletePicture(newData) {
    this.alertCtrl.create({
      title: "Do you want to delete your photo?",
      message: "If you delete the photo, you need put a new photo",
      buttons: [
        {
          text: "YES",
          handler: () => {
            this.refUser.update(newData.key, {
              photo: ""
            });
            this.afStorage.storage.refFromURL(`gs://lista-48220.appspot.com`).child(`images/${this.theUser.uid}/profileImage.jpeg`).delete();
            this.updatePicture(newData);
          }
        },
        {
          text: "NO"
        }
      ]
    }).present();

  }

  deleteProfile(newData) {
    console.log("entro");
    this.alertCtrl.create({
      title: 'Do you want to remove your account?',
      message: "You can't return your account If you remove it.",
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.afStorage.storage.refFromURL(`gs://lista-48220.appspot.com`).child(`images/${this.theUser.uid}/profileImage.jpeg`).delete();
            this.refUser.remove(newData.key);
            this.afAuth.auth.currentUser.delete();
            let toastDelete = this.toastCtrl.create({
              message: 'Your datas have been removed!',
              duration: 2000
            });
            toastDelete.present();
            this.app.getRootNav().setRoot(AuthenticationRoomPage);
          }
        },
        {
          text: 'NO'
        }
      ]
    }).present();
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };


  async presentToastSuccessfully() {
    const toast = await this.toastCtrl.create({
      message: 'Your datas have been saved, Thank you!',
      duration: 2000
    });
    toast.present();
  }

}

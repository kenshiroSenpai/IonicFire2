import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
/**
 * Generated class for the AdministratorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//Esta pagina es los PRODUCTOS Administrador.
@Component({
  selector: 'page-administrator',
  templateUrl: 'administrator.html',
})
export class AdministratorPage implements OnInit {

  refList: AngularFireList<any>;
  lists: Observable<any>;
  isCreated = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth,
    public alertCtrl: AlertController) {
    this.refList = this.afDatabase.list(`form`);
    this.lists = this.refList.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  ngOnInit() { }

  createNote(item) {
    this.alertCtrl.create({
      title: 'add note:',
      message: 'Write a note about this survey.',
      inputs: [
        {
          name: 'note',
          placeholder: 'add note here!',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.refList.set(item.key, {
              name: item.name,
              lastName: item.lastName,
              age: item.age,
              country: item.country,
              points: item.points,
              email: item.email,
              user: item.user,
              note: data.note
            });
          }
        }
      ]
    }).present();
  }

  // controllerButton() {
  //   let btnNote = document.getElementById("addButton");
  //   btnNote.style.display = "none";
  // }

  updateNote(item) {
    this.alertCtrl.create({
      title: 'Change the note:',
      message: 'You can modify the note current.',
      inputs: [
        {
          name: 'note',
          placeholder: 'add note here!',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.refList.update(item.key, {
              note: data.note
            })
          }
        }
      ]
    }).present();
  }

  removeItem(item) {
    this.refList.remove(item.key);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})

export class ListPage implements OnInit {

  refList: AngularFireList<any>;
  lists: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public database: AngularFireDatabase,
    public loadingController: LoadingController) {
    this.refList = this.database.list('lists');
    this.lists = this.refList.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
    const loading =  this.loadingController.create({
      content: "Loading...",
      dismissOnPageChange: true

    });
    return loading.present();
  }

  showMessageCreateList() {
    this.alertCtrl.create({
      title: 'Crear nueva lista',
      message: 'Escribe como quiere llamar a la lista.',
      inputs: [
        {
          name: 'list',
          placeholder: 'NewList',
          type: 'text'
        },
        {
          name: 'number',
          placeholder: 'Insert quantity',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            if (data.number === "" || data.list === "" || data.number <= 0) {
              return false;
            } else {
              this.refList.push({
                title: data.list,
                number: data.number,
                done: false
              });
            }
          }
        }
      ]
    }).present();
  }

  updateList(newList) {
    this.refList.update(newList.key, {
      title: newList.title,
      number: newList.number,
      done: !newList.done
    });
  }

  removeList(newList) {
    this.refList.remove(newList.key);
  }

}
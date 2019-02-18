import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { EnterTaskPage } from '../enter-task/enter-task';
/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage implements OnInit {
  newTask: string;
  refTask: AngularFireList<any>;
  datas: Observable<any>;
  user = this.afAuth.auth.currentUser;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDatabase: AngularFireDatabase, public afStorage: AngularFireStorage,
    public afAuth: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.refTask = this.afDatabase.list(`task/${this.user.uid}`);
    this.datas = this.refTask.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  createMountain() {
    this.alertCtrl.create({
      title: "Create task list",
      message: "Write a name:",
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: 'Name of the task'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.newTask = data.value;
            console.log("entro");
            if (data.value === "") {
              return false;
            } else {
              this.refTask.set(data.value, {
                task1: "",
                task2: ""
              });
            }
          }
        }
      ]
    }).present();
  }

  enterTask() {
    this.navCtrl.push(EnterTaskPage, {
      task: this.newTask
    })
  }

}

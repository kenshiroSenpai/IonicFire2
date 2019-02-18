import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage} from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * Generated class for the EnterTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-enter-task',
  templateUrl: 'enter-task.html',
})
export class EnterTaskPage implements OnInit {
  task: string;
  refList: AngularFireList<any>;
  datas: Observable<any>;
  user = this.afAuth.auth.currentUser;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public afDatabase: AngularFireDatabase, public afStorage: AngularFireStorage,
    public afAuth: AngularFireAuth, private alertCtrl: AlertController,) {
      this.task = navParams.get('task');

      this.refList = this.afDatabase.list(`task/${this.user.uid}/${this.task}`);
      this.datas = this.refList.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

  }

  ngOnInit() {
    console.log(this.refList);
    
    
  }

  createTask(){
    this.alertCtrl.create({
      title: "modify a task",
      inputs:[
        {
          name: "value",
          type: "text",
          placeholder: "new task"
        }
      ],
      buttons: [ 
        {
          text: "confirm",
          handler: data =>{
            this.refList.push({
              tasks: data.value
            });
          }
        }
      ]
    }).present();
  }

  updateTask(newData){
    this.alertCtrl.create({
      title: "modify a task",
      inputs:[
        {
          name: "value",
          type: "text",
          placeholder: "new task"
        }
      ],
      buttons: [ 
        {
          text: "confirm",
          handler: data =>{
            this.refList.update(newData.key,{
              tasks: data.value
            });
          }
        },
        {
          text: "Cancel"
        }
      ]
    }).present();
  }

  deleteTask(newData){
    this.alertCtrl.create({
      title: "Do you want delete this task?",
      buttons: [
        {
          text: "Yes, please",
          handler: () => {
            this.refList.remove(newData.key);
          }
        },
        {
          text: "NO!"
        }
      ]
    }).present();
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AboutPage } from '../about/about';
import { AdministratorPage} from '../administrator/administrator';
/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage implements OnInit{

  htmlElements: HTMLElement;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth) {
  }

ngOnInit(){
  this.checkUser();
}

  goToAbout(){
    this.navCtrl.push(AboutPage);
  }

  checkUser(){
    let user = this.afAuth.auth.currentUser;
    var btnAdmin = document.getElementById("btnAmdin");
    if(user.email === "root@gmail.com"){
      btnAdmin.style.display = "block";
    }else{
      btnAdmin.style.display = "none";
    }
  }

  goToAboutAdmin(){
    this.navCtrl.push(AdministratorPage);  
  }

}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/products/products';
import { InfoPage } from '../pages/info/info';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthenticationRoomPage } from '../pages/authentication-room/authentication-room';
import { AccountPage } from '../pages/account/account';
import{ RegisterDatasPage } from '../pages/register-datas/register-datas';
import { AdministratorPage } from '../pages/administrator/administrator';
import { EnterTaskPage } from '../pages/enter-task/enter-task';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';

export const config = {
  apiKey: "AIzaSyBu6JqQtf5IJdRSxJha234WWvJm5vsM3xE",
  authDomain: "lista-48220.firebaseapp.com",
  databaseURL: "https://lista-48220.firebaseio.com",
  projectId: "lista-48220",
  storageBucket: "lista-48220.appspot.com",
  messagingSenderId: "637335624040"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ListPage,
    ProductsPage,
    InfoPage,
    LoginPage,
    RegisterPage,
    AuthenticationRoomPage,
    AccountPage,
    RegisterDatasPage,
    AdministratorPage,
    EnterTaskPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ListPage,
    ProductsPage,
    InfoPage,
    LoginPage,
    RegisterPage,
    AuthenticationRoomPage,
    AccountPage,
    RegisterDatasPage,
    AdministratorPage,
    EnterTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    LoadingController,
    Camera,
    ImagePicker
  ]
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'; 

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/products/products';
import { InfoPage } from '../pages/info/info';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthenticationRoomPage } from '../pages/authentication-room/authentication-room';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const config = {
  apiKey: "AIzaSyDw3-1eAH_r0NUH4W_IzjArXJYKnUtwq5A",
  authDomain: "mercado-63b66.firebaseapp.com",
  databaseURL: "https://mercado-63b66.firebaseio.com",
  projectId: "mercado-63b66",
  storageBucket: "mercado-63b66.appspot.com",
  messagingSenderId: "834981011403"
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
    AuthenticationRoomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
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
    AuthenticationRoomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth
  ]
})
export class AppModule {}

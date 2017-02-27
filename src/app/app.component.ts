import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = TabsPage;
  public adFabAgency: Array<any> = [];

  constructor(
    platform: Platform,
    private _http: Http
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  ngOnInit() { }
}

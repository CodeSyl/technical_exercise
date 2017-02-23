import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {

  public data: any = [];

  constructor(
    public navCtrl: NavController,
    private _http: Http
  ) {
  }
  ngOnInit() {
    this._http.get("https://careers.adfab.fr/api/pointofinterests.json")
      .subscribe(data => {
        this.data = data.json()["hydra:member"];
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }

}

import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { DataService } from '../../providers/agency-service';

@Component({
  selector: 'page-home',
  templateUrl: 'list.html'
})

export class ListPage implements OnInit {

  public agencies: any = [];
  public deniedGeolocalisation: boolean = true;

  constructor(
    public navCtrl: NavController,
    private _http: Http,
    public _dataService: DataService,
    public _loadingCtrl: LoadingController
  ) {
    this.deniedGeolocalisation = true;
  }

  ngOnInit() {
    let loading = this._loadingCtrl.create({
      spinner: 'dots',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
          <p>Localisation en cours</p>
        </div>
      </div>`
    });

    loading.present();

    this._dataService.orderAgenciesByLocation(this._dataService.getAgencies(), this._dataService.getLocation())
      .then(agencies => {
        loading.dismiss();
        this.agencies = agencies;
      })
  }
}

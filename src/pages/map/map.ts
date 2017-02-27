import { NavController, LoadingController } from 'ionic-angular';
import { DataService } from '../../providers/agency-service';
import { Component, OnInit } from '@angular/core';
import { TOKEN } from '../../app/app.constant';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import * as _ from 'lodash';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public _dataService: DataService,
    public _loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
    const latitude = this._dataService.location[0].latitude;
    const longitude = this._dataService.location[0].longitude;
    this.createMap(longitude, latitude, TOKEN);
  }

  // Generate Map with mapboxgl

  createMap(longitude: number, latitude: number, ACCESSTOKEN: string) {
    mapboxgl.accessToken = ACCESSTOKEN;
    // Init Map
    const myMap = new mapboxgl.Map({
      container: 'leaflet-map-component',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [longitude, latitude],
      zoom: 11
    });
    // Link Marker to Map
    this.addMarker(myMap, latitude, longitude, 100, 100, 'none', 'icon icon-md ion-md-locate location');
    _.forEach(this._dataService.agencyData, (agency) => {
      this.addMarker(myMap, agency.latitude, agency.longitude, 100, 100, `url(${agency.image})`, agency.summary)
    })
  }

  // Generate Markers with agency's JSON object.

  addMarker(myMap: any, latitude: number, longitude: number, width: number, height: number, image?: string, location?: string, description?: string) {
    let item = document.createElement('ion-item');
    let icon = document.createElement('ion-icon');

    item.className = 'marker';
    item.style.width = `${width}px`;
    item.style.height = `${height}px`;
    item.style.backgroundImage = image;

    icon.className = location;
    icon.setAttribute('name', 'locate');
    item.appendChild(icon);

    // const popup = new mapboxgl.Popup({ offset: width })
    //   .setText(`test new popup`);

    new mapboxgl.Marker(item, { offset: [- width / 2, - height / 2] })
      .setLngLat([longitude, latitude])
      // .setPopup(popup)
      .addTo(myMap);

  }
}


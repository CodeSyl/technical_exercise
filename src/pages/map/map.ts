import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController) {

  }

}

import { Http } from '@angular/http';
import { Geolocation } from 'ionic-native';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

/**
 * @api {get} https://careers.adfab.fr/api/pointofinterests.json
 * @apiDescription AdFab agencies with sone informations (img, summary, location)
 *
 * Get current location with Geolocation from ionic-native
 *
 * Create a new agencies JSON object with the distance between current location and agency's location for each one
**/

@Injectable()
export class DataService {

    public location: any = [];
    public agencyData: Array<any> = [];

    constructor(
        public _http?: Http) {
    }

    // Http service 

    public get() {
        return this._http.get("https://careers.adfab.fr/api/pointofinterests.json");
    }

    // Return agency data 

    public getAgencies() {
        return this.get()
            .toPromise()
            .then(response => {
                return response.json()["hydra:member"]
            })
    }

    // Get current location

    public getLocation() {
        return Geolocation.getCurrentPosition();
    }

    // Get data since api adfab and generate a new object with disance beetween current location and agency's location

    public orderAgenciesByLocation(agencies, location?) {
        return Promise.all([agencies, location]).then(value => {
            let docker = [];
            this.location.push(value[1].coords);
            _.forEach(value[0], (agency) => {
                agency.distance = this.distance(agency.latitude, agency.longitude, this.location[0].latitude, this.location[0].longitude, 'K');
                docker.push(agency);
            })
            this.agencyData = _.orderBy(docker, 'distance', 'asc');
            return this.agencyData;
        })
    }

    // Calculate the distance between 2 Geographical coordinates

    distance(lat1?: number, lon1?: number, lat2?: number, lon2?: number, unit?: string) {
        const radlat1 = Math.PI * lat1 / 180
        const radlat2 = Math.PI * lat2 / 180
        const theta = lon1 - lon2
        const radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return Math.round(dist);
    }
}
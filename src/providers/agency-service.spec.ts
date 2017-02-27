import { DataService } from './agency-service';
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { URL } from '../app/app.constant'
import { MockAgencies } from '../app/agencies.data.mock'

import * as _ from 'lodash';

describe('html and order agencies by location', () => {

    let dataService: DataService;
    beforeEach(() => {
        dataService = new DataService();
        TestBed.configureTestingModule({
            providers: [
                DataService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                },
            ]
        });
    });

    it('should use an Http call to obtain a quote', inject([DataService, MockBackend], (service: DataService, backend: MockBackend) => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(URL);

        });
        service.get();
    }));

    it('agencies should be order by location', (done) => {
        let distanceCurrentLocation: number;
        let promiseAgencies = new Promise((resolve, reject) => { resolve(MockAgencies) });

        dataService.orderAgenciesByLocation(promiseAgencies, dataService.getLocation())
            .then(agency => {
                let currentLatitude = dataService.location[0].latitude;
                let currentLongitude = dataService.location[0].longitude;
                distanceCurrentLocation = dataService.distance(agency[0].latitude, agency[0].longitude, currentLatitude, currentLongitude, 'K');
                expect(agency[0].distance).toBeLessThanOrEqual(distanceCurrentLocation);
                done();
            })
    });

})



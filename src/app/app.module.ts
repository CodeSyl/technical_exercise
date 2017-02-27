import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../providers/agency-service';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ListPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ListPage,
    TabsPage
  ],
  providers: [DataService, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }

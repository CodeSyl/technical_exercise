import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ListPage;
  tab2Root: any = MapPage;

  constructor() {

  }
}

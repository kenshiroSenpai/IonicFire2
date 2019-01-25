import { Component } from '@angular/core';

import { ProductsPage } from '../products/products';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { InfoPage } from '../info/info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = InfoPage;
  tab3Root = ProductsPage;
  tab4Root = ListPage;
  

  constructor() {

  }
}

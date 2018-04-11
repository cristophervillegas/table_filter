import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TableGridComponent } from './table-grid/table-grid.component';

import {TableModule} from 'primeng/table';
import { CarService } from './table-grid/car.service';


import { FilterTableComponent } from './filter-table/filter-table.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './table-grid/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TableGridComponent,
    FilterTableComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 500 }
    )
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

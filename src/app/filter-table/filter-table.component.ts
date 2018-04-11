import { Component, OnInit } from '@angular/core';
import { CarService } from '../table-grid/car.service';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {

  constructor(private dataService: CarService) { }

  ngOnInit() {
  }
  updateFilter(texto) {
    this.dataService.filterData(texto).subscribe(
      data => console.log('Datos filtered: ' + JSON.stringify(data))
    );
  }

}

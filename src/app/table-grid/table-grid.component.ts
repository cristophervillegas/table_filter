import { Component, OnInit } from '@angular/core';
import { CarService, Car } from './car.service';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit {
  cars: Car[];
  cols: any[];
  constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsFilter().subscribe(
            cars => {
                console.log('datos obtenidos');
                console.log(cars);
                this.cars = cars;
            }
        );

        this.cols = [
            { field: 'vin', header: 'Vin' },
            {field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.loadData();
    }

    loadData() {
        this.carService.getCars();
      }

}

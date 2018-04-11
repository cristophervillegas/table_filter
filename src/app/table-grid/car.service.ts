import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

export interface Car {
    vin;
    year;
    brand;
    color;
  }

@Injectable()
export class CarService {
  data;
  filteredData;
  private cars = new Subject<any[]>();
  private carsUrl = 'api/cars';
    constructor(private http: HttpClient) {
     }

    filterData(term): Observable<any> {
      let val;
      if (term) {
        val = term.target.value;
      }
      console.log('Termino: ' + val);
      if (!val || val.length === 0) {
        console.log('datos completos');
        return this.getCars();
      }
      const data = this.http.get<any[]>(`api/cars/?brand=${val}`)
              .pipe(
                  map(dataF => {
                    const dataFiltered = this.extractData(dataF);
                    console.log('data filt' + JSON.stringify(dataFiltered));
                    this.setCarsFilter(dataFiltered);
                  }),
                  tap(_ => console.log(`No se encontro coincidencia con: "${val}"`)),
                  catchError(this.handleError('filterData', []))
              );
      return data;
    }
    refreshData(data) {
      console.log('Asignando data temporal (para busqueda)');
          this.data = [...data];
          console.log(this.data);
          this.setCarsFilter(data);
    }
    // filterData2(event) {
    //   const val = event.target.value.toLowerCase();
    //   if (val && val.length > 0) {
    //     const filteredData = this.data.filter(function(d) {
    //       return d.brand.toLowerCase().indexOf(val) !== -1 || !val;
    //     });
    //     this.setCarsFilter(filteredData);
    //   } else {
    //     console.log('Restaurando data original');
    //     console.log(this.data);
    //     this.setCarsFilter(this.data);
    //   }
    // }

    // asigna los datos filtrados
    setCarsFilter(cars: any) {

      this.cars.next(cars);
    }
    // // retorna los datos filtrados
    getCarsFilter(): Observable<any[]> {
        return this.cars.asObservable();

    }

    getCars(): Observable<any> {

      const dataRes = this.getCarsBack().subscribe(
        data => {
          console.log('Asignando data temporal (para busqueda)');
          this.data = [...data];
          console.log(this.data);
          this.setCarsFilter(data);
        }
      );

      return this.getCarsFilter();
    }
    getCarsBack(): Observable<any> {
    const data = this.http.get<any[]>('api/cars/')
                .pipe(
                    map(this.extractData),
                    tap(_ => console.log('No se encontro resultados')),
                    catchError(this.handleError('getCarsBack', []))
                  );

      return data;
    }
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        // Mantiene la aplicacion en ejecución retornando vacio.
        return of(result as T);
      };
    }
    private extractData(res: any) {
      const body: any = res;
      console.log('data extract: ');
      console.log(body);
      return body || {};
    }
}

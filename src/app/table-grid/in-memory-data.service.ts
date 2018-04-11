import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {data} from './data';
@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cars = data;

    return {cars};
  }
}

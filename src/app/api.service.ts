import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClientService: HttpClient
  ) { }

  getGridData$(cityName) {
    return this.httpClientService.get<any>('https://vast-shore-74260.herokuapp.com/banks', {
      params: {
        city: cityName
      }
    });
  }
}

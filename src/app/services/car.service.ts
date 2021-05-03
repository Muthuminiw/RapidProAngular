import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { Apollo } from 'apollo-angular';

const baseUrl = 'http://localhost:8080/api/cars';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient,private apollo: Apollo) { }

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(baseUrl);
  }

  get(id: any): Observable<Car> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Car[]> {
    return this.http.get<Car[]>(`${baseUrl}?title=${title}`);
  }
}

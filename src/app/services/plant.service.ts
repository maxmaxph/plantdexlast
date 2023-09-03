import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Plant } from '../models/plant';
import { InterfacePlant } from '../models/plant.interface';


@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }
private handleError(error: any) {
    console.error('Une erreur est survenue', error);
    return throwError(error.message || 'Erreur serveur');
}
  getPlants(){
    return this.http.get<InterfacePlant>("http://localhost:3000/api/plants").pipe(map(e => e.data))
  };

  getPlantById(id: number) {
    return this.http.get<InterfacePlant>(`http://localhost:3000/api/plants/${id}`).pipe(map(e => e.data));
  }

  deletePlant(plantId: number): Observable<void> {
    const url = `http://localhost:3000/api/plants/${plantId}`;
    return this.http.delete<void>(url);
  }

 updatePlant(plantid: number, updatePlant: Plant): Observable<void> {
    const url = `http://localhost:3000/api/plants/${plantid}`;
    return this.http.put<void>(url, updatePlant);
  }

  createPlant(plant: Plant): Observable<Plant> {
    const url = `http://localhost:3000/api/plants`;
    return this.http.post<Plant>(url, plant).pipe(
        catchError(this.handleError)
    );
}

}



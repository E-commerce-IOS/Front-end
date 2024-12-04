import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'pipipopo'; // URL da api

  constructor(private http: HttpClient) {}

  search(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?query=${encodeURIComponent(query)}`);
  }
}

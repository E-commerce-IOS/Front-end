import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Item } from "../models/item.model";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class ItemService {
    
    private url = environment.api;

    constructor( private httpClient: HttpClient) {    
    }

    obterProdutos (): Observable<Item[]> {
      return this.httpClient.get<Item[]>(this.url + '/item/' )
    }

    getProductById(id: number): Observable<Item> {
      return this.httpClient.get<Item>(`${this.url}/item/${id}`);
    }
  }
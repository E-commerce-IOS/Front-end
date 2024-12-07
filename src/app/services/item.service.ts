import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Item } from "../models/item.model";


@Injectable({
    providedIn:'root'
})

export class ItemService {
    
    private url = environment.api;

    constructor( private httpClient: HttpClient) {    
    }

    obterProdutos () {
      return this.httpClient.get<Item[]>(this.url + '/item/' )
    }
}
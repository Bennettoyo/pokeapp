import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';
  // private host = this.server + 'api/';


  constructor(public httpClient: HttpClient) { }


  public get(id: any) {
    return this.httpClient.get(this.pokemonUrl + id, {
      responseType: 'json'
    }).pipe(timeout(120000));
  }

  public getSpecies(id: any) {
    return this.httpClient.get(this.speciesUrl + id, {
      responseType: 'json'
    }).pipe(timeout(120000));
  }
}
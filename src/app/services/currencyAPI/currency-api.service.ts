import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyAPIService {

  constructor(private http: HttpClient) { }

  getTrade(currencyCode: string): Observable<any> {
    const url: string = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`;
    return this.http.get<any>(url)
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

interface Currency {
  code: string,
  name: string,
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private route: string = 'available_currency.json';

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get(this.route);
  }

}

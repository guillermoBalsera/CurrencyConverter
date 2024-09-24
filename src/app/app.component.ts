import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "./services/currency/currency.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = '1 USD = 0,90 EUR';

  constructor(private currency: CurrencyService) {}

  async ngOnInit(): Promise<void> {
    this.currency.getJsonData().subscribe((data: any): void => {
      console.log(data)
    });
  }

}

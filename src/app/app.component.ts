import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "./services/currency/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = '1 USD = 0,90 EUR';
  showModalA: boolean = false;
  showModalB: boolean = false;

  modal_title: string = "Choose a currency";

  currencyA: any = {
    "code": "eur",
    "name": "Euro",
    "icon": "europe.svg"
  };
  currencyB: any = {
    "code": "usd",
    "name": "United States Dollar",
    "icon": "united_states.svg"
  };

  data: any[] = [];

  constructor(private currency: CurrencyService) {
  }

  async ngOnInit(): Promise<void> {
    this.currency.getJsonData().subscribe((data: any): void => {
      this.data = data;
    });
  }

  openModalA(): void {
    this.showModalA = true;
  }

  closeModalA(): void {
    this.showModalA = false;
  }

  openModalB(): void {
    this.showModalB = true;
  }

  closeModalB(): void {
    this.showModalB = false;
  }

  switch_currency(): void {
    let temp_currency = this.currencyA;
    this.currencyA = this.currencyB;
    this.currencyB = temp_currency
  }

}

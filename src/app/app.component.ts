import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "./services/currency/currency.service";
import {CurrencyAPIService} from "./services/currencyAPI/currency-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = ' 1EUR = 1.12USD ';
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

  exchange: number = 0.00;

  origin: number = 0.00
  result: number = 0.00

  data: any[] = [];
  filter: string = "";

  constructor(private currency: CurrencyService, private currencyAPI: CurrencyAPIService) {
  }

  async ngOnInit(): Promise<void> {
    this.currency.getJsonData().subscribe((data: any): void => {
      this.data = data;
    });
    this.getExchange();
  }

  getExchange(): void {
    this.currencyAPI.getTrade(this.currencyA.code).subscribe((data: any): void => {
      this.exchange = this.roundNumber(data[this.currencyA.code][this.currencyB.code]);
    });
    this.calculateResult()
  }

  roundNumber(x: number): number {
    return Math.ceil(x * 100) / 100;
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
    this.exchange = this.roundNumber(1 / this.exchange);
    this.calculateResult();
    let temp_currency = this.currencyA;
    this.currencyA = this.currencyB;
    this.currencyB = temp_currency;
    this.getExchange();
  }

  onInputChange(event: any): void {
    let value: any = event.target.value;
    if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
      value = value.substring(1);
    }
    this.origin = value;
    this.calculateResult();
  }

  calculateResult(): void {
    this.result = this.roundNumber(this.origin * this.exchange)
  }

  filterData(): void {

  }

}

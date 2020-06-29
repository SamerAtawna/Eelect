import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from '@angular/animations';
import { faExclamationTriangle, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: "app-locate-request",
  templateUrl: "./locate-request.component.html",
  styleUrls: ["./locate-request.component.scss"],
  animations: [trigger(
    'enterFade',
    [
      transition(
        ':enter',
        [
          style({ height: 0, opacity: 0 }),
          animate('0.5s ease-out',
            style({ height: 300, opacity: 1 }))
        ]
      ),
    ])]
})

export class LocateRequestComponent implements OnInit {

  //Dummy data
  cities: Array<{ name: String }> = [
    { name: "באר שבע" },
    { name: "תל אביב" },
    { name: "חולון" },
    { name: "קרית גת" },
  ];
  RESULT_DATA = [
    { name: 'הגשת רשימת אמת', date: "25/06/2020", city: 'באר שבע' },
    { name: 'הגשת רשימת בדיקה', date: "12/01/2020", city: 'חולון' },
    { name: 'הגשת רשימת בדיקה2', date: "3/02/2020", city: 'קרית גת' },
    { name: 'הגשת רשימת בדיקה3', date: "19/06/2020", city: 'באר שבע' },

  ];
  filteredCities: Observable<{ name }[]>;

  //////

  faExclamationTriangle = faExclamationTriangle;;
  faSearch = faSearch;
  faPlus = faPlus;
  displayedColumns: string[] = ['name', 'date', 'city'];
  dataSource = this.RESULT_DATA;
  isLoading: boolean = false;
  isData: boolean = false;
  requestForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      requestName: new FormControl("", Validators.required),
      dateFrom: new FormControl(""),
      dateTo: new FormControl(""),
      city: new FormControl(""),
      name: new FormControl(""),
    })
    this.filteredCities = this.requestForm.controls.city.valueChanges.pipe(
      map(value => this._filter(value))
    );
  }
  private _filter(value) {
    console.log("filterValue ", value);
    return this.cities.filter(option => option.name.indexOf(value) > -1);
  }
  search() {
    this.isData = false;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isData = true;
    }, 3000);
  }
}

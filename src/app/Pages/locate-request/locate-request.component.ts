import { Component, OnInit, ViewChild } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import {
  faExclamationTriangle,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { startWith, map } from "rxjs/operators";
import { Result } from "src/app/Models/Result";
import { ApiService } from "src/app/Services/api.service";
import { ParseNamesService } from "src/app/Services/parse-names.service";
import * as moment from "moment";
import { Router } from "@angular/router";
import { City } from 'src/app/Models/City';


@Component({
  selector: "app-locate-request",
  templateUrl: "./locate-request.component.html",
  styleUrls: ["./locate-request.component.scss"],
  animations: [
    trigger("enterFade", [
      transition(":enter", [
        style({ height: 0, opacity: 0 }),
        animate("0.5s ease-out", style({ height: 300, opacity: 1 })),
      ]),
    ]),
  ],
})
export class LocateRequestComponent implements OnInit {
  showSettings=false;
  
 version = "1.1.5";
  //Dummy data
  cities: Array<City> = [
    { Name: "אור עקיבא", Id: "957620000" },
    { Name: "ביתר עילית", Id: "957620001" },
    { Name: "גדרה", Id: "957620002" },
    { Name: "דימונה", Id: "957620003" },
    { Name: "הרצליה", Id: "957620004" },
    { Name: "זכרון יעקב", Id: "957620005" },
    { Name: "הוד השרון", Id: "957620006" },
    { Name: "ירושלים", Id: "957620007" },
    { Name: "חיפה", Id: "957620008" },
    { Name: "טבריה", Id: "957620009" },
    { Name: "כפר סבא", Id: "957620010" },
    { Name: "טירה", Id: "957620011" },
    { Name: "טייבה", Id: "957620012" },
    { Name: "נצרת", Id: "957620013" },
    { Name: "עפולה", Id: "957620014" },
    { Name: "מגדל העמק", Id: "957620015" },
    { Name: "חדרה", Id: "957620016" },
    { Name: "נתניה", Id: "957620017" },
    { Name: "קרית שמונה", Id: "957620018" },
    { Name: "קצרין", Id: "957620019" },
    { Name: "ראש פינה", Id: "957620020" },
    { Name: "נהריה", Id: "957620021" },
    { Name: "באר שבע", Id: "957620022" },
    { Name: "אילת", Id: "957620023" },
    { Name: "מצפה רמון", Id: "957620024" },
    { Name: "תל אביב", Id: "957620025" },
    { Name: "בת ים", Id: "957620026" },
    { Name: "חולון", Id: "957620027" },
    { Name: "ראשון לציון", Id: "957620028" },
    { Name: "יבנה", Id: "957620029" },
  ];
  RESULT_DATA: Array<Result> = [];
  @ViewChild("dataTable", { static: true }) table;

  filteredCities: Observable<Array<City>>;
  settingsForm: FormGroup;

  //////

  faExclamationTriangle = faExclamationTriangle;
  faSearch = faSearch;
  faPlus = faPlus;

  isLoading: boolean = false;
  isData: boolean = false;
  requestForm: FormGroup;

  constructor(
    private toast: ToastrService,
    private api: ApiService,
    private parseService: ParseNamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      maxCandNumber: new FormControl(""),
      maxSignNumber: new FormControl(""),
      maxDate: new FormControl(""),
    });
    this.requestForm = new FormGroup({
      requestName: new FormControl("", Validators.required),
      dateFrom: new FormControl(""),
      dateTo: new FormControl(""),
      city: new FormControl(""),
      name: new FormControl(""),
    });
    this.filteredCities = this.requestForm.controls.city.valueChanges.pipe(
      map((value) => this._filter(value))
    );

  }
  private _filter(value) {
    console.log("filterValue ", value);
    return this.cities.filter((option) => option.Name.indexOf(value) > -1);
  }
  async search() {
    this.isLoading = true;
    let requestName = this.requestForm.controls.requestName.value;
    let dateFrom = moment(this.requestForm.controls.dateFrom.value).format(
      "DD/MM/YYYY"
    );
    dateFrom === "Invalid date" ? (dateFrom = "") : "";
    let dateTo = moment(this.requestForm.controls.dateTo.value).format(
      "DD/MM/YYYY"
    );
    dateTo === "Invalid date" ? (dateTo = "") : "";

    let city = this.parseService.parseCity(
      this.requestForm.controls.city.value
    );
    // await this.api.searchDummy().then((res: Array<Result>) => {
    //   this.RESULT_DATA = [];
    //   this.RESULT_DATA = res;
    //   console.log(res);
    //   this.isLoading = false;
    // });
    await this.api
      .searchData(requestName, dateFrom, dateTo, city)
      .then((res: Array<Result>) => {
        this.RESULT_DATA = [];
        this.RESULT_DATA = res;
        localStorage.setItem("result_data", JSON.stringify(res));
        console.log(res);
        this.isLoading = false;
      });
  }

  saveSettings() {
    localStorage.clear();
    console.log(this.settingsForm.controls.maxDate.value);
    if (this.settingsForm.controls.maxDate.value != "") {
      localStorage.setItem("maxDate", this.settingsForm.controls.maxDate.value);
    }
    if (this.settingsForm.controls.maxCandNumber.value != "") {
      localStorage.setItem(
        "minCandNumber",
        this.settingsForm.controls.maxCandNumber.value
      );
    }
    if (this.settingsForm.controls.maxSignNumber.value != "") {
      localStorage.setItem(
        "minSignNumber",
        this.settingsForm.controls.maxSignNumber.value
      );
    }
    this.toast.success("ההגדרות נשמו בהצלחה");
  }

  nav(item: Result) {
    console.log(item);

    this.router.navigate(["/request-details"], {
      queryParams: {id: item.RequestId},
    });
  }

  getCityName(id) {
    return this.parseService.parseCityId(id);
  }
}

import { Injectable } from "@angular/core";
import { City } from "../Models/City";

@Injectable({
  providedIn: "root",
})
export class ParseNamesService {
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
  constructor() {}

  parseCity(cityName) {
    console.log("cirtyname  ", cityName);
    let id = this.cities.find((x) => {
      console.log("x.Name === cityName ", x.Name +"=="+ cityName)
      return x.Name === cityName;
    });
    return id === undefined ? "" : id.Id;
  }

  parseCityId(cityId) {
    console.log("cityId  ", cityId);
    let name = this.cities.find((x) => {
      console.log("x.Name === cityName ", x.Id +"=="+ cityId)
      return x.Id === cityId;
    });
    return name=== undefined ? "" : name.Name;
  }
}

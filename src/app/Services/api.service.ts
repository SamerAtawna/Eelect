import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Request } from "../Models/Request";
import { tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData() {
    return new Promise((res, rej) => {
      return this.http.get("../assets/post-request.json").subscribe(
        (data) => {
          res(data);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }

  searchData(requestName, dateFrom, dateTo, city) {
    let objToSend = {
      RequestName: requestName,
      FromDate: dateFrom,
      ToDate: dateTo,
      City: city,
    };
    console.log("objToSend ", objToSend);
    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    return new Promise((res, rej) => {
      return this.http
        .post("http://web.elections.api/api/home/searchcases", objToSend, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            console.log(JSON.parse(data));
            let dt = JSON.parse(data);
            res(dt);
          },
          (err) => {
            rej(err);
          }
        );
    });
  }
  searchDummy() {
    return new Promise((res, rej) => {
      return this.http.get("../assets/results.json").subscribe(
        (data) => {
          res(data);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }

  getDummyDetails() {
    return new Promise((res, rej) => {
      return this.http.get("../assets/results.json").subscribe(
        (data) => {
          res(data);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }
  postData(dataObj) {
    console.log(dataObj);
    let dataToSend = JSON.stringify(dataObj);
    console.log(dataToSend);
    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    let header = new HttpHeaders();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json");
    return new Promise((res, rej) => {
      return this.http
        .post("http://web.elections.api/api/home/addcase", dataToSend, {
          headers: headers,
        })
        .subscribe(
          (data) => {
            res(data);
          },
          (err) => {
            rej(err);
          }
        );
    });
  }

  getDetails(requestId) {
    let objToSend = {
      RequestId: requestId,
    };
    console.log("objToSend ", objToSend);
    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    return new Promise((res, rej) => {
      return this.http
        .post("http://web.elections.api/api/home/getcase", objToSend, {
          headers: headers,
        })
        .pipe(tap((res) => console.log("++ tap res ", res)))
        .subscribe(
          (data: any) => {
            console.log(JSON.parse(data));
            let dt = JSON.parse(data);
            res(dt);
          },
          (err) => {
            rej(err);
          }
        );
    });
  }
  updateCandidates(requestId, dataObj: Array<any>) {
    console.log(" ---> ", requestId, dataObj);
    // dataObj.map(el=>{
    //   el.UniqueID = requestId;
    // })
    console.log("++++++++++++ dataObj ", dataObj);
    let dtToSend = { CandidateNameList: dataObj };
    let dataToSend = JSON.stringify(dtToSend);
    console.log(dataToSend);
    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    let header = new HttpHeaders();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json");
    return new Promise((res, rej) => {
      return this.http
        .post("http://web.elections.api/api/home/UpdateCouncils", dataToSend, {
          headers: headers,
        })
        .subscribe(
          (data) => {
            res(data);
          },
          (err) => {
            rej(err);
          }
        );
    });
  }
}

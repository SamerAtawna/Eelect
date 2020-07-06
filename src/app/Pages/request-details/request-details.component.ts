import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

import {
  faExclamationTriangle,
  faSearch,
  faPlus,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFilePdf,
  faFileImage,
  faFile,
  faUser,
  faPhone,
  faMailBulk,
  faNetworkWired,
  faAt,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { CandidateDetailsComponent } from "src/app/Components/candidate-details/candidate-details.component";
import { ExcelService } from "src/app/Services/excel.service";
import { SignForListComponent } from "src/app/Components/sign-for-list/sign-for-list.component";
import { SignForLeadComponent } from "src/app/Components/sign-for-lead/sign-for-lead.component";
import { City } from "src/app/Models/City";
import { ApiService } from "src/app/Services/api.service";
import { Request } from "src/app/Models/Request";
import { FunctionType } from "src/app/Models/FunctionType";
import { FunctionName } from "src/app/Models/FunctionName";
import { title } from "process";
import { FunctionList } from "src/app/Models/FunctionList";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { Type } from "src/app/Models/Type";
import { Status } from "src/app/Models/Status";

@Component({
  selector: "app-request-details",
  templateUrl: "./request-details.component.html",
  styleUrls: ["./request-details.component.scss"],
})
export class RequestDetailsComponent implements OnInit {
  selectedCity;
  cityValid;
  isNewRequest = true;
  isSaving = false;
  reqId;
  candidateUniqueId = "";
  expDate;
  blockCreate = false;
  request: Request;
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
  functionTypes: Array<FunctionType> = [
    { type: "סיעה יוצאת", id: "957620000" },
    { type: "סיעה משולבת", id: "957620001" },
    { type: "רשימה חדשה", id: "957620002" },
  ];
  functionNames: Array<FunctionName> = [
    { name: "אמת", id: "957620000" },
    { name: "ג", id: "957620001" },
    { name: "ודעם", id: "957620002" },
    { name: "ז", id: "957620003" },
    { name: "זך", id: "957620004" },
    { name: "זץ", id: "957620005" },
    { name: "טב", id: "957620006" },
    { name: "י", id: "957620007" },
    { name: "ינ", id: "957620008" },
    { name: "יק", id: "957620009" },
    { name: "כן", id: "957620010" },
    { name: "ל", id: "957620011" },
    { name: "מחל", id: "957620012" },
    { name: "מרץ", id: "957620013" },
    { name: "נ", id: "957620014" },
    { name: "פה", id: "957620015" },
    { name: "נץ", id: "957620016" },
    { name: "שס", id: "957620017" },
  ];
  functionListNames: Array<FunctionList> = [
    { name: "אמת", id: "957620000" },
    { name: "ג", id: "957620001" },
    { name: "ודעם", id: "957620002" },
    { name: "ז", id: "957620003" },
    { name: "זך", id: "957620004" },
    { name: "זץ", id: "957620005" },
    { name: "טב", id: "957620006" },
    { name: "י", id: "957620007" },
    { name: "ינ", id: "957620008" },
    { name: "יק", id: "957620009" },
    { name: "כן", id: "957620010" },
    { name: "ל", id: "957620011" },
    { name: "מחל", id: "957620012" },
    { name: "מרץ", id: "957620013" },
    { name: "נ", id: "957620014" },
    { name: "פה", id: "957620015" },
    { name: "נץ", id: "957620016" },
    { name: "שס", id: "957620017" },
  ];

  requestTypes: Array<Type> = [
    { Type: "הגשת רשימות", ID: "957620004" },
    { Type: " מימון", ID: "957,620,005" },
    { Type: "הכללה בפנקס בוחרים ", ID: "957,620,006" },
    { Type: " הפקת קבצים למועמדים ורשימות", ID: "957,620,007" },
    { Type: "גיוס מנהלי בחירות ", ID: "957,620,008" },
  ];

  StatusTypes: Array<Status> = [
    { Name: "החל טיפול", ID: "1" },
    { Name: "בהמתנה", ID: "2" },
    { Name: "הבקשה נפסלה", ID: "3" },
    { Name: "בדיקת תקינות נתונים", ID: "4" },
    { Name: "הבקשה הוחזרה לבא כוח", ID: "957620000" },
    { Name: "בדיקת מנהל הבחירות", ID: "957620001" },
    { Name: "בדיקת ועדת הבחירות", ID: "957620002" },
    { Name: "הבקשה מאושרת", ID: "957620003" },
  ];

  // response = [
  //   `@[112,ca4b4983-4abc-ea11-911b-005056b36431,"אור יהודה 2022"] was assigned to @[8,a158ae75-a7a7-e911-910d-005056b36431,"Erez Noam"] by @[8,979c96c5-fdb8-ea11-911b-005056b36431,"Ilan Dvir"]`,
  //   `Case: Created by @[8,4c6d76ad-09a4-e911-910c-005056b36431,"CRMAdmin Last name"] for Contact @[2,e58f577b-4abc-ea11-911b-005056b36431,"יעקוב שימעוני"].`,
  // ];
  filteredCities: Observable<City[]>;
  filteredFunctionTypes: Observable<FunctionType[]>;
  filteredFunctionNames: Observable<FunctionName[]>;
  filteredFunctionList: Observable<FunctionList[]>;
  requestTypesList: Observable<any[]>;
  requestDetailsForm: FormGroup;
  electoralForm: FormGroup;
  statusForm: FormGroup;
  contactForm: FormGroup;
  options = ["פתוחה", "סגורה"];
  faPlus = faPlus;
  faUser = faUser;
  faPhone = faPhone;
  faAt = faAt;
  faLink = faLink;
  docIcons = {
    doc: faFileWord,
    docx: faFileWord,
    docs: faFileWord,
    xls: faFileExcel,
    xlsx: faFileExcel,
    pdf: faFilePdf,
    png: faFileImage,
    jpg: faFileImage,
  };
  isDocsLoading = false;
  files: Array<File>;
  @ViewChild("file") file;
  now;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, "0");
  mm = String(this.today.getMonth() + 1).padStart(2, "0"); //January is 0!
  yyyy = this.today.getFullYear();
  MAX_DATE: any = "";
  MAX_DATE_FORMATTED = "";

  constructor(
    public dialog: MatDialog,
    private excelService: ExcelService,
    private apiService: ApiService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}
  openDialog(): void {
    console.log("### this.request  ", this.request);
    const dialogRef = this.dialog.open(CandidateDetailsComponent, {
      width: "600px",
      height: "800px",
      data:
        this.request.CandidateNameList === undefined
          ? []
          : this.request.CandidateNameList,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      console.log("##result ", result);
      if (result !== undefined) {
        this.request.CandidateNameList = result;
        this.apiService.updateCandidates(this.candidateUniqueId, result);
        if (this.request.CandidateNameList.length > 0) {
          this.toast.success("רשימה נשמרה");
        }
        console.log("###  request ", this.request);
      }
    });
  }
  openDialogList(): void {
    const dialogRef = this.dialog.open(SignForListComponent, {
      width: "600px",
      height: "800px",
      data:
        this.request.SignForList === undefined ? [] : this.request.SignForList,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      console.log("##result ", result);
      if (result !== undefined) {
        this.request.SignForList = result;
        this.toast.success("רשימה נשמרה");
      }
    });
  }
  openDialogLead(): void {
    const dialogRef = this.dialog.open(SignForLeadComponent, {
      width: "600px",
      height: "800px",
      data:
        this.request.SignForLead === undefined ? [] : this.request.SignForLead,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      console.log("##result ", result);
      if (result !== undefined) {
        this.request.SignForLead = result;
        this.toast.success("רשימה נשמרה");
      }
    });
  }
  ngOnInit(): void {
    console.log("$$params ", this.route.snapshot.queryParamMap.get("id"));
    let currId = this.route.snapshot.queryParamMap.get("id");
    if (currId) {
      this.isNewRequest = false;
      this.reqId = currId;
    } else {
      if (localStorage.getItem("maxDate")) {
        this.MAX_DATE = moment(localStorage.getItem("maxDate"));
        this.MAX_DATE_FORMATTED = moment(
          localStorage.getItem("maxDate")
        ).format("DD/MM/YYYY");
      }

      console.log("+MAX_DATE ", this.MAX_DATE);
      console.log("+MOMENT ", moment());

      console.log(
        " (moment().isBefore(this.MAX_DATE)) ",
        moment().isSameOrBefore(this.MAX_DATE)
      );
      if (!moment().isSameOrBefore(this.MAX_DATE) && this.MAX_DATE != "") {
        console.log("&&&&&&&&& BEFOREE");
        this.expDate = this.MAX_DATE_FORMATTED;
        this.blockCreate = true;
      } else {
        this.expDate = "";
        this.blockCreate = false;
      }
    }

    this.now = this.mm + "/" + this.dd + "/" + this.yyyy;
    this.requestDetailsForm = new FormGroup({
      requestName: new FormControl("  ", Validators.required),
      city: new FormControl(" ", [
        Validators.required,
        this.cityValidator(this.cities),
      ]),
      submitsRequest: new FormControl("", Validators.required),
      subSubmitsRequest: new FormControl("", Validators.required),
      submitsRequestID: new FormControl("", [
        Validators.minLength(8),
        Validators.required,
      ]),
      subSubmitsRequestID: new FormControl("", [
        Validators.minLength(8),
        Validators.required,
      ]),
      requestType: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      // signForLead: new FormControl("", Validators.required),
    });
    this.electoralForm = new FormGroup({
      functionList: new FormControl("", [
        Validators.required,
        this.funcListValidatior(this.functionListNames),
      ]),
      functionType: new FormControl("", [
        Validators.required,
        this.funcTypeValidator(this.functionTypes),
      ]),
      functionName: new FormControl("", [
        Validators.required,
        this.funcNamesValidator(this.functionNames),
      ]),
      candidateName: new FormControl("", Validators.required),
      // signForList: new FormControl("", Validators.required),
      // signForLead: new FormControl("", Validators.required),
      candidateId: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    if (!this.isNewRequest) {
      this.requestDetailsForm.controls.requestName.disable();
    }

    this.statusForm = new FormGroup({
      status: new FormControl(""),
      officeRespond: new FormControl(""),
    });

    this.contactForm = new FormGroup({
      contactName: new FormControl(""),
      phone: new FormControl(""),
      email: new FormControl("", Validators.email),
      url: new FormControl(""),
    });
    this.filteredCities = this.requestDetailsForm.controls.city.valueChanges.pipe(
      map((value) => this._filter(value))
    );
    this.filteredFunctionTypes = this.electoralForm.controls.functionType.valueChanges.pipe(
      map((value) => this._filterFunctionTypes(value))
    );
    this.filteredFunctionNames = this.electoralForm.controls.functionName.valueChanges.pipe(
      map((value) => this._filterFunctionNames(value))
    );

    this.filteredFunctionList = this.electoralForm.controls.functionList.valueChanges.pipe(
      map((value) => this._filterFunctionList(value))
    );
    this.requestTypesList = this.requestDetailsForm.controls.requestType.valueChanges.pipe(
      map((value) => this._requestTypeListFilter(value))
    );

    if (!this.isNewRequest) {
      this.getData();
    } else {
      this.request = new Request();
      this.request.RequestId = "";
      this.request.SignForList = [];
      this.request.SignForLead = [];
      this.request.CandidateNameList = [];
    }
  }
  async getData() {
    console.log("$$ gettingdata->");
    this.isSaving = true;
    await this.apiService.getDetails(this.reqId).then((data: Request) => {
      console.log("--------> data ", data);
      this.request = data;
      if (this.request.CandidateNameList.length > 0) {
        // this.candidateUniqueId = this.request.CandidateNameList[0].UniqueID;
        this.request.CandidateNameList.map((x) => {
          let currAge = x.Age.toString();
          let currNum = x.NumInElectral.toString();
          let currID = x.ID.toString();
          if (currNum.indexOf(".") > -1) {
            x.NumInElectral = parseInt(currNum.slice(0, currNum.indexOf(".")));
          }
          if (currID.indexOf(".") > -1) {
            x.ID = currID.slice(0, currID.indexOf("."));
          }
          x.Age = parseInt(currAge);
        });
      }

      console.log(
        "$$$ this.request.CandidateNameList[0].UniqueID ",
        this.request.CandidateNameList[0].UniqueID
      );
      this.requestDetailsForm
        .get("requestName")
        .patchValue(this.request.RequestName);
    });
    let cityName = this.cities.find((x) => x.Id === this.request.City);
    this.requestDetailsForm
      .get("city")
      .patchValue(cityName === undefined ? "" : cityName.Name);
    this.requestDetailsForm
      .get("subSubmitsRequest")
      .patchValue(this.request.SubAgent);
    this.requestDetailsForm
      .get("subSubmitsRequestID")
      .patchValue(this.request.SubAgentId);
    this.requestDetailsForm
      .get("submitsRequest")
      .patchValue(this.request.SubmitsRequest);
    this.requestDetailsForm
      .get("submitsRequestID")
      .patchValue(this.request.SubmitsRequestId);

    this.requestDetailsForm.get("requestType").patchValue(this.request.Type);

    this.requestDetailsForm
      .get("description")
      .patchValue(this.request.Description);
    this.requestDetailsForm;
    // .get("signForLead")
    // .patchValue(this.request.SignForLead);

    let funcList = this.functionListNames.find(
      (x) => x.id === this.request.FunctionList
    );
    ///////////////////////////////////////////
    this.electoralForm
      .get("functionList")
      .patchValue(funcList === undefined ? "" : funcList.name);

    let funcType = this.functionTypes.find(
      (x) => x.id === this.request.FunctionType
    );

    this.electoralForm
      .get("functionType")
      .patchValue(funcType === undefined ? "" : funcType.type);

    let funcName = this.functionNames.find(
      (x) => x.id === this.request.FunctionName
    );

    let Type = this.requestTypes.find((x) => {
      x.ID === this.request.Type;
    });

    this.requestDetailsForm
      .get("requestType")
      .patchValue(Type === undefined ? "" : Type.Type);

    this.electoralForm
      .get("functionName")
      .patchValue(funcName === undefined ? "" : funcName.name);
    this.electoralForm
      .get("candidateName")
      .patchValue(this.request.CandidateLeadName);
    this.electoralForm
      .get("candidateId")
      .patchValue(this.request.CandidateLeadId);
    this.statusForm
      .get("status")
      .patchValue(
        this.StatusTypes.find((x) => x.ID === this.request.Status).Name
      );
    this.statusForm
      .get("officeRespond")
      .patchValue(this.request.OfficeRespond[0]);
    this.contactForm.get("contactName").patchValue(this.request.ContactName);
    this.contactForm.get("phone").patchValue(this.request.Phone);
    this.contactForm.get("email").patchValue(this.request.Email);
    this.contactForm.get("url").patchValue(this.request.Url);
    this.isSaving = false;
  }

  private _filter(value) {
    console.log("filterValue ", value);
    return this.cities.filter((option) => option.Name.indexOf(value) > -1);
  }

  private _filterFunctionTypes(value) {
    return this.functionTypes.filter(
      (option) => option.type.indexOf(value) > -1
    );
  }

  private _filterFunctionNames(value) {
    return this.functionNames.filter(
      (option) => option.name.indexOf(value) > -1
    );
  }
  private _filterFunctionList(value) {
    return this.functionNames.filter(
      (option) => option.name.indexOf(value) > -1
    );
  }

  private _requestTypeListFilter(value) {
    return this.requestTypes.filter(
      (option) => option.Type.indexOf(value) > -1
    );
  }

  addDocs() {
    this.file.nativeElement.click();
  }
  onFilesAdded(files: FileList) {
    this.isDocsLoading = true;
    this.files = Array.from(files);
  }

  getDocIcon(type) {
    console.log("## type ", type);
    return this.docIcons[type] ? this.docIcons[type] : faFile;
  }

  mimeParse(type) {
    return this.excelService.mimeParse(type);
  }

  cityValidator(cities: Array<City>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let res = this.cities.filter((x) => {
        return x.Name === control.value;
      });
      if (control.value !== undefined && res.length === 0) {
        return { city: true };
      }
      return null;
    };
  }

  funcTypeValidator(functype): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let res = functype.filter((x) => {
        return x.type === control.value;
      });
      if (control.value !== undefined && res.length === 0) {
        return { city: true };
      }
      return null;
    };
  }

  funcNamesValidator(funcname): ValidatorFn {
    console.log("func name ", funcname);
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let res = funcname.filter((x) => {
        return x.name === control.value;
      });
      if (control.value !== undefined && res.length === 0) {
        return { city: true };
      }
      return null;
    };
  }
  funcListValidatior(funclist): ValidatorFn {
    console.log("func name ", funclist);
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let res = funclist.filter((x) => {
        return x.name === control.value;
      });
      if (control.value !== undefined && res.length === 0) {
        return { city: true };
      }
      return null;
    };
  }

  save() {
    console.log("$$ request ", this.request);
    console.log("^^this.requestDetailsForm.valid ", this.requestDetailsForm);
    console.log("^^this.electoralForm.valid ", this.electoralForm);
    console.log("^^this.statusForm.valid ", this.statusForm.valid);
    console.log("^^his.contactForm.valid ", this.contactForm.valid);
    if (
      this.requestDetailsForm.valid &&
      this.electoralForm.valid &&
      this.statusForm.valid &&
      this.contactForm.valid
    ) {
      this.functionNames.find((x: FunctionName) => {
        return x.name === this.electoralForm.controls.functionName.value;
      }).id;
      this.isSaving = true;
      this.request.City = this.cities.find(
        (x) => x.Name === this.requestDetailsForm.controls.city.value
      ).Id;
      this.request.FunctionType = this.functionTypes.find(
        (x) => x.type === this.electoralForm.controls.functionType.value
      ).id;
      this.request.FunctionName = this.functionNames.find(
        (x: FunctionName) =>
          x.name === this.electoralForm.controls.functionName.value
      ).id;
      this.request.RequestName = this.requestDetailsForm.controls.requestName.value;

      // let st = this.StatusTypes.find(
      //     (x) => x.Name === this.statusForm.controls.status.value
      //   ).Name;
      //   this.request.Status  = st === undefined? "": st;
      this.request.CandidateLeadId = this.electoralForm.controls.candidateId.value;
      console.log(
        "## subsub ",
        this.requestDetailsForm.controls.SubmitsRequestId
      );
      this.request.SubmitsRequestId = this.requestDetailsForm.controls.submitsRequestID.value;
      this.request.RequestId = this.reqId;
      this.request.CandidateLeadName = this.electoralForm.controls.candidateName.value;
      this.request.ContactName = this.contactForm.controls.contactName.value;
      this.request.Phone = this.contactForm.controls.phone.value;
      this.request.Email = this.contactForm.controls.email.value;
      this.request.Url = this.contactForm.controls.url.value;
      this.request.OfficeRespond = this.statusForm.controls.officeRespond.value;
      this.request.SubAgent = this.requestDetailsForm.controls.subSubmitsRequest.value;
      this.request.SubAgentId = this.requestDetailsForm.controls.subSubmitsRequestID.value;
      this.request.SubmitsRequest = this.requestDetailsForm.controls.submitsRequest.value;
      this.request.Type = this.requestTypes.find(
        (x: Type) =>
          x.Type === this.requestDetailsForm.controls.requestType.value
      ).ID;
      this.request.Description = this.requestDetailsForm.controls.description.value;
      this.request.FunctionList = this.functionListNames.find(
        (x) => x.name == this.electoralForm.controls.functionList.value
      ).id;

      this.apiService
        .postData(this.request)
        .then((res) => {
          this.isSaving = false;
          this.toast.success("טופס נשלח בהצלחה");
        })
        .catch((err) => {
          console.log(err);
          this.isSaving = false;
          this.toast.error("עדכון נכשל ");
        });
    } else {
      this.toast.error("טופס לא תקין");
      return;
    }
  }
}

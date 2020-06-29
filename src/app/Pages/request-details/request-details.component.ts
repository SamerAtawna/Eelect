import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

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

@Component({
  selector: "app-request-details",
  templateUrl: "./request-details.component.html",
  styleUrls: ["./request-details.component.scss"],
})
export class RequestDetailsComponent implements OnInit {
  cities: Array<{ name: String }> = [
    { name: "באר שבע" },
    { name: "תל אביב" },
    { name: "חולון" },
    { name: "קרית גת" },
  ];
  filteredCities: Observable<{ name }[]>;
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

  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(CandidateDetailsComponent, {
      width: "600px",
      height: "800px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
  ngOnInit(): void {
    this.now = this.mm + "/" + this.dd + "/" + this.yyyy;
    this.requestDetailsForm = new FormGroup({
      requestName: new FormControl("הגשת רשימת אמת", Validators.required),
      city: new FormControl("באר שבע", Validators.required),
      submitsRequest: new FormControl("", Validators.required),
      subSubmitsRequest: new FormControl("", Validators.required),
      submitsRequestID: new FormControl("", Validators.required),
      requestType: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      signForLead: new FormControl("", Validators.required),
    });
    this.electoralForm = new FormGroup({
      functionList: new FormControl("", Validators.required),
      functionType: new FormControl("", Validators.required),
      functionName: new FormControl("", Validators.required),
      candidateName: new FormControl("", Validators.required),
      signForList: new FormControl("", Validators.required),
      signForLead: new FormControl("", Validators.required),
      candidateId: new FormControl("", Validators.required),
      candidateList: new FormControl("", Validators.required),
    });

    this.statusForm = new FormGroup({
      status: new FormControl(""),
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
  }

  private _filter(value) {
    console.log("filterValue ", value);
    return this.cities.filter((option) => option.name.indexOf(value) > -1);
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

  mimeParse(file) {
    //object that used to convert regular file extensions to mime types,

    let mimes = {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "image/jpeg": "jpg",
      "image/gif": "gif",
      "application/msword": "doc",
      "image/tiff": "tif",
      txt: "text/plain",
      "video/mpeg": "mp4",
      "application/vnd.ms-powerpoint": "ppt",
      "application/pdf": "pdf",
      "application/vnd.ms-excel": "xls",
      "image/png": "png",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
      "audio/mpeg": "mp3",
    };

    return mimes[file.toLowerCase()];
  }
}

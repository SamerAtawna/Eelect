import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Candidate } from "src/app/Models/Candidate";
import {
  faEdit,
  faEraser,
  faExclamationTriangle,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { ExcelService } from "src/app/Services/excel.service";
const { read, write, utils } = XLSX;
const MIN_SIGN_NUMBER = 10;

@Component({
  selector: 'app-sign-for-lead',
  templateUrl: './sign-for-lead.component.html',
  styleUrls: ['./sign-for-lead.component.scss']
})
export class SignForLeadComponent implements OnInit {

  candAddForm: FormGroup;
  @ViewChild("file") file;
  candidateList: Array<Candidate> = [
    { name: "ישראל ישראל", age: 33, ID: "32156478", numInElect: 4 },
    { name: "ישראל ישראל", age: 33, ID: "31156478", numInElect: 4 },
  ];
  candidateListFiltered: Array<Candidate> = [];
  faEdit = faEdit;
  faEraser = faEraser;
  faFileExcel = faFileExcel;
  faExclamationTriangle = faExclamationTriangle;
  arrayBuffer: any;
  filelist: any[];
  excelImportErrorMessages = [];
  constructor(private excelService: ExcelService) {}

  ngOnInit(): void {
    this.candAddForm = new FormGroup({
      name: new FormControl("", Validators.required),
      id: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
    });
    this.candidateListFiltered = [...this.candidateList];
    if(this.candidateListFiltered.length <MIN_SIGN_NUMBER ){
      this.excelImportErrorMessages.push(`מספר החתימות פחות מ ${MIN_SIGN_NUMBER}`);
    }
  }

  onFilesAdded(e) {
    console.log(e);
    let currFile;
    this.excelImportErrorMessages = [];
    currFile = e[0];
    let type = this.excelService.mimeParse(currFile.type);
    console.log("type ", type);
    if (
      type == undefined ||
      type.indexOf("xls") == -1 ||
      type.indexOf("xls") == -1
    ) {
      this.excelImportErrorMessages.push("יש לבחור קובץ אקסל בלבד");
      return;
    }
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(currFile);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = [];
      console.log(this.filelist);

      let keys = Object.keys(arraylist[0]);
      console.log("keys ", keys);

      //Check excel file columns validity

      if (
        !keys.includes("Name") ||
        !keys.includes("Age") ||
        !keys.includes("ID") ||
        !keys.includes("IdInElectral")
      ) {
        this.excelImportErrorMessages.push(`יש לבדוק את שמות העמודות`);
        return;
      }

      //check candidate age
      let checkedArr = [];
      arraylist.forEach((el: any) => {
        if (el.Age < 18) {
          this.excelImportErrorMessages.push(
            `חותם מספר ${el.IdInElectral} מתחת לגיל 18. נמצא בשורה ${el.__rowNum__} בקובץ.`
          );
          return;
        }

        if (checkedArr.filter((x) => el.ID === x).length === 0) {
          let tmpArr = arraylist.filter((e: any) => {
            console.log(e.ID + " === " + el.ID);
            return e.ID === el.ID;
          });
          console.log("##candidateListFiltered ", this.candidateListFiltered);
          let tmpArrDup = this.candidateListFiltered.filter((e: any) => {
            console.log("--> ",e.id + " === " + el.ID);
            console.log("##e.id === el.ID" , e.id === el.ID);
            return e.id === el.ID;
          });

          console.log("## tmpArrDup.length ", tmpArrDup.length);
          if (tmpArrDup.length > 0) {
            this.excelImportErrorMessages.push(
              `חותם בעל ת.ז. ${el.ID} כבר קיים ברשימה `
            );
          }

          if (tmpArr.length >= 2) {
            this.excelImportErrorMessages.push(
              ` זוהתה כפילות, חותם בעל ת.ז. ${el.ID} מופיע ${tmpArr.length} פעמים `
            );
          }
          console.log("tmpArr ", tmpArr);
        }

        checkedArr.push(el.ID);
      });

      arraylist.forEach(
        (el: {
          Name: string;
          Age: number;
          ID: number;
          IdInElectral: number;
        }) => {
          let candidate = new Candidate();
          candidate.name = el.Name;
          candidate.age = el.Age;
          candidate.ID = el.ID.toString();
          candidate.numInElect = el.IdInElectral;
          this.candidateListFiltered.push(candidate);
        }
      );
      if(this.candidateListFiltered.length <MIN_SIGN_NUMBER ){
        this.excelImportErrorMessages.push(`מספר החתימות פחות מ ${MIN_SIGN_NUMBER}`);
      }
    };

    console.log("##candidateListFiltered ", this.candidateListFiltered);
  }
  addFile() {
    this.file.nativeElement.click();
  }

  removeCandidate(id) {
    console.log("delete ", id);
    this.candidateListFiltered = this.candidateListFiltered.filter((cand) => {
      return cand.ID.toString().indexOf(id) == -1;
    });
    console.log("candidateListFiltered ", this.candidateListFiltered);
  }

  addCandidate() {
    console.log("add");
    this.excelImportErrorMessages = [];
    if (this.candAddForm.valid) {
      let newCand = new Candidate();
      newCand.name = this.candAddForm.get("name").value;
      newCand.ID = this.candAddForm.get("id").value;
      newCand.age = this.candAddForm.get("age").value;
      console.log(newCand);
      if (
        this.candidateListFiltered.filter((x) => x.ID === newCand.ID).length > 0
      ) {
        this.excelImportErrorMessages.push(`חותם  כבר קיים`);
        return;
      }
      this.candidateListFiltered.push(newCand);
    }
  }

  exportToExcel(){
    let element = document.getElementById('candTable'); 
    console.log("## element ", element);
    this.excelService.exportToExcel(element);

  }

}

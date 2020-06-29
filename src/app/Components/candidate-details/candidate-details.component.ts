import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Candidate } from "src/app/Models/Candidate";
import { faEdit, faEraser } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-candidate-details",
  templateUrl: "./candidate-details.component.html",
  styleUrls: ["./candidate-details.component.scss"],
})
export class CandidateDetailsComponent implements OnInit {
  candAddForm: FormGroup;
  @ViewChild("file") file;
  candidateList: Array<Candidate> = [
    { name: "ישראל ישראל", age: 33, id: "32156478", numInElect: 4 },
    { name: "ישראל ישראל", age: 33, id: "32156478", numInElect: 4 },

  ];
  faEdit = faEdit;
  faEraser = faEraser;
  constructor() {}

  ngOnInit(): void {
    this.candAddForm = new FormGroup({
      name: new FormControl(""),
      age: new FormControl(""),
      id: new FormControl(""),
      numberInElectral: new FormControl(""),
    });
  }

  onFilesAdded(e) {
    console.log(e);
  }
  addFile() {
    this.file.nativeElement.click();
  }
}

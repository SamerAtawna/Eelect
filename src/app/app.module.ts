import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocateRequestComponent } from "./Pages/locate-request/locate-request.component";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { RequestDetailsComponent } from "./Pages/request-details/request-details.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FileNamePipe } from "./Pipes/file-name.pipe";
import { MatIconModule } from "@angular/material/icon";
import { CandidateDetailsComponent } from "./Components/candidate-details/candidate-details.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SignForLeadComponent } from "./Components/sign-for-lead/sign-for-lead.component";
import { SignForListComponent } from "./Components/sign-for-list/sign-for-list.component";
import { HttpClientModule } from "@angular/common/http";
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { DigitfixPipe } from './Pipes/digitfix.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LocateRequestComponent,
    RequestDetailsComponent,
    FileNamePipe,
    CandidateDetailsComponent,
    SignForLeadComponent,
    SignForListComponent,
    DigitfixPipe,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    DragDropModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FontAwesomeModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

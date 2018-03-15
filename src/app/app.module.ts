import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AsideComponent } from './components/shared/aside/aside.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { CertifyLetterComponent } from './components/tables/certify-letter/certify-letter.component';
import { LoanComponent } from './components/tables/loan/loan.component';
import { HomeComponent } from './components/home/home.component';
import { CertifyLetterService } from "./services/certify-letter.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "tables", children: [
      { path: "certify-letter", component: CertifyLetterComponent },
      { path: "loan", component: LoanComponent }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    HeaderComponent,
    CertifyLetterComponent,
    LoanComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CertifyLetterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {AppComponent}  from "./app.component";
import TransactionComponent from "../transactions/transaction.component";

const appRoutes : Routes = [
    { path:"transaction",component: TransactionComponent }
];

@NgModule({
    imports:        [BrowserModule, CommonModule,RouterModule.forRoot(appRoutes)],
    declarations:   [AppComponent,TransactionComponent],
    bootstrap:      [TransactionComponent]
})

export class AppModule {}
import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import TransactionComponent from "../transactions/transaction.component";

const appRoutes : Routes = [
    { path:"transaction",component: TransactionComponent }
];

@NgModule({
    imports:[BrowserModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule.forRoot(appRoutes)],
    declarations:   [TransactionComponent],
    bootstrap:      [TransactionComponent]
})

export class AppModule {}
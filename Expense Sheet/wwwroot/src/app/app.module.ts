import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import TransactionComponent from "../transactions/transaction.component";
import NotificationComponent from "./notification/app.notification.component";
import AppComponent from "./app.component";

const appRoutes : Routes = [
        { path:"transaction",component: TransactionComponent },
        { path: "", redirectTo: "transaction", pathMatch: "full" },
    ];

@NgModule({
    imports:[BrowserModule,FormsModule,ReactiveFormsModule,HttpModule,CommonModule,RouterModule.forRoot(appRoutes)],
    declarations:   [AppComponent,NotificationComponent,TransactionComponent],
    bootstrap:      [AppComponent]
})

export class AppModule {}
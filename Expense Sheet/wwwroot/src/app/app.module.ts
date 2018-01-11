import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import TransactionComponent from "../transactions/transaction.component";
import NotificationComponent from "./notification/app.notification.component";
import DashboardComponent from "../dashboard/dashboard.component";
import PieChartComponent from "../chart/component/chart.piechart.component";
import BarchartComponent from "../chart/component/chart.barchart.component";

import AppComponent from "./app.component";

const appRoutes : Routes = [
        { path:"transaction",component: TransactionComponent },
        { path: "", redirectTo: "dashboard", pathMatch: "full" },
        { path:"dashboard",component: DashboardComponent },
    ];

@NgModule({
    imports:[BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, CommonModule,RouterModule.forRoot(appRoutes)],
    declarations:   [AppComponent, NotificationComponent, TransactionComponent, DashboardComponent, PieChartComponent,BarchartComponent],
    bootstrap:      [AppComponent]
})

export class AppModule {}
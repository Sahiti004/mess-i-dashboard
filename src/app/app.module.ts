import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { StudentListComponent } from './student-list/student-list.component'
import { RebateComponent } from './rebate/rebate.component';
import { HomeComponent } from './home/home.component';
import { PdRebateCardComponent } from './home/pd-rebate-card/pd-rebate-card.component';
import { StudentcardComponent } from './studentcard/studentcard.component';
import { TableComponentComponent } from './components/table_component/table-component.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    OverviewComponent,
    StudentListComponent,
    RebateComponent,
    HomeComponent,
    PdRebateCardComponent,
    StudentcardComponent,
    TableComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

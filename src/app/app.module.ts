import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { P404Component } from './p404/p404.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';
import { ExpenseComponent } from './expense/expense.component';
import { BudgetComponent } from './budget/budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeroComponent,
    FooterComponent,
    ArticleComponent,
    MenuComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    P404Component,
    BreadcrumbsComponent,
    ContactComponent,
    BudgetComponent,
    ExpenseComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

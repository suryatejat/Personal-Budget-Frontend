import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpenseComponent } from './expense/expense.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', component: HomepageComponent, pathMatch: 'full'},
  {path:'about', component: AboutComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'contact', component: ContactComponent},
  {path: 'budget', component: BudgetComponent, canActivate: [AuthGuard]},
  {path: 'expense', component: ExpenseComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

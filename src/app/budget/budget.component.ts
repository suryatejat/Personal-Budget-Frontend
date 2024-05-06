import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { timer } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent{
  @ViewChild('budget') budgetForm!: NgForm;

  showError : boolean = false;
  errorMessage !: string;
  showSuccess: boolean = false;
  successMessage !: string;
  categories: any = [];

  constructor(private dataService: DataService){}

  async onSubmit(data: any){
    const budget = {
      "title": data.category,
      "budget": data.budget,
      "color": data.color
    }
    this.dataService.addBudget(budget).subscribe(res => {
      if(res.status){
        this.successMessage = res.status;
        this.addNewBudgetData();
        this.showSuccessMesssage(5000);
        this.resetForm();
      }
      else{
        this.errorMessage = res.message;
        this.showErrorMessage(5000);
      }
    })
  }

  addNewBudgetData(): void{
    this.dataService.getBudgetData().subscribe((data: any) => {
      this.dataService.setBudgetData(data);
    });
  }

  resetForm(): void {
    this.budgetForm.resetForm();
  }

  showSuccessMesssage(duration: number){
    this.showSuccess = true;
    timer(duration).subscribe(() => {
      this.showSuccess = false;
    });
  }

  showErrorMessage(duration: number) {
    this.showError = true;
    timer(duration).subscribe(() => {
      this.showError = false;
    });
  }
}

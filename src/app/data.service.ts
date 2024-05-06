import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://159.203.76.87:3000/';
  // D3js Chart Data
  private budgetData: any[] = [];
  // Pie Chart Data
  private dataSource = {
    labels: [''],
    datasets:[
        {
            data: [''],
            backgroundColor: [''],
        }
    ]
  };

  constructor(private http: HttpClient) { }

  getBudgetData(): Observable<any> {
    const username = localStorage.getItem("username");
    return this.http.get(this.apiUrl + "budget/" + username);
  }

  getUserExpense(): Observable<any>{
    const username = localStorage.getItem('username');
    return this.http.get(this.apiUrl + "expense/" + username);
  }

  getExpenseData(month: any): Observable<any> {
    const username = localStorage.getItem('username');
    return this.http.get(this.apiUrl + "expense/" + username + "/" + month);
  }

  populateDataSource(data: any): void{
    // console.log(data);
    for(var i = 0; i < data.length; i++){
      this.dataSource.datasets[0].data[i] = data[i].budget;
      this.dataSource.labels[i] = data[i].title;
      this.dataSource.datasets[0].backgroundColor[i] = data[i].color;
    }
  }

  removeData(): void {
    this.dataSource = {
      labels: [''],
      datasets:[
          {
              data: [''],
              backgroundColor: [''],
          }
      ]
    }
    this.budgetData = []
  }

  addBudget(data: any): Observable<any>{
    data.username = localStorage.getItem("username");
    return this.http.post(this.apiUrl + "budget", data);
  }

  addExpense(data: any): Observable<any>{
    data.username = localStorage.getItem("username")
    return this.http.post(this.apiUrl + "expense", data);
  }

  getCategories(): any[]{
    return this.dataSource.labels;
  }

  getDataSource(): any{
    return this.dataSource;
  }

  setBudgetData(data: any[]): void {
    this.budgetData = data;
    this.populateDataSource(data);
  }

  getStoredBudgetData(): any[] {
    return this.budgetData;
  }

  isBudgetDataEmpty(): boolean {
    return this.budgetData.length === 0;
  }

  getBudget(): Observable<any> {
    return this.http.get(this.apiUrl + "budget");
  }

}

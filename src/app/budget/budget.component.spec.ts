import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BudgetComponent } from './budget.component';
import { DataService } from '../data.service';
import { of } from 'rxjs';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataService = jasmine.createSpyObj('DataService', ['addBudget', 'getBudgetData', 'setBudgetData']);

    await TestBed.configureTestingModule({
      declarations: [BudgetComponent],
      imports: [FormsModule],
      providers: [{ provide: DataService, useValue: dataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dataService.addBudget() and display success message when onSubmit() is called with valid data', () => {
    const formData = {
      "title": undefined,
      "budget": 100,
      "color": '#FFFFFF'
    };

    const responseData = {
      status: 'Successfully added new Budget Category'
    };

    dataService.addBudget.and.returnValue(of(responseData));

    spyOn(component, 'addNewBudgetData');
    spyOn(component, 'showSuccessMesssage');
    spyOn(component, 'resetForm');

    component.onSubmit(formData);

    expect(dataService.addBudget).toHaveBeenCalledWith(formData);
    expect(component.successMessage).toBe(responseData.status);
    expect(component.addNewBudgetData).toHaveBeenCalled();
    expect(component.showSuccessMesssage).toHaveBeenCalledWith(5000);
    expect(component.resetForm).toHaveBeenCalled();
  });

  it('should call dataService.addBudget() and display error message when onSubmit() is called with invalid data', () => {
    const formData = {
      "title": undefined,
      "budget": -100, // Invalid budget value
      "color": '#FFFFFF'
    };

    const responseData = {
      message: 'Invalid budget value'
    };

    dataService.addBudget.and.returnValue(of(responseData));

    spyOn(component, 'showErrorMessage');

    component.onSubmit(formData);

    expect(dataService.addBudget).toHaveBeenCalledWith(formData);
    expect(component.errorMessage).toBe(responseData.message);
    expect(component.showErrorMessage).toHaveBeenCalledWith(5000);
  });

  it('should call dataService.getBudgetData() and dataService.setBudgetData() when addNewBudgetData() is called', () => {
    const responseData = [{ id: 1, title: 'Test Category', budget: 100, color: '#FFFFFF' }];

    dataService.getBudgetData.and.returnValue(of(responseData));

    component.addNewBudgetData();

    expect(dataService.getBudgetData).toHaveBeenCalled();
    expect(dataService.setBudgetData).toHaveBeenCalledWith(responseData);
  });

  it('should reset the form when resetForm() is called', () => {
    component.budgetForm = {
      resetForm: jasmine.createSpy('resetForm')
    } as any;

    component.resetForm();

    expect(component.budgetForm.resetForm).toHaveBeenCalled();
  });

  it('should show success message for 5 seconds when showSuccessMesssage() is called', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();

    component.showSuccessMesssage(5000);

    expect(component.showSuccess).toBeTrue();

    jasmine.clock().tick(5001);

    expect(component.showSuccess).toBeFalse();

    jasmine.clock().uninstall();
  });

  it('should show error message for 5 seconds when showErrorMessage() is called', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();

    component.showErrorMessage(5000);

    expect(component.showError).toBeTrue();

    jasmine.clock().tick(5001);

    expect(component.showError).toBeFalse();

    jasmine.clock().uninstall();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Add NO_ERRORS_SCHEMA
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      schemas: [NO_ERRORS_SCHEMA] // Add NO_ERRORS_SCHEMA here
    });
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all features', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.text-box').length).toBe(4);
  });

  it('should display "Stay on track" feature', () => {
    const compiled = fixture.nativeElement;
    const featureTitle = compiled.querySelectorAll('.text-box h2')[0].textContent;
    expect(featureTitle).toContain('Stay on track');
  });

  it('should display "Alerts" feature', () => {
    const compiled = fixture.nativeElement;
    const featureTitle = compiled.querySelectorAll('.text-box h2')[1].textContent;
    expect(featureTitle).toContain('Alerts');
  });

  it('should display "Results" feature', () => {
    const compiled = fixture.nativeElement;
    const featureTitle = compiled.querySelectorAll('.text-box h2')[2].textContent;
    expect(featureTitle).toContain('Results');
  });

  it('should display "Free" feature', () => {
    const compiled = fixture.nativeElement;
    const featureTitle = compiled.querySelectorAll('.text-box h2')[3].textContent;
    expect(featureTitle).toContain('Free');
  });

  it('should have unique feature titles', () => {
    const compiled = fixture.nativeElement;
    const featureTitles = Array.from(compiled.querySelectorAll('.text-box h2')).map((element: any) => element.textContent.trim());
    expect(new Set(featureTitles).size).toBe(featureTitles.length);
  });

  it('should have proper descriptions for all features', () => {
    const compiled = fixture.nativeElement;
    const featureDescriptions = Array.from(compiled.querySelectorAll('.text-box p')).map((element: any) => element.textContent.trim());
    expect(featureDescriptions.length).toBe(4);
    expect(featureDescriptions).toContain('Do you know where you are spending your money? If you really stop to track it down, you would get surprised! Proper budget management depends on real data... and this app will help you with that!');
    expect(featureDescriptions).toContain('What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.');
    expect(featureDescriptions).toContain('People who stick to a financial plan, budgeting every expense, get out of debt faster! Also, they to live happier lives... since they expend without guilt or fear... because they know it is all good and accounted for.');
    expect(featureDescriptions).toContain('This app is free!!! And you are the only one holding your data!');
  });

  it('should have proper aria roles for all articles', () => {
    const compiled = fixture.nativeElement;
    const articles = Array.from(compiled.querySelectorAll('article')).map((element: any) => element.getAttribute('role'));
    expect(articles.length).toBe(4);
    expect(articles.every(role => role === 'article')).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionDetailsComponent } from './condition-details.component';

describe('ConditionDetailsComponent', () => {
  let component: ConditionDetailsComponent;
  let fixture: ComponentFixture<ConditionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

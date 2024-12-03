import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDetailsComponent } from './staff-details.component';

describe('StaffDetailsComponent', () => {
  let component: StaffDetailsComponent;
  let fixture: ComponentFixture<StaffDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffDetailsComponent]
    });
    fixture = TestBed.createComponent(StaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

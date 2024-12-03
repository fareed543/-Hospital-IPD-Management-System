import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionDetailsComponent } from './admission-details.component';

describe('AdmissionDetailsComponent', () => {
  let component: AdmissionDetailsComponent;
  let fixture: ComponentFixture<AdmissionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionDetailsComponent]
    });
    fixture = TestBed.createComponent(AdmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

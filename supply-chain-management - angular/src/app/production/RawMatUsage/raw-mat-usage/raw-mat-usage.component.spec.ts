import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMatUsageComponent } from './raw-mat-usage.component';

describe('RawMatUsageComponent', () => {
  let component: RawMatUsageComponent;
  let fixture: ComponentFixture<RawMatUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RawMatUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMatUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

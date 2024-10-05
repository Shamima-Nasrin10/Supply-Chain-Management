import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionQuantityComponent } from './production-quantity.component';

describe('ProductionQuantityComponent', () => {
  let component: ProductionQuantityComponent;
  let fixture: ComponentFixture<ProductionQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionQuantityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

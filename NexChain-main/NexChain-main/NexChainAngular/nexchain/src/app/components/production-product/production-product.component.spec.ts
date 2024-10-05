import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProductComponent } from './production-product.component';

describe('ProductionProductComponent', () => {
  let component: ProductionProductComponent;
  let fixture: ComponentFixture<ProductionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSameComponent } from './products-same.component';

describe('ProductsSameComponent', () => {
  let component: ProductsSameComponent;
  let fixture: ComponentFixture<ProductsSameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsSameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

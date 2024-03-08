import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingFeaturesComponent } from './shopping-features.component';

describe('ShoppingFeaturesComponent', () => {
  let component: ShoppingFeaturesComponent;
  let fixture: ComponentFixture<ShoppingFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

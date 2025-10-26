import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productsettings } from './productsettings';

describe('Productsettings', () => {
  let component: Productsettings;
  let fixture: ComponentFixture<Productsettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productsettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productsettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

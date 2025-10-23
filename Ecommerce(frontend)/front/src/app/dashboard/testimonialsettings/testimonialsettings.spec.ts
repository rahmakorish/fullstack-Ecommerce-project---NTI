import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonialsettings } from './testimonialsettings';

describe('Testimonialsettings', () => {
  let component: Testimonialsettings;
  let fixture: ComponentFixture<Testimonialsettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonialsettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testimonialsettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

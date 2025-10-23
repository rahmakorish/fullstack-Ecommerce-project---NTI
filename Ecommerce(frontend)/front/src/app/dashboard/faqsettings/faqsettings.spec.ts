import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faqsettings } from './faqsettings';

describe('Faqsettings', () => {
  let component: Faqsettings;
  let fixture: ComponentFixture<Faqsettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faqsettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Faqsettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
